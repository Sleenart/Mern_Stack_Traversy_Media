const errorhandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.MODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorhandler };
