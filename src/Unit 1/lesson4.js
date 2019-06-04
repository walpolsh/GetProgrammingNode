const port = 3000, //forgot about comma separated variables
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer((req, res) => {
    console.log("recieved incoming request");
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    });

    let resMsg = `<h2>MORE TEXT!</h2><h1>Hello, Multiverse!</h1>`;
    res.write(resMsg);
    res.end();
    console.log(`sent response: ${resMsg}`);
  });

app.listen(port);
console.log(`the server is listening on port number: ${port}`);
/*

• 1 Require the http and http-status-codes modules.
• 2 Create the server with request and response parameters.
• 3 Write the response to the client.
• 4 Tell the application server to listen on port 3000.

*/
