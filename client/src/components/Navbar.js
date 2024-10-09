// src/components/Navbar.js
import React from "react";
import { MDBNavbar, MDBIcon } from "mdb-react-ui-kit";
import useNavbar from "../hooks/usenavbar"; // Import the custom hook
import "../styles/Navbar.css"; // Import the external CSS

const Navbar = () => {
  const { username } = useNavbar(); // Get the username from the custom hook

  return (
   
      <MDBNavbar className="navbar username">
        <MDBIcon fas icon="users" className="icon" />
        Hello, {username} 
        &nbsp;&nbsp;&nbsp;
      </MDBNavbar>
    
  );
};

export default Navbar;
