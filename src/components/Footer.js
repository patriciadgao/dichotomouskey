import { lastUpdated } from "../flowers/lastUpdated";

export const Footer = () => (
    <div className="pb-8 text-center flex justify-center items-center">
        <div className="w-2 h-2 rounded-full bg-pink-400 mr-2"></div> latest flowers added {lastUpdated}
    </div>
)