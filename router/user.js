const express = require("express");
const {
  getAllUsers,
  getOneUser,
  dropUser,
  addUsers,
  editUser,
} = require("../controller/user");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/", addUsers);
router.put("/:id", editUser);
router.delete("/:id", dropUser);

module.exports = router;
