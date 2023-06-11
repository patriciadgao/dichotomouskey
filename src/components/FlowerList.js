import { useState } from "react";
import { flowers } from "../flowers/flowers";
import { Chip } from "./Chip";
import { FlowerListItem } from "./FlowerListItem";
import { FlowerModal } from "./FlowerModal";

const alphabetizedFlowers = [...flowers].sort((a, b) => a.name.localeCompare(b.name));
const reversedFlowers = [...flowers].reverse();

export function FlowerList(props) {
    const [alphabetical, setAlphabetical] = useState(false);
    const {showModal, hideModal, modalOpen} = props;
    const [selectedFlower, setSelectedFlower] = useState(undefined);

    return (
        <div>
            <div className="flex justify-center mt-6">
                <Chip active={!alphabetical} onClick={() => setAlphabetical(false)}>sort{alphabetical ? "" : "ed"} chronologically</Chip>
                <Chip active={alphabetical} onClick={() => setAlphabetical(true)}>sort{alphabetical ? "ed" : ""} alphabetically</Chip>
            </div>
        <div className="sm:px-8 pb-5 pt-3 divide-y-2">
            {alphabetical ? alphabetizedFlowers.map((flower, i) => (
                <FlowerListItem flower={flower} key={i} onClick={() => {
                    setSelectedFlower(flower);
                    showModal();
                }}/>
            )) : reversedFlowers.map((flower, i) => (
                <FlowerListItem flower={flower} key={i} onClick={() => {
                    setSelectedFlower(flower);
                    showModal();
                }}/>
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