import { LazyLoadImage } from "react-lazy-load-image-component";

export const FlowerCard = (props) => {
    const { flower } = props;
    return (
        <div onClick={props.onClick} className="shadow-[0_0_2px_0px_rgba(0,0,0,0.1)] bg-white rounded-sm p-6 m-2.5 flex flex-col max-w-24 items-center hover:m-1.5 hover:px-7 hover:cursor-pointer transition-all hover:shadow-[0_0_25px_-5px_rgba(0,0,0,0.3)]">
            <LazyLoadImage
                alt={"image of " + flower.name}
                className="object-cover w-36 h-36 rounded-md"
                src={require("../flowers/photos/small/" + flower.name + "_small.jpg")}
                placeholder={<div className="w-36 h-36 bg-gray-100"></div>}
            />
            <div className="text-center mt-2.5 font-bold"><h2>{flower.name}</h2></div>
            <div>
                <p className="italic text-sm">{flower.genus}</p>
            </div>
        </div>
    )
}

export const FlowerCardPhotoOnly = (props) => {
    const { flower } = props;

    return (
        <div onClick={props.onClick} className="shadow-[0_0_2px_0px_rgba(0,0,0,0.1)] bg-white rounded-sm p-3 m-2.5 flex flex-col max-w-24 items-center hover:m-1.5 hover:px-4 hover:cursor-pointer transition-all hover:shadow-[0_0_25px_-5px_rgba(0,0,0,0.3)]">
            <LazyLoadImage
                alt={"image of " + flower.name}
                className="object-cover w-36 h-36 rounded-md"
                src={require("../flowers/photos/small/" + flower.name + "_small.jpg")}
                placeholder={<div className="w-36 h-36 bg-gray-100"></div>}
            />
        </div>
    )
}