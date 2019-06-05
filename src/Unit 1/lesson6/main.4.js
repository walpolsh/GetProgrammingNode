const port = 3003;
const http = require("http");
const httpStatusCodes = require("http-status-codes");
const router = require("./router");
const fs = require("fs");
const plainTextContentType = {
  "Content-Type": "text/plain"
};
const htmlContentType = {
  "Content-Type": "text/html"
};

const customReadFile = (file, res) => {
  fs.readFile(`./${file}`, (err, data) => {
    if (err) {
      console.log("err");
    }
    res.end(data);
  });
};
router.get("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("OK!!!!");
});
router.get("/index.html", (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType);
  customReadFile("./views/index.html", res);
});
router.post("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("POSTED");
});

http.createServer(router.handle).listen(port);
console.log("listening on " + port);
