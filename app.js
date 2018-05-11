//server
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');
const http = require('http');
fs.readFile('index.html', (err, html) => {
  if (err) {
    throw err;
  }
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.write(html);
    res.end();

  });

  server.listen(port, hostname, () => {
    console.log('Server started on port ' + port);
  });

});

//node modules
//const fs = require('fs');
const request = require('request');
const keys = require('keys');
const twitter = require('twitter');
//const spotify = require('spotify');
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
  let client = new twitter({
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
      console.log("error");
      return;
    }
  });
};

//spotify
function spotify(songName) {
  let songName = process.argv[3];
    if (!songName) {
      songName = "Rocket Man";
    }
  spotify.search({type: 'track', query: songName}, (err, data) => {
    if(err) {
      console.log("Error: " + err);
    } else {
      let results = data.tracks.items;
      for (var i = 0; i < 10; i++) {
        //TODO
      }

    }
  })
}

//omdb


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