//server
// const hostname = '127.0.0.1';
// const port = 3000;
// const fs = require('fs');
// const http = require('http');
// fs.readFile('index.html', (err, html) => {
//   if (err) {
//     throw err;
//   }
//   const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-type', 'text/plain');
//     res.write(html);
//     res.end();
//
//   });
//
//   server.listen(port, hostname, () => {
//     console.log('Server started on port ' + port);
//   });
//
// });

//node modules
require("dotenv").config();
const fs = require('fs');
const request = require('request');
const keys = require('./keys');
const Twitter = require('Twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitterKeys);
const cmd = process.argv[2];

//possible cmds
switch (cmd) {
  case "tweets":
    tweets();
    break;
  case "spotify":
    spotifySong();
    break;
  case "omdb":
    omdb();
    break;
  case "do":
    doIt();
    break;
    //instructions
  default:
    console.log("Use the following comands after entering 'node app': " + '\n' +
      "1. 'tweets' " + '\n' +
      "2. 'spotify' followed by any song title (e.g. node app spotify 'rocket man') " + '\n' +
      "3. 'omdb' followed by any movie title (e.g. node app omdb Robocop) " + '\n' +
      "4. 'do' displays random song " + '\n' +
      "REMINDER: any song or movie title with more than one word needs to be in quotes!");
};

//functions

//tweets
function tweets() {
  let userName = 'ben_codes';
  let params = {
    screen_name: userName
  };
  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        let date = tweets[i].created_at;
        let tweet = "@ben_codes: " + tweets[i].text + "created at: " + date.substring(0, 19);
        let space = "==========" + i + "==========" + '\n';
        console.log(tweet);
        console.log(space);
        fs.appendFile('log.txt', tweet);
        fs.appendFile('log.txt', space);
      }
    } else {
      console.log("error: " + JSON.stringify(error, null, 1));
      return;
    }
  });
};

//spotify
function spotifySong() {
  let song = process.argv[3];
  if (typeof song === 'undefined') {
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
    });
  } else {
    spotify.search({
      type: 'track',
      query: song,
      limit: 5
    }, (err, data) => {
      if (err) {
        console.log("Error: " + err);
      } else {
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
        }
      }
    });
  }
}

//omdb
function omdb() {
  var movie = process.argv[3];
  if (typeof movie === 'undefined') {
    let movie = "'Mr. Nobody'";
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&apikey=trilogy';
    request(omdbURL, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var body = JSON.parse(body);
            let results = "If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/ " + '\n' +
              "It's on Netflix!" + '\n' +
              "=====================" + '\n';
            fs.appendFile('log.txt', results);
            console.log(results);
      };
    });
  } else {
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&apikey=trilogy';
    request(omdbURL, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var body = JSON.parse(body);
        for (var i = 0; i < 1; i++) {
            let results = "Title: " + body.Title + '\n' +
              "Release Year: " + body.Year + '\n' +
              "Plot: " + body.Plot + '\n' +
              "Country of Production: " + body.Country + '\n' +
              "Language: " + body.Language + '\n' +
              "Imbd Rating: " + body.imdbRating + '\n' +
              "Rotten Tomatoes Rating: " + body.Ratings[1] + '\n' +
              "URL: " + body.tomatoURL + '\n' +
              "==========" + i + "===========" + '\n';
            console.log(results);
            fs.appendFile('log.txt', results);
        }
      }
    });
  }
}

//doit --readFile
function doIt() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (!error) {
      let random = data.split(",");
      spotifySong(random[1]);
    } else {
      console.log("Error: " + error);
    }
  });
};
