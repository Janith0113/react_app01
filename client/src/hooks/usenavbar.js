// src/hooks/useNavbar.js
import { useEffect, useState } from "react";

const useNavbar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return { username };
};

export default useNavbar;
