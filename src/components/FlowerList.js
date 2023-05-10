import { flowers } from "../flowers/flowers"
import { FlowerListItem } from "./FlowerListItem"

const alphabetizedFlowers = flowers.sort((a, b) => a.name.localeCompare(b.name))

export function FlowerList() {
    return (
        <div className="px-8 py-5 divide-y-2">
            {alphabetizedFlowers.map((flower) => (
                <FlowerListItem flower={flower}/>
            ))}
        </div>
    )
} 