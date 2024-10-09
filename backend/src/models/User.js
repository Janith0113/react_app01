const db = require("../config/db");

const User = {
  register: (userData, callback) => {
    const query =
      "INSERT INTO users (name, username, password, address, phone) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        userData.name,
        userData.username,
        userData.password,
        userData.address,
        userData.phone,
      ],
      callback
    );
  },

  findByUsername: (username, callback) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]); // Return the first user found
    });
  },

  getAll: (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, callback);
  },

  update: (Id, userData, callback) => {
    const query =
      "UPDATE users SET name = ?, username = ?, password = ?, address = ?, phone = ? WHERE id = ?";
    db.query(
      query,
      [
        userData.name,
        userData.username,
        userData.password,
        userData.address,
        userData.phone,
        Id,
      ],
      callback
    );
  },

  delete: (Id, callback) => {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [Id], callback);
  },
};

module.exports = User;
