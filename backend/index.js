console.log('Starting server ...');
var request = require('request');
var prettyjson = require('prettyjson');
const {URL} = require('url');
const querystring = require('querystring');
const path = require('path');

let baseUrl = 'http://localhost:5005'
// request(baseUrl + '/zones', function(error, response, body) {
//   console.log('zones');
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log(prettyjson.render(JSON.parse(body)));
// });
//
const express = require('express');
const app = express();
var proxy = require('express-http-proxy');

app.use(express.static(path.join(__dirname,'../frontend/dist')))

app.get('/play', (req, res) => {
  console.log('Play request');
  console.log(prettyjson.render({'song': req.query.song, 'artist': req.query.artist, 'genre': req.query.genre, 'search': req.query.search, 'speaker': req.query.speaker}));
  var search = ''
  if (req.query.song) {
    search.append(req.query.song)
  }
  if (req.query.artist) {
    search.append(req.query.artist)
  }
  if (req.query.search) {
    search = req.query.search
  }
  console.log('Final search: ' + search);
  var speaker = req.query.speaker
  if (search.length > 0 && speaker.length > 0) {
    playSong(search, speaker)
    res.end('success')
  } else {
    res.end('invalid input')
  }
})

app.get('/', (req, res) => {
  console.log(path.join(__dirname,'../frontend/dist/index.html'));
  res.render(path.join(__dirname, '../frontend/dist/index.html'))
})

app.use('/proxy', proxy('localhost:5005'));

var port = process.env.PORT || 80
app.listen(port)
console.log('Listening on port ' + port);

// playSong - use iTunes search API to play a song on SONOS
//https://itunes.apple.com/search
function playSong(query, speaker) {
  query = querystring.stringify({media: 'music', term: query})
  console.log(query);

  var songUrl = 0;
  request('https://itunes.apple.com/search' + '?' + query, function(error, response, body) {
    console.log('search');
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log();  Print the HTML for the Google homepage.
    var results = JSON.parse(body).results
    var item = results[0]
    // console.log(prettyjson.render(item));
    var id = 0;

    var trackUrl = new URL(item.trackViewUrl);
    var id = trackUrl.searchParams.get('i');
    var songUrl = '/' + speaker + '/applemusic/now/song:' + id
    console.log(songUrl);

    request(baseUrl + songUrl, function(error, response, body) {
      console.log('queueing');
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      request(baseUrl + '/Basement/play', function(error, response, body) {
        console.log('playing');
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      });
    });
  });
}

// playSong('no problem chance the rapper')

//http://localhost:5005/{room name}/{action}[/{parameter}]
