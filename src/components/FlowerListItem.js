import {LazyLoadImage} from "react-lazy-load-image-component";
import { Value, ValueItalic } from './AttributeComponents';
import { Colorblock } from "./Colorblock";

export const FlowerListItem = (props) => {
    const flower = props.flower;
    return (
        <div onClick={props.onClick} className="space-x-4 shadow-[0_0_2px_0px_rgba(0,0,0,0.1)] bg-white rounded-sm p-6 m-2.5 flex flex-row items-top max-w-[750px] m-auto">
            <LazyLoadImage
                alt={"image of " + flower.name}
                className="object-cover w-36 h-36 rounded-md"
                src={require("../flowers/photos/small/" + flower.name + "_small.jpg")}
                placeholder={<div className="w-36 h-36 bg-gray-100"></div>}
            />
            <div className="text-left">
            <div className="font-bold"><h2>{flower.name}</h2></div>
            <div>
                <div className="flex flex-row space-x-2 text-xs">
                    <ValueItalic>{flower.genus}</ValueItalic>
                    <div className="flex items-center space-x-1.5">{flower.colors.map((c) => <Colorblock nameOfColor={c}/>)}</div>
                </div>
                <div className="flex flex-row space-x- text-xs">
                    <Value>{flower.size} {flower.shape} flower with {flower.petals} {flower.edge.join(", ")} petals {flower.tree === "yes" ? "that is a tree" : "that is not a tree"}</Value>
                </div>
                <hr className="my-4"/>
                <p className="text-sm">{flower.description}</p>
            </div>
            </div>
        </div>
    )
}