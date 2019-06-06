const port = 3000;
const express = require("express");
const app = express();

/*
Route parameters are handy for specifying data objects in your application. 
When you start saving user accounts and course listings in a database, for example, you might access a user’s profile or specific course with the /users/:id and/course/:type paths, respectively. 
This structure is necessary for developing a representational state transfer (REST) architecture, as you learn in unit 4.

Express.js is a type of middleware because it adds a layer between a request being received and that request being processed.

*/
app.get("/", (req, res) => {
  res.send(`This is the page for ${req.url}`);
});
app.get("/items/:vegetable", (req, res) => {
  res.send(`This is the page for ${req.params.vegetable}`);
});
//This listing defines a middleware function with an additional next argument, logs the request’s path to your terminal console,
//and then calls the next function to continue the chain in the request- response cycle.
//app.use("/items", <callback>) will run your custom callback function for every request made to a path starting with items
app.use((req, res, next) => {
  console.log(`make request to ${req.url}`);
  console.log(req.query);
  next();
  // next is provided as a way of calling the next function in your request-response execution flow.
  // From the time a request enters the server, it accesses a series of middleware functions.
  // Depending on where you add your own custom middleware function, you can use next to let
  // Express.js know that your function is complete and that you want to continue to whatever function is next in the chain.
});
app.use(
  express.urlencoded({
    extended: false
  })
);
app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("post successful");
});
app.listen(port, () => {
  console.log(
    `The Express.js server has started and is listening on port number: ${port}`
  );
});
