const { Pool } = require("pg");
require("dotenv").config();

class Database {
  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    this.pool.on("error", (err) => {
      console.error("ini error bro", err);
      process.exit(-1);
    });
  }
  async query(text, params) {
    this.client = await this.pool.connect();
    const res = await this.client.query(text, params);
    await this.close();
    return res;
  }

  async close() {
    await this.client.end();
  }
}

module.exports = new Database();
