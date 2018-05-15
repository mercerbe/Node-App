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

//stored arg array
var nodeArgv = process.argv;
var x = "";
//multiple words
for(var i=3; i<nodeArgv.length; i++) {
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  }else {
    x = x + nodeArgv[i];
  }
}

//possible cmds
switch (cmd) {
  case "tweets":
    tweets();
    break;
  case "spotify":
  //if(x) {spotifySong();} else{ spotifySong("The Sign");}
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
                "4. 'do' displays random facts " + '\n' +
                "REMINDER: any song or movie title with more than one word needs to be in quotes!");
};

//functions

//tweets
function tweets() {
  let userName = 'ben_codes';
  let params = {screen_name: userName};
  client.get('statuses/user_timeline', params, (error, tweets, response) =>  {
    if(!error) {
      for (var i = 0; i < tweets.length; i++) {
        let date = tweets[i].created_at;
        let tweet = "@ben_codes: " + tweets[i].text + "created at: " + date.substring(0,19);
        let space = "==========" + i + "==========";
        console.log(tweet);
        console.log(space);
        fs.appendFile('log.txt', tweet);
        fs.appendFile('log.txt', space);
      }
    } else {
      console.log("error: " + JSON.stringify(error, null, 2));
      return;
    }
  });
};

//spotify
function spotifySong() {
  var song = process.argv[3];
  spotify.search({type: 'track', query: song, limit: 1}, (err, data) => {
      if (song === "") {
        let song = "The Sign";
      }
    if(err) {
      console.log("Error: " + err);
    } else {
      console.log(JSON.stringify(data, null, 2));
      for (var i = 0; i < data.length; i++) {
      let results = data.tracks.items[i];
          var spotifyResults =
          "Artist: " + results[i].album.artists.name + '\n' + 
          // "Song: " + results[i].name + '\n' +
          // "Album: " + results[i].album.name + '\n' +
          // "Preview: " + results[i].preview_url + '\n' +
          // "==========" + i + "==========" + '\n';
          console.log(spotifyResults);
      }
    }
  });
};

//omdb
function omdb() {
  let movie = process.argv[3];
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&apikey=trilogy';

  request(omdbURL, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var body = JSON.parse(body);
      for (var i = 0; i < 1; i++) {
      let results = "Title: " + body.Title + '\n' +
                  "Release Year: " + body.Year + '\n' +
                  "Plot: " + body.Plot + '\n' +
                  "Country of Production: " + body.Country + '\n' +
                  "Language: " + body.Language + '\n' +
                  "Imbd Rating: " + body.imdbRating + '\n' +
                  "Rotten Tomatoes Rating: " + body.Ratings[1][0]+ '\n' +
                  "URL: " + body.tomatoURL + '\n' +
                  "==========" + i + "===========";
      console.log(results);
      fs.appendFile('log.txt', results);
    }
  }
});
}

//doit --readFile
function doIt() {
  fs.readFile('random.txt', 'utf8', function(error, data){
    if (!error) {
      let random = data.split(",");
      spotifySong(random[1]);
    } else {
      console.log("Error: " + error);
    }
  });
};
