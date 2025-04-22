import jwt from "jsonwebtoken";

const sendToken = (res, user, statusCode, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  const options = {
    httpOnly: true,
    maxAge: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    secure: true,
    sameSite: "none",
  };

  return res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
  });
};

export default sendToken;
