import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flowers } from "../flowers/flowers";
import { Chip } from "./Chip";
import { FlowerListItem } from "./FlowerListItem";
import { FlowerModal } from "./FlowerModal";

const alphabetizedFlowers = [...flowers].sort((a, b) => a.name.localeCompare(b.name));
const flowersAlphabetizedByGenus = [...flowers].sort((a, b) => a.genus.localeCompare(b.genus));
const reversedFlowers = [...flowers].reverse();

export function FlowerList() {
    const [sortStyle, setSortStyle] = useState(
        localStorage.getItem('sort-style') ?? 'time'
    );
    let params = useParams();
    let {"*": flowerName} = params;

    const navigate = useNavigate();

    const flower = useMemo(() => {
        return flowers.find((f) => f.name === flowerName) ?? undefined
    }, [flowerName]);

    const [descriptionsHidden, setDescriptionsHidden] = useState(false);

    const changeSortStyle = useCallback((sortStyle) => {
        setSortStyle(sortStyle);
        localStorage.setItem('sort-style', sortStyle);
    }, []);

    const viewFlower = (flower) => {
        navigate(flower.name);
    };

    return (
        <div>
            <div className="flex justify-center mt-6">
                <Chip active={sortStyle === 'time'} onClick={() => changeSortStyle('time')}>sort{sortStyle === 'time' ? "ed" : ""} chronologically</Chip>
                <Chip active={sortStyle === 'name'} onClick={() => changeSortStyle('name')}>sort{sortStyle === 'name' ? "ed" : ""} by name</Chip>
                <Chip active={sortStyle === 'genus'} onClick={() => changeSortStyle('genus')}>sort{sortStyle === 'genus' ? "ed" : ""} by genus</Chip>
            </div>
            <div className="px-4 sm:px-8 flex justify-end mt-2 space-x-2 items-center hover:cursor-pointer max-w-[750px] m-auto" onClick={() => setDescriptionsHidden(!descriptionsHidden)}>
                <input
                    type="checkbox"
                    checked={descriptionsHidden}
                    readOnly
                    className="w-5 h-5 checked:text-pink-300 outline-0 border-none rounded-sm focus:ring-0 shadow"
                /><div>hide descriptions</div>
            </div>
            <div className="sm:px-8 pb-5 pt-3 divide-y-2">
                {sortStyle === 'name' ? alphabetizedFlowers.map((flower, i) => (
                    <FlowerListItem
                        flower={flower}
                        key={i}
                        hideDescription={descriptionsHidden}
                        onClick={() => viewFlower(flower)}
                    />
                )) : sortStyle === 'time' ? reversedFlowers.map((flower, i) => (
                    <FlowerListItem
                        flower={flower}
                        key={i}
                        hideDescription={descriptionsHidden}
                        onClick={() => viewFlower(flower)}
                    />
                )) : flowersAlphabetizedByGenus.map((flower, i) => (
                    <FlowerListItem
                        flower={flower}
                        key={i}
                        hideDescription={descriptionsHidden}
                        onClick={() => viewFlower(flower)}
                    />
                ))}
            </div>
            <FlowerModal selectedFlower={flower} />
        </div>
    )
} 