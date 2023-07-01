export function Colorblock(props) {
    const { nameOfColor } = props;

    return (
        <div className="outline outline-1 outline-slate-600 w-3 h-3 rounded-sm" style={{ backgroundColor: getHexCode(nameOfColor) }}></div>
    )
}

export function getHexCode(c) {
    return hexCodes[c];
}

export function getLightHexCode(c) {
    return lightHexCodes[c];
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
    "brown": "#9e6041",
    "bg-pink": "#edd3e1",
    "bg-green": "#afdbb7",
    "bg-blue": "#96cae3",
}

export const lightHexCodes = {
    "bg-pink": "#f5ebf0",
    "bg-green": "#ceedd4",
    "bg-blue": "#c7e4f2"
}