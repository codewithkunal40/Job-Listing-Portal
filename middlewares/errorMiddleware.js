const errorMiddleware = (req, res, next, err) => {
  console.log(err);
  const defaultErrors = {
    statusCode: 500,
    message: err,
  };

  if (err.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  res.status(defaultErrors.statusCode).json({
    message: defaultErrors.message,
  });
};

export default errorMiddleware;
