//Config
var name = "A100 Radio";
var logoURL = "http://nebula.wsimg.com/ab93c0821ed20f6a1d510ca7df540e4e?AccessKeyId=5BB3A1048D699C6F47BC&disposition=0&alloworigin=1";
var stationSite = "www.a100radio.com";//without http://
var statsURL = "http://108.91.188.90:8000";
var audioURL = "http://108.91.188.90:8000/;?type=http&nocache=63";





var express = require('express');
var app = express();
var exphbs = require('express3-handlebars');
var albumArt = require('album-art');
var internetradio = require('node-internet-radio');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static("public"));

//Get Song Info and Convert &amp; to &.
internetradio.getStationInfo(statsURL, function (error, station) {
var decoded = station.title.replace(/&amp;/g, '&');
var dataSplit = decoded.split(" - ");
var title = dataSplit[1];
var artist = dataSplit[0];
var img;

//If there is no artwork for song, show default image.
albumArt(artist, title, 'large', function (err, url) {
  if(typeof url === 'undefined') {
    url = "img/default.png";
  }

//Send song info to HTML.
  app.get('/', function(req, res) {
    res.render('index', {
      title: title,
      artist: artist,
      imgUrl: url,
      audioURL: audioURL,
      stationName: name,
      stationLogo: logoURL,
      stationURL: stationSite
    });
  });
});
});

var port = Number(process.env.PORT || 5000);
app.listen(port);
console.log("Enabled! (" + port + ")")
