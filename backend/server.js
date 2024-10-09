// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "Devans0113##", // Replace with your MySQL password
  database: "registration", // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

// Endpoint to register a new user
app.post("/register", (req, res) => {
  const newUser = req.body;
  const query =
    "INSERT INTO users (name, username, password, address, phone) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      newUser.name,
      newUser.username,
      newUser.password,
      newUser.address,
      newUser.phone,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to register user" });
      }
      res.status(201).json({ id: result.insertId, ...newUser });
    }
  );
});

// Endpoint to get all registered users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
