// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', function (req, res) {
  // Check if date parameter is present
  let date;
  if (req.params.date) {
    // Check if the date is a number (UNIX timestamp) or a string (ISO 8601)
    if (!isNaN(req.params.date)) {
      // Parse the string as a number first, to handle UNIX timestamps
      date = new Date(parseInt(req.params.date));
    } else {
      // Try to parse the string as an ISO date
      date = new Date(req.params.date);
    }
  } else {
    // If no date provided, use the current date
    date = new Date();
  }

  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    // Return both the UNIX timestamp and the UTC string
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
