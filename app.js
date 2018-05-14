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
const request = require('request');
const keys = require('./keys');
const twitter = require('twitter');
var spotify = require('spotify');
const client = new twitter(keys.twitterKeys);
const cmd = process.argv[2];

//possible cmds
switch (cmd) {
  case "tweets":
    tweets();
    break;
  case "spotify":
    spotify();
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
                "1. 'tweets' followed by any Twitter handle (e.g. node app tweets BarackObama) " + '\n' +
                "2. 'spotify' followed by any song title (e.g. node app spotify 'rocket man') " + '\n' +
                "3. 'omdb' followed by any movie title (e.g. node app omdb Robocop) " + '\n' +
                "4. 'do' displays random facts " + '\n' +
                "REMINDER: any song or movie title with more than one word needs to be in quotes!");
};

//functions

//tweets
function tweets() {
  var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
  });

  let userName = process.argv[3];
  if (!userName) {
    userName = 'ben_codes';
  }

  let params = {screen_name: userName};
  client.get('statuses/user_timeline', params, (error, tweets, response) =>  {
    if(!error) {
      for (var i = 0; i < tweets.length; i++) {
        let results =
        "@" + tweets[i].user.screen_name + ":" + tweets[i].text + '\n' +
        "==========" + data[i].created_at + "==========" + '\n';
        console.log(results);
      }
    } else {
      console.log("error: " + error);
      return;
    }
  });
};

//spotify
function spotify(songName) {
  var songName = process.argv[3];
    if (!songName) {
      songName = "Rocket Man";
    }
  params = songName;
  spotify.search({type: 'track', query: songName}, (err, data) => {
    if(err) {
      console.log("Error: " + err);
      return;
    } else {
      let results = data.tracks.items;
      for (var i = 0; i < 10; i++) {
        if (data[i] != undefined) {
          var spotifyResults =
          "Artist: " + results[i].artists[0].name + '\n' +
          "Song: " + results[i].name + '\n' +
          "Album: " + results[i].album.name + '\n' +
          "Preview: " + results[i].preview_url + '\n' +
          "==========" + i + "==========" + '\n';
          console.log(spotifyResults);
        }
      }

    }
  });
};

//omdb
function omdb() {
  let movie = process.argv[4];
  var omdbURL = 'http://www.omdbapi.com/?t=' + '"' + movie + '"' + '&y=&plot=short&apikey=trilogy';

  request(omdbURL, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var body = JSON.parse(body);
      for (var i = 0; i < 1; i++) {
      console.log("Title: " + body.Title + '\n' +
                  "Release Year: " + body.Year + '\n' +
                  "Plot: " + body.Plot + '\n' +
                  "Country of Production: " + body.Country + '\n' +
                  "Language: " + body.Language + '\n' +
                  "Imbd Rating: " + body.imdbRating + '\n' +
                  "Rotten Tomatoes Rating: " + body.Ratings[1].Value[0] + '\n' +
                  "URL: " + body.Website + '\n' +
                  "==========" + i + "===========");
    }
    console.log(body);
  }
});
}

//doit --readFile
function doIt() {
  fs.readFile("random.txt", "utf8", function(error, data){
    if (!error) {
      let doItResults = data.split(",");
      spotifyThisSong(doItResults[0], doItResults[1]);
    } else {
      console.log("Error: " + error);
    }
  });
};
