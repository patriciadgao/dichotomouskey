import groupBy from "lodash.groupby";
import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flowers } from "../flowers/flowers";
import { Chip } from "./Chip";
import { FlowerGenusBunch } from "./FlowerGenusBunch";
import { FlowerListItem } from "./FlowerListItem";
import { FlowerModal } from "./FlowerModal";

const alphabetizedFlowers = [...flowers].sort((a, b) => a.name.localeCompare(b.name));
const reversedFlowers = [...flowers].reverse();
const flowersGroupedByGenus = groupBy(flowers, 'genus');
const sortedGenusFlowers = Object.entries(flowersGroupedByGenus).sort((a, b) => a[0].localeCompare(b[0]))

export function FlowerList(props) {
    const { bgColor } = props;
    const [sortStyle, setSortStyle] = useState(
        localStorage.getItem('sort-style') ?? 'time'
    );
    let params = useParams();
    let { "*": flowerName } = params;

    const navigate = useNavigate();

    const flower = useMemo(() => {
        return flowers.find((f) => f.name === flowerName) ?? undefined
    }, [flowerName]);

    const [descriptionsHidden, setDescriptionsHidden] = useState(false);
    const [openGenus, setOpenGenus] = useState(true);

    const changeSortStyle = useCallback((sortStyle) => {
        setSortStyle(sortStyle);
        localStorage.setItem('sort-style', sortStyle);
    }, []);

    const viewFlower = (flower) => {
        navigate(flower.name);
    };

    return (
        <div>
            <div className="flex justify-center items-center mt-6">
                <div className="mr-1">Sort style:</div>
                <Chip active={sortStyle === 'time'} onClick={() => changeSortStyle('time')}>chronological</Chip>
                <Chip active={sortStyle === 'name'} onClick={() => changeSortStyle('name')}>name</Chip>
                <Chip active={sortStyle === 'genus'} onClick={() => changeSortStyle('genus')}>genus</Chip>
            </div>
            <div className="px-4 sm:px-8 flex justify-end mt-2 space-x-2 items-center hover:cursor-pointer max-w-[750px] m-auto" onClick={() => setDescriptionsHidden(!descriptionsHidden)}>
                <input
                    type="checkbox"
                    checked={descriptionsHidden}
                    readOnly
                    className="w-5 h-5 checked:text-pink-300 outline-0 border-none rounded-sm focus:ring-0 shadow"
                /><div>hide descriptions</div>
            </div>
            {sortStyle === 'genus' && (
                <div className="px-4 sm:px-8 flex justify-end mt-2 space-x-2 items-center hover:cursor-pointer max-w-[750px] m-auto" onClick={() => setOpenGenus(!openGenus)}>
                    <input
                        type="checkbox"
                        checked={openGenus}
                        readOnly
                        className="w-5 h-5 checked:text-pink-300 outline-0 border-none rounded-sm focus:ring-0 shadow"
                    /><div>expand all</div>
                </div>
            )}
            {sortStyle === 'name' ? (<div className="sm:px-8 pb-5 pt-3 divide-y-2">
                {alphabetizedFlowers.map((flower, i) => (
                    <FlowerListItem
                        flower={flower}
                        key={i}
                        hideDescription={descriptionsHidden}
                        onClick={() => viewFlower(flower)}
                    />
                ))}</div>) : sortStyle === 'time' ? <div className="sm:px-8 pb-5 pt-3 divide-y-2">
                    {reversedFlowers.map((flower, i) => (
                        <FlowerListItem
                            flower={flower}
                            key={i}
                            hideDescription={descriptionsHidden}
                            onClick={() => viewFlower(flower)}
                        />
                    ))}</div> : <div className="pt-3 pb-5 sm:px-8">{sortedGenusFlowers.map((genus, i) => (
                        <FlowerGenusBunch
                            key={i}
                            bgColor={bgColor}
                            genus={genus[0]}
                            flowers={genus[1]}
                            viewFlower={viewFlower}
                            initialOpenStatus={openGenus}
                            descriptionsHidden={descriptionsHidden}
                        />
                    ))}</div>}
            <FlowerModal selectedFlower={flower} />
        </div>
    )
} 