exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for this ${veg}`);
};
exports.sendReqHome = (req, res) => {
  res.send(`This is the page for ME`);
};

exports.queryMiddleware = (req, res, next) => {
  console.log(`make request to ${req.url}`);
  console.log(req.query);
  next();
};

exports.bodyQueryRequest = (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("post successful");
};

exports.serverRunningMessage = port => {
  console.log(
    `The Express.js server has started and is listening on port number: ${port}`
  );
};

exports.respondWithName = (req, res) => {
  res.render("index", { name: req.params.myName });
};
