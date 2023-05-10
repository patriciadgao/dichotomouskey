import { Chip } from "./Chip";
import { Colorblock } from "./Colorblock";

export function AdvancedSearch(props) {
    const {search, setSearch, searchOptions} = props;

    console.log(searchOptions);

    return (
        <div className="flex justify-center pb-4">
        <div className="grid grid-cols-2 m-2 sm:w-[80vw] gap-2">
            {searchOptions.color.length > 0 && <ColorSearch options={searchOptions.color} search={search} setSearch={setSearch}/>}
            {searchOptions.shape.length > 0 && <GenericSearch title="Flower shape" optionName="shape" options={searchOptions.shape} search={search} setSearch={setSearch}/>}
            {searchOptions.petals.length > 0 && <GenericSearch title="# Petals" optionName="petals" options={searchOptions.petals} search={search} setSearch={setSearch}/>}
            {searchOptions.size.length > 0 && <GenericSearch title="Flower size" optionName="size" options={searchOptions.size} search={search} setSearch={setSearch}/>}
            {searchOptions.edge.length > 0 && <GenericSearch title="Petal edge" optionName="edge" options={searchOptions.edge} search={search} setSearch={setSearch}/>}
            {searchOptions.tree.length > 0 && <GenericSearch title="Tree" optionName="tree" options={searchOptions.tree} search={search} setSearch={setSearch}/>}
        </div>
        </div>
    )
}

function ColorSearch(props) {
    const {search, setSearch, options} = props;

    const searchedColors = search.color.sort((a,b) => a.localeCompare(b));
    const searchedColorsSet = new Set(searchedColors);

    return (
        <div className="space-y-2 flex flex-col items-center">
            <h3 className="text-base font-semibold">Color</h3>
        <div className="flex flex-wrap justify-center">
            {
                searchedColors.map((color, i) => <Chip active key={i} onClick={() => setSearch({...search, color: search.color.filter(c => c !== color)})}>
                    <Colorblock nameOfColor={color}/>
                    <div>{color}</div>
                </Chip>)
            }
            {options.map((color, i) => {
                return (searchedColorsSet.has(color)) ? <></> : <Chip key={i} onClick={() => setSearch({...search, color: search.color.concat([color])})}><Colorblock nameOfColor={color}/><div>{color}</div></Chip>
            })}
        </div>
        </div>
    )
}

function GenericSearch(props) {
    const {search, setSearch, optionName, options, title} = props;

    const searchedOptions = search[optionName].sort((a,b) => a.localeCompare(b));
    const searchedOptionsSet = new Set(searchedOptions);

    return (
        <div className="space-y-2 flex flex-col items-center">
            <h3 className="text-base font-semibold">{title}</h3>
            <div className="flex flex-wrap justify-center">
                {
                    searchedOptions.map((o, i) => <Chip active key={i} onClick={() => setSearch({...search, [optionName]: search[optionName].filter(option => option !== o)})}>
                        {o}
                    </Chip>)
                }
                {
                    options.map((o, i) => {
                        return (searchedOptionsSet.has(o) ? <></> : <Chip key={i} onClick={() => setSearch({...search, [optionName]: search[optionName].concat([o])})}>{o}</Chip>)
                    })
                }
            </div>
        </div>
    )
}