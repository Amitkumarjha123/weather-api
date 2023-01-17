const express=require("express");
const https = require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
  var cityName=req.body.city;
  const url="https://api.weatherapi.com/v1/current.json?key=06864ad9488b4962991141954221610&q="+cityName+"&aqi=yes"
  https.get(url, function(response){

      response.on("data", function(data){
      const wdata = JSON.parse(data);
      const temp = wdata.current.temp_c;
      const description = wdata.current.condition.text;
      const icon=wdata.current.condition.icon;
      res.write("<p><img src="+icon+"></p>");
      res.write("<h1>The temperature in "+cityName+" is "+ temp + " degrees Celsius and weather is "+description+"</h1>");
      res.send();
      });
    });

});



app.listen(3000, function(){
  console.log("Server started");
});
