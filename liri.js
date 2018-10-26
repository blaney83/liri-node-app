
require("dotenv").config();

const processArray = process.argv
const kindOfRequest = processArray[2]
const keys = require("./keys")
const request = require("request")

//Spotify definitions
const Spotify = require("node-spotify-api")
const spotify = new Spotify(keys.spotify);
const songTitle = processArray.splice(3).join(" ")

//movie search definitions
const movieTitle = processArray.splice(3).join("+")
const movieQueryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + keys.omdb.key;

console.log(movieQueryURL)
console.log(kindOfRequest)
show(songTitle)

switch(kindOfRequest) {
    case "concert-this":
        //insert
        break;
    case "spotify-this-song":
        spotify.search({type: 'track', query: songTitle, limit: 1}, (error, data) => {
            if (!error) {
                // console.log(data.tracks.items)
                show("Artist: " + data.tracks.items[0].album)

            } else {
                show("An error occured when accessing your song information. Please try again." + error)
            }
        })
        break;
    case "movie-this":
        request(movieQueryURL, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const movieObject = JSON.parse(body);
                show("Title: " + movieObject.Title);
                show("Year of Release: " + movieObject.Released.split(" ").splice(2));
                show("IMDB Rating: " + movieObject.imdbRating);
                show("Rotten Tomatoes Rating: " + movieObject.Ratings[1].Value);
                show("Country of Origin: " + movieObject.Country);
                show("Language: " + movieObject.Language);
                show("Plot: " + movieObject.Plot);
                show("Actors: " + movieObject.Actors);
            } else {
                show("An error occured when accessing your movie information. Please try again.")
            }
        });
        break;
    case "do-what-it-says":
        //insert
        break;
    default:
        show("this feature is not supported. Please try one of the following: 'concert-this' bandName, 'spotify-this-song' songName, 'movie-this' movieName, 'do-what-it-says' random")
}

function show(x){
    console.log(x)
}

