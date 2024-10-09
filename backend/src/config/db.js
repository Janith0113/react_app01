const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Devans0113##",
  database: process.env.DB_NAME || "registration",
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

module.exports = db;
