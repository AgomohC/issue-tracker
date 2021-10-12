const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };
  if (err.name === "CastError") {
    console.log(err);
    customError.msg = `_id ${err.value._id} is invalid`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  return res.status(customError.statusCode).json({ error: customError.msg });
};

module.exports = errorHandlerMiddleware;
