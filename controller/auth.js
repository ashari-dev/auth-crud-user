const bycryp = require("bcrypt");
const { findUserByEmail, createUser } = require("../model/user");
const generateToken = require("../library/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await findUserByEmail(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists!" });
    }

    const salt = await bycryp.genSalt(10);
    const hastPassword = await bycryp.hash(password, salt);
    const newUser = await createUser(name, email, hastPassword);
    res
      .status(200)
      .json({ status: true, message: "Register success!!", user: newUser });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Email and password is wrong!" });
    }

    const validPassword = await bycryp.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Email and password is wrong!" });
    }

    const token = generateToken(user);

    res
      .status(200)
      .json({
        status: true,
        message: "Login success",
        data: { name: user.name, token },
      });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

module.exports = { registerUser, loginUser };
