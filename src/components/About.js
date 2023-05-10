export const About = () => (
    <div className="pb-8">
        <div className="p-8 my-6 mx-12 py-5 bg-white flex flex-col items-center rounded-md space-y-4">
                <img className="max-w-[400px]" src={require("../bookpat.jpg")} title="heck yeah identifying flowers!"/>
        <div className="max-w-[450px] text-left">
            Hello! My name is Pat. Welcome to my flower list! <br/> <br/>
            I made this website because I've identified lots of flowers, 
            generally with the help of Google Lens, but also lots of Wikipedia, 
            my own eyeballs, and pages called things like "Giant list of purple 
            wildflowers that Pat has to scroll through in order to find 
            the right one". My experience doing so has not always been fun and 
            I wish there were more dichotomous keys out there for people to 
            more easily know the (often silly) names of flowers they're looking at.
        </div>
        </div>
    </div>
)