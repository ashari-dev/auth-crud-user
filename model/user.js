const pool = require("../library/db");

const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
};

const findAllUsers = async () => {
  const result = await pool.query("SELECT id, name, email FROM users");
  return result.rows;
};

const findUserById = async (id) => {
  const result = await pool.query(
    `SELECT name, email FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

const createUser = async (name, email, hastPassword) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING name, email`,
    [name, email, hastPassword]
  );
  return result.rows[0];
};

const updateUser = async (id, name, email, hastPassword) => {
  if (hastPassword) {
    const result = await pool.query(
      `UPDATE users SET (name, email, password)=($1, $2, $3) WHERE id = $4 RETURNING name, email`,
      [name, email, hastPassword, id]
    );
    return result.rows[0];
  } else {
    const result = await pool.query(
      `UPDATE users SET (name, email, password)=($1, $2, $3) WHERE id = $4 RETURNING name, email`,
      [name, email, hastPassword, id]
    );
    return result.rows[0];
  }
};

const deleteUser = async (id) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result.rowCount;
};

module.exports = {
  findUserByEmail,
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
