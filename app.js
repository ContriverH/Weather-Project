// const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname  + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.query;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=4046f52ce28b5379ddee386eadb8a924";

    https.get(url, function (response) {

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const weatherImgae = "<img src =" + imageUrl + ">";

            res.write("<p>The weather is currently " + description + " " + weatherImgae + "</p>");
            res.write("<h1>Temperature in " + query + " is " + temp + "°C </h1>");

            res.send();
        });
    });
})
 
app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});