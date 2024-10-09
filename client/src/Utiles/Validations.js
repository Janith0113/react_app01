// src/utils/validations.js

export const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters long";
    return "";
  };
  
  export const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters long";
    return "";
  };
  
  export const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters long";
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (!hasUpperCase) return "Password must contain at least one uppercase letter";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecialChar) return "Password must contain at least one special character";
  
    return ""; 
  };
  
  
  export const validateAddress = (address) => {
    if (!address) return "Address is required";
    return "";
  };
  
  export const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Example regex for 10-digit phone numbers
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Phone number must be 10 digits";
    return "";
  };
  
  export const validateForm = (formData) => {
    const errors = {};
    errors.name = validateName(formData.name);
    errors.username = validateUsername(formData.username);
    errors.password = validatePassword(formData.password);
    errors.address = validateAddress(formData.address);
    errors.phone = validatePhone(formData.phone);
    return errors;
  };
  