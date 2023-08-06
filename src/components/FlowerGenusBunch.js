import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getLightHexCode } from "./Colorblock";
import { FlowerListItem } from "./FlowerListItem";

export function FlowerGenusBunch(props) {
    const { genus, flowers, viewFlower, initialOpenStatus, descriptionsHidden, bgColor } = props;
    const [open, setOpen] = useState(true);
    const numFlowers = flowers.length;

    useEffect(() => setOpen(initialOpenStatus), [initialOpenStatus]);

    const newFlowers = flowers.filter((f) => f.new);
    const genusNumberClassName = `px-1 min-w-[16px] text-xs font-bold rounded-full text-white ${newFlowers.length > 0 ? 'bg-pink-400' : 'bg-lime-500'}`

    return (
        <div>
            <div className="px-2 flex justify-between py-2 space-x-2 items-center hover:cursor-pointer max-w-[750px] m-auto" style={{ backgroundColor: getLightHexCode(bgColor) }}>
                <div className="flex space-x-1.5 items-center">
                    <div>{genus}</div>
                    <div className={genusNumberClassName}>{numFlowers}</div>
                    <div className="flex items-center space-x-1">{newFlowers.map((f) => <div className="bg-pink-400 w-2 h-2 rounded-full" />)}</div>
                </div>
                <div onClick={() => setOpen(!open)} className="grow flex justify-end">
                    <FontAwesomeIcon icon={open ? faChevronDown : faChevronRight} />
                </div>
            </div>
            <div className="divide-y-2">
                {open && flowers.map((flower, i) => (
                    <FlowerListItem
                        flower={flower}
                        key={i}
                        hideDescription={descriptionsHidden}
                        onClick={() => viewFlower(flower)}
                    />
                ))}
            </div>
        </div>
    )
} 