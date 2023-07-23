import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { flowers } from "../flowers/flowers";
import { lastUpdated } from "../flowers/lastUpdated";
import { getLightHexCode } from "./Colorblock";

export function NavButtons(props) {
    const { bgColor } = props;
    const [newSeen, setNewSeen] = useState(
        JSON.parse(localStorage.getItem('new-seen')) === lastUpdated || false
    );

    const navigate = useNavigate();
    const location = useLocation();

    const viewList = () => {
        navigate("list");
        localStorage.setItem('new-seen', JSON.stringify(lastUpdated));
        setNewSeen(true);
    };

    return (
        <div className="sm:flex space-y-3 items-center justify-center sm:space-y-0 sm:space-x-3 text-sm">
            <NavButton bgColor={bgColor} onClick={() => navigate("grid")} active={location.pathname.includes('grid')}>
                Searchable bouquet
            </NavButton>
            <NavButton bgColor={bgColor} onClick={() => viewList()} active={location.pathname.includes('list')} isList newSeen={newSeen}>
                Flower list ({flowers.length})
            </NavButton>
            <NavButton bgColor={bgColor} onClick={() => navigate("about")} active={location.pathname.includes('about')}>
                Info
            </NavButton>
        </div>
    )
}

function NavButton(props) {
    const { onClick, active, isList = false, newSeen = true, bgColor = "#ceedd4" } = props;

    const className = "rounded-full py-3 px-5 hover:bg-white hover:shadow transition-all" + (active ? " shadow" : "")

    return (
        <div>
            <div className="hover:scale-105 relative inline-flex items-center rounded transition-all">
                {isList && !newSeen && <span className="absolute -top-[-2px] -right-0.5 h-3 w-3 rounded-full bg-pink-400 flex justify-center items-center items"></span>}
                <span><button onClick={onClick} className={className} style={{ backgroundColor: active ? "#ffffff" : getLightHexCode(bgColor) }}>{props.children}</button></span>
            </div>
        </div>
    )
}