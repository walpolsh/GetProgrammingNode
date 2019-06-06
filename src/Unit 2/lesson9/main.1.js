const port = 3000;
const express = require("express");
const app = express();
const controller = require("./controllers/controller");
const encoded = express.urlencoded({
  extended: false
});
app.get("/", controller.sendReqHome);
app.get("/items/:vegetable", controller.sendReqParam);
app.use(controller.queryMiddleware);
app.use(encoded);
app.post("/", controller.bodyQueryRequest);
app.listen(port, controller["serverRunningMessage"](port));
/*

Controllers are responsible for processing data by communicating with models, performing code logic, and calling for a view to be rendered in a server’s response.

In this lesson, you learned how to build routes and middleware functions with Express.js. 
Then you used middleware functions to work with Express.js in analyzing request body contents.
*/
