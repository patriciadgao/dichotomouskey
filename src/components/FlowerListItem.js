import { LazyLoadImage } from "react-lazy-load-image-component";
import { ValueItalic } from './AttributeComponents';
import { Colorblock } from "./Colorblock";

export const FlowerListItem = (props) => {
    const flower = props.flower;
    const hideDescription = props.hideDescription;
    return (
        <div onClick={props.onClick} className="shadow-[0_0_2px_0px_rgba(0,0,0,0.1)] bg-white rounded-sm p-6 max-w-[750px] m-auto hover:cursor-pointer hover:bg-neutral-50">
            <div className="flex flex-row items-top space-x-4">
                <LazyLoadImage
                    alt={"image of " + flower.name}
                    className="shrink-0 object-cover sm:w-36 sm:h-36 h-16 w-16 rounded-md transition-all"
                    src={require("../flowers/photos/small/" + flower.name + "_small.jpg")}
                    placeholder={<div className="w-36 h-36 bg-gray-100"></div>}
                />
                <div className="text-left">
                    <div className="font-bold flex space-x-1.5 items-center"><h2>{flower.name}</h2>{flower.new && <div className="w-2 h-2 rounded-full bg-pink-400"></div>}</div>
                    <div className="text-xs">
                        <div className="flex flex-row space-x-2">
                            <ValueItalic>{flower.genus}</ValueItalic>
                            <div className="flex items-center space-x-1.5">{flower.colors.map((c) => <Colorblock nameOfColor={c} />)}</div>
                        </div>
                        <div>{flower.size} {flower.shape} flower</div>
                        {!hideDescription && (<><hr className="sm:my-2 mt-1.5 mb-0" /><p className="text-sm hidden sm:block">{flower.description}</p></>)}
                    </div>
                </div>
            </div>
            {!hideDescription && <p className="text-sm sm:hidden block mt-2 text-left">{flower.description}</p>}
        </div>
    )
}