const mongoose = require("mongoose");
// we need to be able to read each model file defined in our models folder to automatically require them
const fs = require("fs");
const path = require("path");

//we need to define the folder containing the model files
const models_path = path.join(__dirname, "../models");

// we need to make sure the files we are reading are JS files (ending in .js, ignoring case)
const reg = new RegExp(".js$", "i");
// we need to define our mongodb location
const dbURI = "mongodb://localhost/discussionBoard";

mongoose.connect(dbURI);

// If we properly connect we need to be notified
mongoose.connection.on("connected", function(){
  console.log(`Mongoose default connection open to ${dbURI}`);
});

// If there is an error we need to be notified
mongoose.connection.on("error", function(err){
  console.log(`Mongoose default connection error: ${err}`);
});

// If we disconnect we need to be notified
mongoose.connection.on("disconnected", function(){
  console.log("Mongoose default connection disconnected");
});

// If we want to kill the app we need to kill the connection before actually killing the app
process.on("SIGINT", function(){
  mongoose.connection.close(function(){
    console.log("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});

// for every file in our models folder, read the name and if it ends in .js we will require it
fs.readdirSync(models_path).forEach(function(file){
  if(reg.test(file)){
    require(path.join(models_path, file));
  }
});
