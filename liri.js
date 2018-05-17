//NPM MODULES-->

//dotenv to hide keys
require('dotenv').config();
//fs for readFile
const fs = require('fs');
//request for OMDB
const request = require('request');
//twitter
const Twitter = require('twitter');
const keys = require('./keys');
const client = new Twitter(keys.twitter);
//spotify
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
//simple logger
const SimpleNodeLogger = require('simple-node-logger');
  opts = {
    logFilePath: 'logger.txt',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss'
  },
  log = SimpleNodeLogger.createSimpleLogger( opts );
  log.setLevel('all');

//ARGS-->

//commands
var cmd = process.argv[2];
//info requested
var arg = "";
//info function
function getArg() {
  argArray = process.argv;
  for (let i = 3; i < argArray.length; i++) {
    arg += argArray[i] + "+";
  }
  return arg;
}
//action function
action(cmd, arg);

//ACTION FNCTN-->
function action(cmd, arg) {
  arg = getArg();
  console.log(arg);
  //switch
  switch (cmd) {
    case "tweets":
      getTweets();
      break;
    case "spotify":
      var songName = arg;
      if(songName === "") {showSpecificSong();} else {getSong(songName)};
      break;
    case "omdb":
      var movieTitle = arg;
      if(movieTitle === "") {getMovie("Mr. Nobody");} else {getMovie(movieTitle)};
      break;
    case "do":
      doIt();
      break;
    default:
    console.log("Use the following comands after entering 'node liri': " + '\n' +
      "1. 'tweets' " + '\n' +
      "2. 'spotify' followed by any song title (e.g. node liri spotify rocket man) " + '\n' +
      "3. 'omdb' followed by any movie title (e.g. node liri omdb Robocop) " + '\n' +
      "4. 'do' displays random song " + '\n');
      return;
  }
}

//CMD FUNCTIONS-->

//twitter
function getTweets() {
  var params = {screen_name: 'ben_codes', count: 5};
  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        let date = tweets[i].created_at;
        let tweet = "@ben_codes: " + tweets[i].text + " created at: " + date;
        let space = "==========" + i + "==========" + '\n';
        console.log(tweet + '\n');
        console.log(space);
        fs.appendFile('log.txt', tweet + '\n');
        fs.appendFile('log.txt', space);
        logOutput(tweet + '\n' + new Date().toJSON());
      }
    } else {
      console.log("error: " + JSON.stringify(error, null, 1));
      return;
    }
  });
};

//spotify
//search song
function getSong(songName) {
  spotify.search({type: 'track', query: songName, limit: 5}, function(err, data) {
    if(err) {
      console.log("Error: " + err);
      return;
    }
    var artistsArray = data.tracks.items[0].album.artists;
    var artistsNames = [];
    for (let i = 0; i < artistsArray.length; i++) {
      artistsNames.push(artistsArray[i].name);
    }
    var artists = artistsNames.join(",");
    for (var i = 0; i < data.tracks.items.length; i++) {
      let results = data.tracks.items[i];
      let spotifyResults =
        "Song: " + results.name + '\n' +
        "Artist: " + results.artists[0].name + '\n' +
        "Album: " + results.album.name + '\n' +
        "Track Number: " + results.track_number + '\n' +
        "Release Date: " + results.album.release_date + '\n' +
        "==========" + i + "==========" + '\n';
      console.log(spotifyResults);
      fs.appendFile('log.txt', spotifyResults);
      logOutput(spotifyResults);
    }
  });
}
//default song
function showSpecificSong() {
  spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE').then(function(data) {
    let results = data;
    let spotifyResults =
      "Song: " + results.name + '\n' +
      "Artist: " + results.artists[0].name + '\n' +
      "Album: " + results.album.name + '\n' +
      "Track Number: " + results.track_number + '\n' +
      "Release Date: " + results.album.release_date + '\n' +
      "====================" + '\n';
    console.log(spotifyResults);
    fs.appendFile('log.txt', spotifyResults);
    logOutput(spotifyResults);
  });
}

//OMDB
function getMovie(movieTitle) {
  var omdbURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&tomatoes=true&r=json&apikey=trilogy";
  request(omdbURL, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var movie = JSON.parse(body);
      if(movieTitle === "Mr. Nobody") {
        let results =
          "If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/ " + '\n' +
          "It's on Netflix!" + '\n' +
          "=====================" + '\n';
        fs.appendFile('log.txt', results);
        console.log(results);
        logOutput(results);

      } else {
      let results =
        "Title: " + movie.Title + '\n' +
        "Release Year: " + movie.Year + '\n' +
        "Plot: " + movie.Plot + '\n' +
        "Country of Production: " + movie.Country + '\n' +
        "Language: " + movie.Language + '\n' +
        "Imbd Rating: " + movie.imdbRating + '\n' +
        //"Rotten Tomatoes Rating: " + movie.Ratings[2] + '\n' +
        "URL: " + movie.tomatoURL + '\n' +
        "=====================" + '\n';
      console.log(results);
      fs.appendFile('log.txt', results);
      logOutput(results);
      }
    }
  });
}

//readFile
function doIt() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if(error) {
      console.log("Error: " + error);
    } else {
      var randomArray = data.split(",");
      cmd = randomArray[0];
      arg = randomArray[1];
      action(cmd, arg);
    }
  });
}

//Logger
function logOutput(logText) {
  log.info('\n' + logText);
}
