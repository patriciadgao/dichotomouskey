import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useMemo } from "react";
import { Filters } from "./Filters";

function searchEverything(search, flowers) {
    const searchWords = search.text.split(" ").map((w) => w.toLowerCase()).concat(search.color).concat(search.shape).concat(search.petals).concat(search.edge).concat(search.size).concat([search.tree.includes('yes') ? 'tree' : '']);
    const searchOptions = {
        color: new Set(),
        petals: new Set(),
        size: new Set(),
        edge: new Set(),
        shape: new Set(),
        tree: new Set()
    }

    // see if we need to check that things are NOT trees
    const notATree = search.tree.includes('no');

    const filteredFlowers = flowers.filter((flower) => {
        for (const word of searchWords) {
            if (!flower.searchable.match(word)) {
                return false
            }
        }

        // remove trees if we need to
        if (notATree && flower.tree === 'yes') {
            return false
        }

        // add the flower's values to searchOptions
        flower.colors.forEach((c) => searchOptions.color.add(c));
        flower.edge.forEach((e) => searchOptions.edge.add(e));
        searchOptions.shape.add(flower.shape);
        searchOptions.petals.add(flower.petals);
        searchOptions.size.add(flower.size);
        searchOptions.tree.add(flower.tree);
        return true
    });

    // convert searchOptions to alphabetized lists
    searchOptions.color = Array.from(searchOptions.color).sort((a, b) => a.localeCompare(b));
    searchOptions.petals = Array.from(searchOptions.petals).sort((a, b) => a.localeCompare(b));
    searchOptions.size = Array.from(searchOptions.size).sort((a, b) => a.localeCompare(b));
    searchOptions.edge = Array.from(searchOptions.edge).sort((a, b) => a.localeCompare(b));
    searchOptions.shape = Array.from(searchOptions.shape).sort((a, b) => a.localeCompare(b));
    searchOptions.tree = Array.from(searchOptions.tree).sort((a, b) => a.localeCompare(b));

    // return everything 
    return {
        flowerList: filteredFlowers,
        searchOptions: searchOptions
    }
}

export function SearchBar(props) {
    const {setFlowerList, shuffledFlowers} = props;
    const [search, setSearch] = useState({
        text: "",
        color: [],
        petals: [],
        edge: [],
        size: [],
        shape: [],
        tree: []
    });
    const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
    const [searchOptions, setSearchOptions] = useState({
        color: [],
        petals: [],
        edge: [],
        size: [],
        shape: [],
        tree: []
    });

    const searchableFlowers = useMemo(() => {
        return shuffledFlowers.map((f) => {
            return (
                {
                    ...f,
                    searchable: [f.name, f.genus, f.colors.join(', '), f.edge.join(', '), f.petals, f.shape, f.size, (f.tree === "yes" ? "tree" : "")].join(" ").toLowerCase()
                }
            )
        })
    }, [shuffledFlowers]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch({... search, text: e.target.value});
    };

    useEffect(() => {
        const result = searchEverything(search, searchableFlowers);
        setFlowerList(result.flowerList);
        setSearchOptions(result.searchOptions);        
    }, [search, searchableFlowers, setFlowerList]);

    return (
        <div>
        <div className="flex justify-center">
        <div className="flex justify-center items-center my-6 mx-12 space-x-4 sm:max-w-[800px] sm:w-[60vw]">
            <input
                type="text"
                placeholder="Search by name, color, etc..."
                onChange={handleSearch}
                value={search.text}
                className="transition-all opacity-75 hover:opacity-100 transition-all focus:opacity-100 focus:outline grow border-0 focus:outline-pink-300 shadow focus:outline-2 py-3 px-5 rounded-full text-slate-800"
            />
            <AdvancedButton onClick={() => setAdvancedSearchOpen(!advancedSearchOpen)}>
                <div>{advancedSearchOpen ? "Hide filters" : "Show filters"}</div>
                <div>
                <FontAwesomeIcon icon={advancedSearchOpen ? faChevronDown : faChevronRight} className="text-sm"/>
                </div>
            </AdvancedButton>
        </div>
        </div>
            {
                advancedSearchOpen && <Filters search={search} setSearch={setSearch} searchOptions={searchOptions}/>
            }
        </div>
    )
}

function AdvancedButton(props) {
    const {onClick} = props;

    return (
        <button onClick={onClick} className="bg-white flex hover:shadow focus:outline-0 font-medium transition-all hover:scale-105 hover:cursor-pointer rounded-full py-3 px-5 space-x-1.5">{props.children}</button>
    )
}