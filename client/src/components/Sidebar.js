// src/components/Sidebar.js

import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar"><br></br><br></br>
      <h2>Menu</h2>
      <ul>
      
        <li><Link to="/users">Users</Link></li>
        <li className="logout"><Link to="/">LogOut</Link></li>


      </ul>
    </div>
  );
};

export default Sidebar;
