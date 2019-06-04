let messageModule = require("./lesson3a");
let { repeatStr } = require("./lesson3a"); // you have to import functions wrapped in an object.
const cities = require("cities");

const myCity = cities.zip_lookup("80014");
messageModule.messages.forEach(x => console.log(x));
console.log(myCity);
console.log(repeatStr("go! ".toUpperCase(), 2));
/*
npm commands to know

npm init
Initializes a Node.js application and creates a package.json file

npm install <package>
Installs a Node.js package

npm publish
Saves and uploads a package you build to the npm package community

npm start
Runs your Node.js application (provided that the package.json file is set up to use this command)

npm stop
Quits the running application

npm docs <package>
Opens the likely documentation page (web page) for your specified package
*/
