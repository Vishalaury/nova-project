// const notFound = (req, res, next) => {
//   const error = new Error(`Route not found: ${req.originalUrl}`);

//   res.status(404);

//   next(error);
// };

// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack);

//   const statusCode =
//     res.statusCode && res.statusCode !== 200
//       ? res.statusCode
//       : 500;

//   res.status(statusCode).json({
//     success: false,
//     message: err.message || "Internal Server Error"
//   });
// };

// module.exports = {
//   notFound,
//   errorHandler
// };



const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format."
    });
  }

  // Duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate value already exists."
    });
  }

  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

module.exports = {
  notFound,
  errorHandler
};