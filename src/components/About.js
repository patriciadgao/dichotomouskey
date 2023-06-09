export const About = () => (
    <div className="pb-8">
        <div className="p-8 pb-12 my-6 mx-12 py-5 bg-white flex flex-col items-center rounded-md space-y-4">
                <img alt="doodle of Pat" className="w-72 max-w-full" src={require("../bookpat.jpg")} title="heck yeah identifying flowers!"/>
        <div className="max-w-[450px] text-left">
            Hello! My name is Pat. Welcome to my flower list! <br/> <br/>
            I made this website because I've identified lots of flowers, 
            generally with the help of Google Lens, but also lots of Wikipedia, 
            my own eyeballs, and pages called things like "Giant list of purple 
            wildflowers that Pat has to scroll through in order to find 
            the right one". My experience doing so has not always been fun and 
            I wish there were more easy-to-use sites out there for people to 
            learn the names of flowers, so I made one!
            <br/><br/>
            You may notice that I've taken some liberties in categorizing
            flowers and doing things like counting their petals. If I've
            made an egregious error somewhere, please feel free to contact
            me about it!
        </div>
        </div>
    </div>
)