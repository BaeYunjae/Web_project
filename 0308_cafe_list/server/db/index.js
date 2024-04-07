const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  // AWS IP
  host: "",
  // mysql username
  user: "",
  // mysql password
  password: "",
  // db name
  database: "order_system",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { pool };
