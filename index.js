// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", function (req, res) {
  const pdate = req.params.date || "";

  if (!pdate) {
    const dt = new Date();
    res.json({ unix: dt.getTime(), utc: dt.toUTCString() });
  } else {
    const isNumber = /^\d+$/.test(pdate);
    if (isNumber) {
      res.json(parseUnix(pdate));
    } else {
      res.json(parseOther(pdate));
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

function parseUnix(numberString) {
  const unix = parseInt(numberString);
  const date = new Date(unix);

  if (date.toString() === "Invalid Date") {
    return { error: "Invalid Date" };
  }

  return { unix, utc: date.toUTCString() };
}

function parseOther(dateLikeString) {
  const date = new Date(dateLikeString);

  if (date.toString() === "Invalid Date") {
    return { error: "Invalid Date" };
  }
  return { unix: date.getTime(), utc: date.toUTCString() };
}
