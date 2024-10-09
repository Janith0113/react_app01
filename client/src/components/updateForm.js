import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "../styles/update.css"; // Ensure this file exists and contains relevant styles
import useForm from "../hooks/useUsers";
const UserFormPageModal = ({
  show,
  handleClose,
  formData: initialFormData,
}) => {
  const [formData, setFormData] = useState(initialFormData || {});
  const { handleFormSubmit } = useForm(handleClose, initialFormData);

  useEffect(() => {
    setFormData(initialFormData || {});
  }, [initialFormData]);

  const handleChange01 = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      console.log("Updated form data:", updatedData); // Log the updated data
      return updatedData;
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange01}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange01}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange01}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange01}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange01}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="form-buttons d-flex justify-content-between mt-3">
            <Button type="submit" className="btn-update">
              Update User
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserFormPageModal;
