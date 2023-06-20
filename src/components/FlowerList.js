import { useState } from "react";
import { flowers } from "../flowers/flowers";
import { Chip } from "./Chip";
import { FlowerListItem } from "./FlowerListItem";

const alphabetizedFlowers = [...flowers].sort((a, b) => a.name.localeCompare(b.name));
const reversedFlowers = [...flowers].reverse();

export function FlowerList() {
    const [alphabetical, setAlphabetical] = useState(false);
    const [descriptionsHidden, setDescriptionsHidden] = useState(false);

    return (
        <div>
            <div className="flex justify-center mt-6">
                <Chip active={!alphabetical} onClick={() => setAlphabetical(false)}>sort{alphabetical ? "" : "ed"} chronologically</Chip>
                <Chip active={alphabetical} onClick={() => setAlphabetical(true)}>sort{alphabetical ? "ed" : ""} alphabetically</Chip>
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
                {alphabetical ? alphabetizedFlowers.map((flower, i) => (
                    <FlowerListItem flower={flower} key={i} hideDescription={descriptionsHidden} />
                )) : reversedFlowers.map((flower, i) => (
                    <FlowerListItem flower={flower} key={i} hideDescription={descriptionsHidden} />
                ))}
            </div>
        </div>
    )
} 