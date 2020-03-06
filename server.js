const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Cors for cross origin allowance
app.use(cors());

app.use(express.static("public"));

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let projectData = {};

//Receive post data and create object

app.post("/sendData", (req, res) => {
  console.log(req.body);
  projectData.date = req.body.date;
  projectData.feelings = req.body.feel;
  projectData.temperature = req.body.temp;
  projectData.cityName = req.body.city;
  projectData.name = "WeatherApp";
  console.log(projectData);
  res.send({
    msg: "Hey I received your message"
  });
});

//Prepare data for get

app.get("/getData", (req, res) => {
  res.send(projectData);
});
