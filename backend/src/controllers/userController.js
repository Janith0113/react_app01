const User = require("../models/User.js");

const userController = {
  register: (req, res) => {
    User.register(req.body, (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({
        message: "User registered successfully",
        userId: result.insertId,
      });
    });
  },


  loginUser: (req, res) => {
    const { username, password } = req.body;
  
    User.findByUsername(username, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      // You should ideally hash passwords in a real application
      if (user.password !== password) { 
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
    });
  },




  getAll: (req, res) => {
    User.getAll((error, users) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(users);
    });
  },

  update: (req, res) => {
    const Id = req.params.id;
    User.update(Id, req.body, (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
    });
  },

  delete: (req, res) => {
    const Id = req.params.id;
    User.delete(Id, (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    });
  },
};

module.exports = userController;
