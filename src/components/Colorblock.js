export function Colorblock(props) {
    const {nameOfColor} = props;

    function getHexCode(c) {
        return hexCodes[c];
    }

    return (
        <div className="outline outline-1 outline-slate-600 w-3 h-3 rounded-sm" style={{ backgroundColor: getHexCode(nameOfColor)}}></div>
    )
}

export const hexCodes = {
    "white": "#ffffff",
    "red": "#b30c0c",
    "orange": "#eb6a0e",
    "yellow": "#ffdb57",
    "green": "#4ca33c",
    "blue": "#388eff",
    "purple": "#cd9cff",
    "pink": "#ffb3ed",
    "brown": "#9e6041"
}