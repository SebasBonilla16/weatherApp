const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const http = require("http");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});
app.post("/", function (req, res) {
  const cityName = req.body.cityName;
  
  const url2 = `http://api.openweathermap.org/geo/1.0/zip?zip=28226,US&appid=183e07af9a864d568186800c4d65b2ea`
  https.get(url2, function (response){
    response.on("data", function (data){
      const jsondata2= JSON.parse(data);
      const zipcode = jsondata2.zip;
      const name = jsondata2.name;
      const lat = jsondata2.lat;
      const lon = jsondata2.lon;
      res.write(`<h2>The lattitude and longitude for ${name, zipcode} is ${lat, lon}</h2>`)
      res.send();
    });
  });

  const url =`https://api.openweathermap.org/data/2.5/weather?lat=35.22709&lon=-80.84313&appid=183e07af9a864d568186800c4d65b2ea&units=imperial`;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const jsondata = JSON.parse(data);
      const temp = jsondata.main.temp;
      const des = jsondata.weather[0].description;
      const icon = jsondata.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1>`);
      res.write(`<p>The weather description is ${des} </p>`);
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });
});
app.listen(9000);










// `https://api.openweathermap.org/data/2.5/weather?lat=35.22709&lon=-80.84313&appid=183e07af9a864d568186800c4d65b2ea&units=imperial`;