const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const pool = require("./library/db");
const verifyToken = require("./library/middleware");
const authRouter = require("./router/auth");
const userRouter = require("./router/user");

const port = process.env.HOST_PORT;
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.get("/tes", verifyToken, async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT name, email FROM user WHERE id = ${req.user.id}`
    );
    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
