// use functions for each task instead of just a switch so that do what it says will work when it calls the operand...

require("dotenv").config()
var axios = require("axios")
var moment = require("moment")
var fs = require("fs")
var keys = require("./keys.js")
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
var userOperand = process.argv[2]
var userTitle = process.argv[3]
 
switch (userOperand) {
    case "spotify-this-song":

        fs.appendFile("log.txt", userOperand + "," + userTitle + "\n", function(err) {
            if (err) {
                return console.log(error)
            }
        })

        if (userTitle === undefined) {
            userTitle = "151 Rum"
        }

        spotify
            .search({ type: 'track', query: userTitle, limit: 3 })
            .then(function(response) {
                console.log("====================================\n")
                console.log("Artist Name: " + response.tracks.items[0].artists[0].name + "\n")
                console.log("Track Name: " + response.tracks.items[0].name + "\n")
                console.log("Albumn Name: " + response.tracks.items[0].album.name + "\n")
                console.log("Preview Link: " + response.tracks.items[0].album.external_urls.spotify + "\n")
                console.log("====================================")
            })
            .catch(function(err) {
                console.log(err)
            });
        break;
    
    case "concert-this":

        fs.appendFile("log.txt", userOperand + "," + userTitle + "\n", function(err) {
            if (err) {
                return console.log(error)
            }
        })

        if (userTitle === undefined) {
            userTitle = "Run The Jewels"
        }
        
        var queryUrl = "https://rest.bandsintown.com/artists/" + userTitle + "/events?app_id=codingbootcamp";
        axios.get(queryUrl).then(
            function(response) {

                for (var i = 0; i < 6; i++) {
                    var concertDate = response.data[i].datetime
                    var formattedDate = moment(concertDate).format('MMMM Do YYYY, h:mm a')

                    console.log("====================================\n")
                    console.log("Venue: " + response.data[i].venue.name + "\n")
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + "\n")
                    console.log("Concert Date: " + formattedDate + "\n")
                    console.log("====================================")
                }
            })
            .catch(function(err) {
                console.log(err)
            });
        break;

    case "movie-this":

        fs.appendFile("log.txt", userOperand + "," + userTitle + "\n", function(err) {
            if (err) {
                return console.log(error)
            }
        })

        if (userTitle === undefined) {
            userTitle = "Ted 2"
        }

        var queryUrl = "http://www.omdbapi.com/?t=" + userTitle + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function(response) {

                console.log("====================================\n")
                console.log("Movie Title: " + response.data.Title + "\n")
                console.log("Release Year: " + response.data.Year + "\n")
                console.log("Plot: " + response.data.Plot + "\n")
                console.log("Actors: " + response.data.Actors + "\n")
                console.log("IMDB Rating: " + response.data.imdbRating + "\n")
                console.log("Rotton Tomatos Rating: " + response.data.Ratings[1].Value + "\n")
                console.log("Production Country: " + response.data.Country + "\n")
                console.log("Movie Language: " + response.data.Language + "\n")
                console.log("====================================")
            })
            .catch(function(err) {
                console.log(err)
            });
        break;

    case "do-what-it-says":
        
        fs.readFile("random.txt", "utf8", function(err, response) {
            if (err) {
                return console.log(error)
            }

            var commands = response.split(",")
            console.log(commands)
            userOperand = commands[0]
            userTitle = commands[1]

            switch (userOperand) {
                case "spotify-this-song":
                    
                    break;
                
                case "movie-this":
                    
                    break;

                case "concert-this":
                    
                    break;
            }

        })
        break;
}