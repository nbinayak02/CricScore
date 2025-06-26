to install Leaflet mappicker:-> npm install leaflet react-leaflet

to run both frontend and backend :-> npm run both

to install concurrently for running both frontend and backend at same time :-> npm install concurrently

to install react-select for <select > styling <option>:-> npm install react-select

to install time picker fromreact-time-picker :-> npm install react-time-picker

to import react-router-dom :-> npm install react@18.2.0 react-dom@18.2.0

to remove duplicate reacts versions:-> Remove-Item -Recurse -Force node_modules, package-lock.json

to unistall react-leaflet:-> npm uninstall react-leaflet

to install correct version of leaflet for React 18.:-> npm install react-leaflet@4

to remover dublicate version of react and react-dom:-> npm dedupe

to check dublicate version of react :-> npm ls react react-dom
 
 to install necessary library :-> npm install react-scripts@5.0.1
                                  npm install react-error-boundary@3
                                  npm install react-select@5.8.0
                                  npm install react-time-picker@6.4.0
                                  npm install @testing-library/react@13.4.0

                                  npm install --legacy-peer-deps

                                  npm cache clean --force;


                                npm install react-scripts

to connect with mongodb :-> npm install mongodb

 const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string from Compass
const uri = "mongodb://localhost:27017/yourDatabaseName"; 

databasename:->CricScore

const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  }
} 

to install bcrypte password hashing :->npm i bcryptjs

to install express validatior:->npm install express-validator


to install json webtoken:-> npm i jsonwebtoken

to installl top loading bar:->npm install react-top-loading-bar
