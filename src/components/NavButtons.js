export function NavButtons(props) {
    const {view, setView} = props;

    return (
        <div className="flex items-center justify-center space-x-3 text-sm">
            <NavButton onClick={() => setView("grid")} active={view === "grid"}>
                Searchable bouquet
            </NavButton>
            <NavButton onClick={() => setView("list")} active={view === "list"}>
                Flower list
            </NavButton>
            <NavButton onClick={() => setView("about")} active={view === "about"}>
                Info
            </NavButton>
        </div>
    )
}

function NavButton(props) {
    const {onClick, active} = props;

    const className = "rounded-full py-3 px-5 bg-white hover:opacity-100 hover:shadow" + (active ? " opacity-100 shadow" : " opacity-50")

    return (
        <button onClick={onClick} className={className}>{props.children}</button>
    )
}