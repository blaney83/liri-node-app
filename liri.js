
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

//functions
function liriDoMagic(arr, prcArr) {

    switch (arr) {
        case "concert-this":
            const bandName = prcArr.splice(3).join(" ")
            const bandURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + keys.bandsInTown.key + "&upcoming_event_counts=3"
            request(bandURL, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    let bandObject = JSON.parse(body)
                    let bandInfo = "\nArtist: " + bandObject[0].lineup[0] + "\nVenue: " + bandObject[0].venue.name + "\nLocation: " + bandObject[0].venue.city + ", " + bandObject[0].venue.region + "\nDate: " + moment(bandObject[0].datetime).format("dddd, MMMM Do YYYY, h:mm a") + "\nTickets: " + bandObject[0].offers[0].url;
                    show(bandInfo)
                    fs.appendFile("log.txt", "\n" + bandInfo, (err) => { if(err){show("Could not add search to history.")}})
                } else {
                    show("An error occured when accessing your artist or band information. Please try again.")
                }
            })
            break;
        case "spotify-this-song":
            const spotify = new Spotify(keys.spotify);
            const songTitle = prcArr.splice(3).join(" ")
            spotify.search({ type: "track", query: songTitle, limit: "1" }, (error, data) => {
                if (!error) {
                    let songInfo = "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nAlbum: " + data.tracks.items[0].album.name + "\nLink: " + data.tracks.items[0].preview_url;
                    show(songInfo);
                    fs.appendFile("log.txt", "\n" + songInfo, (err) => { if(err){show("Could not add search to history.")}})
                } else {
                    show("An error occured when accessing your song information. Please try again." + error)
                }
            })
            break;
        case "movie-this":
            const movieTitle = prcArr.splice(3).join("+")
            const movieQueryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + keys.omdb.key;
            request(movieQueryURL, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    let movieObject = JSON.parse(body);
                    let movieInfo = "\nTitle: " + movieObject.Title + "\nYear of Release: " + movieObject.Released.split(" ").splice(2) + "\nIMDB Rating: " + movieObject.imdbRating + "\nRotten Tomatoes Rating: " + movieObject.Ratings[1].Value + "\nCountry of Origin: " + movieObject.Country + "\nLanguage: " + movieObject.Language + "\nPlot: " + movieObject.Plot + "\nActors: " + movieObject.Actors;
                    show(movieInfo)
                    fs.appendFile("log.txt", "\n" + movieInfo, (err) => { if(err){show("Could not add search to history.")}})
                } else {
                    show("An error occured when accessing your movie information. Please try again.")
                }
            });
            break;
        case "do-what-it-says":
            //input
            fs.readFile("random.txt", "utf8", (error, data) => {
                if (!error) {
                    let dataArray = data.split(" ")
                    dataArray.unshift("placehold2", "placehold1")
                    let actionType = dataArray[2]
                    liriDoMagic(actionType, dataArray)
                }
            })
            break;
        default:
            show("this feature is not supported. Please try one of the following: 'concert-this' bandName, 'spotify-this-song' songName, 'movie-this' movieName, 'do-what-it-says' random")
    }
}

function show(x) {
    console.log(x)
}

//master call
liriDoMagic(kindOfRequest, processArray)
