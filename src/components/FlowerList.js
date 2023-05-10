import { useState } from "react"
import { flowers } from "../flowers/flowers"
import { FlowerListItem } from "./FlowerListItem"
import { Chip } from "./Chip";

const alphabetizedFlowers = [...flowers].sort((a, b) => a.name.localeCompare(b.name));
const reversedFlowers = [...flowers].reverse();

export function FlowerList() {
    const [alphabetical, setAlphabetical] = useState(true);

    return (
        <div>
            <div className="flex justify-center mt-6">
                <Chip active={alphabetical} onClick={() => setAlphabetical(true)}>sort alphabetically</Chip>
                <Chip active={!alphabetical} onClick={() => setAlphabetical(false)}>sort chronologically</Chip>
            </div>
        <div className="sm:px-8 pb-5 pt-3 divide-y-2">
            {alphabetical ? alphabetizedFlowers.map((flower, i) => (
                <FlowerListItem flower={flower} key={i}/>
            )) : reversedFlowers.map((flower, i) => (
                <FlowerListItem flower={flower} key={i}/>
            ))}
        </div>
        </div>
    )
} 