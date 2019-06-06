const port = 3000;
const express = require("express");
const app = express(); //The express webserver application is instantiated and stored in a constant to be referred to as app.

app
  .get("/", (req, res) => {
    console.log(req.params);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
    /*
      params Allows you to extract IDs and tokens from the URL. When you learn about RESTful routes in unit 4, this request attribute allows you to identify which items are being requested in an e-commerce site or what user profile you should navigate to.
      body Contains much of the contents of the request, which often includes data coming from a POST request, such as a submitted form. From the request body, you can collect information quickly and save it in a database.
      url Provides information about the URL being visited (similar to req.url in unit 1’s basic web server).
      query Like body, lets you pull data being submitted to the application server. This data isn’t necessarily from a POST request, however, and is often requested in the URL as a query string.
    */
    res.send("hellooooo!");
  })
  .post("/", (req, res) => {
    res.send("POSTED!");
  })
  .listen(port, () => {
    console.log(`The Express.js server has started and is listening
  on port number: ${port}`);
  });
