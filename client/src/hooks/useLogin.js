// src/hooks/useLogin.js
import { useState } from "react";
import { loginUser } from "../services/apiService"; 
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const useLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showLoading = function() {
    Swal.fire({
      title: 'Now loading',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    showLoading(); // Show loading spinner when the form is submitted
  
    try {
      const response = await loginUser(credentials);
      console.log("Response:", response); 
      setLoginError(null);
  
      localStorage.setItem('username', credentials.username);
  
      Swal.fire({
        title: 'Login Successful!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
  
      navigate("/users");
    } catch (err) {
      console.error("Login error:", err);
      setLoginError(err.message);
  
      Swal.fire({
        title: 'Login Failed!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };

  return {
    credentials,
    handleChange,
    handleSubmit,
    loginError,
  };
};

export default useLogin;
