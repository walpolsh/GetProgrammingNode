const port = 3000;
const express = require("express");
const app = express();
const controller = require("./controller");
const layouts = require("express-ejs-layouts");

const encoded = express.urlencoded({
  extended: false
});

app.use(encoded);
app.use(layouts);

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.get("/", controller.sendReqHome);
app.get("/items/:vegetable", controller.sendReqParam);
app.get("/name/:myName", controller.respondWithName);

app.use(controller.queryMiddleware);

app.post("/", controller.bodyQueryRequest);

app.listen(port, controller["serverRunningMessage"](app.get("port")));

/*

Controllers are responsible for processing data by communicating with models, performing code logic, and calling for a view to be rendered in a server’s response.

In this lesson, you learned how to build routes and middleware functions with Express.js. 
Then you used middleware functions to work with Express.js in analyzing request body contents.
*/
