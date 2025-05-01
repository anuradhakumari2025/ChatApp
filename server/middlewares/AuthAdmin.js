import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "NOT AUTHORIZED" });
  }
  try {
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);
    const isMatched = secretKey === process.env.ADMIN_SECRET_KEY;
    if (!isMatched)
      return res.json({ success: false, message: "NOT AUTHORIZED" });

    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
