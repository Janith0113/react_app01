// src/pages/login.js
import React from "react";
import useLogin from "../hooks/useLogin"; // Adjust the path as necessary
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import "../styles/login.css"; // Import the CSS file

const LoginPage = () => {
  const { credentials, handleChange, handleSubmit, loginError } = useLogin();

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6" className="login-column">
          {/* Icon container */}
          <div className="icon-wrapper">
            <MDBIcon fas icon="crow" className="icon-crow" />
          </div>

          {/* Login form container */}
          <div className="login-form">
            <h3 className="form-title">Log in</h3>

            {loginError && (
              <p className="error-message">{loginError}</p> // Display error message
            )}

            <MDBInput
              wrapperClass="input-wrapper01"
              label="Username"
              id="username"
              type="text"
              size="lg"
              value={credentials.username}
              onChange={handleChange}
              name="username"
              required
            />

            <MDBInput
              wrapperClass="input-wrapper01"
              label="Password"
              id="password"
              type="password"
              size="lg"
              value={credentials.password}
              onChange={handleChange}
              name="password"
              required
            />

            <MDBBtn
              className="submit-button"
              color="info"
              size="lg"
              onClick={handleSubmit}
            >
              Login
            </MDBBtn>

            <p className="forgot-password-text ">
              <a className="forgot-password-link" href="/users">
                Forgot password?
              </a>
            </p>

            <p className="register-text">
              Don't have an account?{" "}
              <a href="/form" className="link-info">
                Register here
              </a>
            </p>
          </div>
        </MDBCol>

        <MDBCol className="image-column">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login"
            className="login-image"
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginPage;
