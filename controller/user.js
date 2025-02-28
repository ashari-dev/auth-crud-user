const bycryp = require("bcrypt");
const {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  findUserByEmail,
} = require("../model/user");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await findAllUsers();
    res
      .status(200)
      .json({ status: true, message: "All users found", data: allUsers });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Find user by Id", data: user });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const addUsers = async (req, res) => {
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
      .json({ status: true, message: "Create user success!!", data: newUser });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (email !== user.email && (await findUserByEmail(email))) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists!" });
    }

    if (password) {
      const salt = await bycryp.genSalt(10);
      const hastPassword = await bycryp.hash(password, salt);
      await updateUser(id, name, email, hastPassword);
    } else {
      await updateUser(id, name, email);
    }

    const data = await findUserById(id);
    res
      .status(200)
      .json({ status: true, message: "Update user success!!", data: data });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const dropUser = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteCount = await deleteUser(id);
    if (deleteCount === 0) {
      return res
        .status(400)
        .json({ status: false, message: "User not found to delete" });
    }
    res
      .status(200)
      .json({ status: true, message: "User Deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

module.exports = { getAllUsers, getOneUser, addUsers, editUser, dropUser };
