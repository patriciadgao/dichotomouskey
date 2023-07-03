import { useState } from "react";
import { flowers } from "../flowers/flowers";
import { Chip } from "./Chip";
import { FlowerListItem } from "./FlowerListItem";
import { FlowerModal } from "./FlowerModal";

const alphabetizedFlowers = [...flowers].sort((a, b) => a.name.localeCompare(b.name));
const flowersAlphabetizedByGenus = [...flowers].sort((a, b) => a.genus.localeCompare(b.genus));
const reversedFlowers = [...flowers].reverse();

export function FlowerList(props) {
    const [sortStyle, setSortStyle] = useState('time');
    const [descriptionsHidden, setDescriptionsHidden] = useState(false);
    const { showModal, hideModal, modalOpen } = props;
    const [selectedFlower, setSelectedFlower] = useState(undefined);

    return (
        <div>
            <div className="flex justify-center mt-6">
                <Chip active={sortStyle === 'time'} onClick={() => setSortStyle('time')}>sort{sortStyle === 'time' ? "" : "ed"} chronologically</Chip>
                <Chip active={sortStyle === 'name'} onClick={() => setSortStyle('name')}>sort{sortStyle === 'name' ? "ed" : ""} by name</Chip>
                <Chip active={sortStyle === 'genus'} onClick={() => setSortStyle('genus')}>sort{sortStyle === 'genus' ? "ed" : ""} by genus</Chip>
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
                        onClick={() => {
                            setSelectedFlower(flower);
                            showModal();
                        }}
                    />
                )) : sortStyle === 'time' ? reversedFlowers.map((flower, i) => (
                    <FlowerListItem
                        flower={flower}
                        key={i}
                        hideDescription={descriptionsHidden}
                        onClick={() => {
                            setSelectedFlower(flower);
                            showModal();
                        }}
                    />
                )) : flowersAlphabetizedByGenus.map((flower, i) => (
                    <FlowerListItem
                        flower={flower}
                        key={i}
                        hideDescription={descriptionsHidden}
                        onClick={() => {
                            setSelectedFlower(flower);
                            showModal();
                        }}
                    />
                ))}
            </div>
            <FlowerModal
                modalOpen={modalOpen}
                hideModal={hideModal}
                selectedFlower={selectedFlower}
                setSelectedFlower={setSelectedFlower}
            />
        </div>
    )
} 