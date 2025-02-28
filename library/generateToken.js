const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const jwtExp = process.env.JWT_EXP;

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: jwtExp,
  });
};

module.exports = generateToken;
