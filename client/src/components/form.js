import React from "react";
import useForm from "../hooks/useUsers"; // Ensure the path is correct
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import "../styles/form.css"; // Import the updated CSS file

const Form = (initialValues) => {
  const { formData, handleChange, handleSubmit, formErrors } =
    useForm(initialValues);

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6">
          {/* Icon container */}
          <div className="icon-container">
            <MDBIcon fas icon="crow" className="crow-icon" />
          </div>

          {/* Form container */}
          <div className="form-container">
            <h3 className="heading">Register</h3>

            <form onSubmit={handleSubmit}>
              {/* Name field */}
              <MDBInput
                wrapperClass="input-wrapper"
                label="Name"
                id="name"
                type="text"
                size="lg"
                value={formData.name}
                onChange={handleChange}
                name="name"
                required
              />
              {formErrors.name && (
                <p className="error-message">
                  {formErrors.name}
                </p> /* Display name validation error */
              )}

              {/* Username field */}
              <MDBInput
                wrapperClass="input-wrapper"
                label="Username"
                id="username"
                type="text"
                size="lg"
                value={formData.username}
                onChange={handleChange}
                name="username"
                required
              />
              {formErrors.username && (
                <p className="error-message">
                  {formErrors.username}
                </p> /* Display username validation error */
              )}

              {/* Password field */}
              <MDBInput
                wrapperClass="input-wrapper"
                label="Password"
                id="password"
                type="password"
                size="lg"
                value={formData.password}
                onChange={handleChange}
                name="password"
                required
              />
              {formErrors.password && (
                <p className="error-message">
                  {formErrors.password}
                </p> /* Display password validation error */
              )}

              {/* Address field */}
              <MDBInput
                wrapperClass="input-wrapper"
                label="Address"
                id="address"
                type="text"
                size="lg"
                value={formData.address}
                onChange={handleChange}
                name="address"
                required
              />
              {formErrors.address && (
                <p className="error-message">
                  {formErrors.address}
                </p> /* Display address validation error */
              )}

              {/* Phone field */}
              <MDBInput
                wrapperClass="input-wrapper"
                label="Phone Number"
                id="phone"
                type="tel"
                size="lg"
                value={formData.phone}
                onChange={handleChange}
                name="phone"
                required
              />
              {formErrors.phone && (
                <p className="error-message">
                  {formErrors.phone}
                </p> /* Display phone validation error */
              )}

              {/* Submit button */}
              <MDBBtn
                className="submit-btn"
                color="info"
                size="lg"
                type="submit"
              >
                Register
              </MDBBtn>
            </form>
          </div>
        </MDBCol>

        <MDBCol className="custom-col">
          {/* Register image */}
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Register"
            className="register-image"
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Form;
