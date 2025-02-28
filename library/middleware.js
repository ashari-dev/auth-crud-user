const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access filed! " });
  }

  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified;
  } catch (error) {
    res.status(400).json({ message: "Token Invalid" });
  }
};

module.exports = verifyToken;
