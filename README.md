# Pat's flowers (dichotomous key)
Welcome to my project! You can view the project page at [patriciadgao.github.io/dichotomouskey](https://patriciadgao.github.io/dichotomouskey).

## About
I made this website because I've identified lots of flowers, generally with the help of Google Lens, but also lots of Wikipedia, my own eyeballs, and pages called things like "Giant list of purple Utah wildflowers that Pat has to scroll through in order to find the right one". My experience doing so has not always been fun and I wish there were more dichotomous keys out there for people to more easily know the (often silly) names of flowers they're looking at.

I didn't quite end up building a dichotomous key, but hopefully the search capabilities that I make available are useful to you!

## Available scripts
If, for some reason, you want to mess around with this code, you can download the project and run the following: 

### `npm start`
Runs the app in dev mode, which you can open on your localhost ([http://localhost:3000](http://localhost:3000)) in your favorite browser.

### `npm test`
This might do something... but it might not. I haven't written anything beyond what `create-react-app` poops out, and I don't intend to, because I'm lazy. 

### `npm run resizePhotos`
This reads through the directory of photos in `src/flowers/photos` and resizes them to be `144 x 144` (cropping, then resizing), saving the new photos into `src/flowers/photos/small`. These small photos are used in the main flower grid, which improves the page response time by a lot.

### `npm run generateFlowers`
This reads the `flowers.tsv` file in the `scripts` folder, which contains flower information, and copies a declaration to your keyboard that is a list of flowers and their info. This is my janky way of avoiding having to host an external database, which should work while I don't have too many flowers.