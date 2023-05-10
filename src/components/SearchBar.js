import { useState, useEffect, useMemo } from "react";

function searchEverything(search, flowers) {
    const searchWords = search.split(" ");
    return flowers.filter((flower) => {
        for (const word of searchWords) {
            if (!flower.searchable.match(word)) {
                return false
            }
        }
        return true
    })
}

export function SearchBar(props) {
    const {setFlowerList, shuffledFlowers} = props;
    const [search, setSearch] = useState("");

    const searchableFlowers = useMemo(() => {
        return shuffledFlowers.map((f) => {
            return (
                {
                    ...f,
                    searchable: [f.name, f.genus, f.colors.join(', '), f.edge.join(', '), f.petals, f.shape, f.size, (f.tree === "yes" ? "tree" : "")].join(" ")
                }
            )
        })
    }, [shuffledFlowers]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    useEffect(() => {
        setFlowerList(searchEverything(search, searchableFlowers));
    }, [search, searchableFlowers, setFlowerList]);

    return (
        <div className="flex justify-center my-6 mx-12">
            <input
                type="text"
                placeholder="Search by name, color, etc..."
                onChange={handleSearch}
                value={search}
                className="transition-all opacity-75 hover:opacity-100 transition-all focus:opacity-100 focus:outline sm:max-w-[800px] grow sm:w-[50vw] border-0 focus:outline-pink-300 shadow focus:outline-2 py-3 px-5 rounded-full text-slate-800"
            />
        </div>
    )
}