import { useState } from "react";
import { flowers } from "../flowers/flowers";

export function NavButtons(props) {
    const {view, setView} = props;
    const [newSeen, setNewSeen] = useState(
        JSON.parse(localStorage.getItem('new-seen')) || false
    );

    const viewList = () => {
        setView("list");
        localStorage.setItem('new-seen', JSON.stringify(true));
        setNewSeen(true);
    };

    return (
        <div className="flex items-center justify-center space-x-3 text-sm">
            <NavButton onClick={() => setView("grid")} active={view === "grid"}>
                Searchable bouquet
            </NavButton>
            <NavButton onClick={() => viewList()} active={view === "list"} isList newSeen={newSeen}>
                Flower list ({flowers.length})
            </NavButton>
            <NavButton onClick={() => setView("about")} active={view === "about"}>
                Info
            </NavButton>
        </div>
    )
}

function NavButton(props) {
    const {onClick, active, isList = false, newSeen = true} = props;

    const className = "rounded-full py-3 px-5 bg-white hover:opacity-100 hover:shadow transition-all" + (active ? " opacity-100 shadow" : " opacity-50")

    return (
        <div>
        <div className="hover:scale-105 relative inline-flex items-center rounded transition-all">
          {isList && !newSeen && <span className="z-50 absolute -top-[-2px] -right-0.5 h-3 w-3 rounded-full bg-pink-400 flex justify-center items-center items"></span>}
          <span><button onClick={onClick} className={className}>{props.children}</button></span>
        </div>
      </div>
    )
}