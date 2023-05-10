export function Chip(props) {
    const {onClick, active = false} = props;

    const className = "m-1 hover:opacity-100 hover:scale-105 text-xs rounded-xl bg-white px-3 py-2 flex space-x-1.5 items-center" + (active ? "" : " opacity-60");

    return (
        <button onClick={onClick} className={className}>{props.children}</button>
    )
}