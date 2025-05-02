import { envMode } from "../app.js";

export const handleError = (error) => {
  // Default values
  let statusCode = 500;
  let message = "Something went wrong";

  // Only show specific messages in development mode
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid input data";
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = `Invalid format of ${error.path}`;
  } else if (error.code === 11000) {
    const err = Object.keys(error.keyPattern).join(",");
    statusCode = 409;
    message = `Duplicate field - ${err}`; 
  } else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired";
  } else if (error.message) {
    message = error.message;
  }

  if (envMode === "DEVELOPMENT") {
    // Return full error details for debugging
    return {
      statusCode,
      message:error.message,
    };
  }

  // In production: return minimal info
  return {
    statusCode,
    message,
  };
};
