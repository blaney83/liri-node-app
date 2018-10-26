
//requires
require("dotenv").config();
const keys = require("./keys")
const fs = require("fs")
const request = require("request")
const moment = require("moment")
const Spotify = require("node-spotify-api")

//node variables
const processArray = process.argv
const kindOfRequest = processArray[2]

//Bands in Town definitions
const bandName = processArray.splice(3).join(" ")
const bandURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + keys.bandsInTown.key + "&upcoming_event_counts=3"
//Spotify definitions
const spotify = new Spotify(keys.spotify);
const songTitle = processArray.splice(3).join(" ")

//OMDB search definitions
const movieTitle = processArray.splice(3).join("+")
const movieQueryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + keys.omdb.key;

switch (kindOfRequest) {
    case "concert-this":
        request(bandURL, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                // show("Event 1: " + )
                show("Venue: " + JSON.parse(body)[0].venue.name);
                show("Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region);
                show("Date: " + moment(JSON.parse(body)[0].datetime).format("dddd, MMMM Do YYYY, h:mm a"));
                show("Tickets: " + JSON.parse(body)[0].offers[0].url);
            } else {
                show("An error occured when accessing your artist or band information. Please try again.")
            }
        })
        break;
    case "spotify-this-song":
        spotify.search({ type: 'track', query: songTitle, limit: 1 }, (error, data) => {
            if (!error) {
                show("Artist: " + data.tracks.items[0].artists[0].name);
                show("Song: " + data.tracks.items[0].name);
                show("Album: " + data.tracks.items[0].album.name);
                show("Link: " + data.tracks.items[0].preview_url);
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
            //input
        break;
    default:
        show("this feature is not supported. Please try one of the following: 'concert-this' bandName, 'spotify-this-song' songName, 'movie-this' movieName, 'do-what-it-says' random")
}

function show(x) {
    console.log(x)
}

