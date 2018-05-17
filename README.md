# Node-App

Node.js app utilizing npm modules to take commands and return data on the users console. Built with Node.js, Javascript, and Prerequisites:
* npm request
* npm twitter
* npm node-spotify-api
* npm simple-node-logger

## Start

* Clone the Repository
* Run command 'npm install'
* Run 'node liri' to begin

## Prerequisites

* node.js [](https://nodejs.org/en/)
* npm modules:
  `1. Twitter NPM: [](https://www.npmjs.com/package/twitter)`
  `2. Spotify NPM: [](https://www.npmjs.com/package/node-spotify-api)`
  `3. Simple logger NPM: [](https://www.npmjs.com/package/simple-node-logger)`
  `4. Request NPM: [](https://www.npmjs.com/package/request)`

## Usage

#### Commands:
1. `node liri tweets` returns my last 5 tweets
2. `node liri spotify [song title]` returns spotify api call with info about requested song
3. `node liri omdb [movie title]` returns omdb api info for requested movie
4. `node liri do` retrieved text from random.txt and calls getSong() function

All commands are stored in log.txt via `fs.appendFile()` functions as well as stored in logger.txt via simple-node-logger.


## Built With

* Atom editor


## Authors

* **Ben Mercer** - *Initial work* -

## License
