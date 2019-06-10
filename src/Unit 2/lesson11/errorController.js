const httpStatus = require("http-status-codes");

exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is
  experiencing a problem!`);
};
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error);
};
exports.sendReqHome = (req, res) => {
  res.send(`This is the page for ME`);
};

exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.sendFile(`./public/${errorCode}.html`, {
    root: "./"
  });
};
