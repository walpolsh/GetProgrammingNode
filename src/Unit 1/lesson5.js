const port = 3000, //forgot about comma separated variables
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer(),
  getJsonString = obj => JSON.stringify(obj, null, 2), //• 1 Convert JavaScript object to string.
  { routeMap } = require("./lesson5routes.js");

app.on("request", (req, res) => {
  let body = [];
  req.on("data", bodyData => {
    body.push(bodyData);
  });
  req.on("end", () => {
    body = Buffer.concat(body).toString();
    console.log(`Request Body Contents: ${body}`);
  });
  console.log(getJsonString(req.method));
  console.log(getJsonString(req.url));
  console.log(getJsonString(req.headers));

  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });
  let resMsg = "<h1>POWWWWW</h1>";
  if (routeMap[req.url]) {
    setTimeout(() => res.end(routeMap[req.url]), 0);
  } else {
    res.end(resMsg);
  }
});

app.listen(port);
console.log(`the server is listening on port number: ${port}`);

/*

  1 Listen for requests.
• 2 Create an array to hold chunk contents.
• 3 Process it in another callback function.
• 4 Add received data to the body array.
• 5 Run code when data transmission ends.
• 6 Convert the body array to a String of text.
• 7 Log the request’s contents to your console.

Because you haven’t built a form yet, you can use a curl command. Follow these steps:
1. With your web server running in one terminal window, open a new terminal window.
2. In the new window. run the following command: curl --data "username= Jon&password=secret" http://localhost:3000

curl is a simple way of mimicking a browser’s request to a server. 
Using the curl keyword, you can use different flags, such as –data, to send information to a server via a POST request.

True or false: Every submitted form sends its full contents in a single chunk of data.
False. 
Data is streamed to the server in chunks, which allows the server to respond based on part of the received data or even the size of the collected data.




*/
