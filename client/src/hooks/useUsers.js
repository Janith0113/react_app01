import { useState, useEffect } from "react";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  registerUser,
} from "../services/apiService";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { validateForm } from "../Utiles/Validations"; // Import the validation function

const useUsers = (handleClose, initialFormData) => {
  const [users, setUsers] = useState([]); // Store list of users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [formData, setFormData] = useState(
    initialFormData || {
      name: "",
      username: "",
      password: "",
      address: "",
      phone: "",
    }
  ); // Form data state
  const [formErrors, setFormErrors] = useState({}); // Validation error state
  const [currentUser, setCurrentUser] = useState(null); // Current user being edited
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const { Id } = useParams(); // Get the user ID from the route params
  const navigate = useNavigate(); // For navigation after submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch users when the component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Sync formData when the initialFormData changes
  useEffect(() => {
    setFormData(
      initialFormData || {
        name: "",
        username: "",
        password: "",
        address: "",
        phone: "",
      }
    );
  }, [initialFormData]);

  // Fetch a specific user when the Id param changes (for editing)
  useEffect(() => {
    if (Id) {
      const user = users.find((user) => user.Id === parseInt(Id));
      if (user) {
        console.log("Found user to edit:", user); // Debugging: Ensure this is the correct user
        setCurrentUser(user.Id); // Set the currentUser to the correct ID
        setFormData(user); // Populate the form with the user data
        setShowModal(true); // Open the modal
      }
    }
  }, [Id, users]);

  // Reset the form after submission or cancel
  const resetForm = () => {
    setFormData({
      name: "",
      username: "",
      password: "",
      address: "",
      phone: "",
    });
    setFormErrors({});
    setCurrentUser(null); // Reset currentUser when the form is reset
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const validationErrors = validateForm(formData); // Validate form data
    if (Object.values(validationErrors).some((error) => error)) {
      setFormErrors(validationErrors); // Set validation errors if validation fails
      return; // Stop submission if there are validation errors
    }

    try {
      const newUser = await registerUser(formData);
      await Swal.fire({
        title: "Success!",
        text: "You have successfully registered!",
        icon: "success",
        confirmButtonText: "Okay",
      });
      resetForm(); // Reset the form data after successful submission
    } catch (error) {
      console.error("Error during registration:", error);
      alert(`Registration failed: ${error.message}`);
    }

    navigate("/");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData); // Validate form data
    if (Object.values(validationErrors).some((error) => error)) {
      setFormErrors(validationErrors); // Set validation errors if validation fails
      return; // Stop submission if there are validation errors
    }

    // If currentUser is set, perform update, otherwise register a new user
    if (currentUser) {
      await handleUpdate(currentUser, formData); // Pass currentUser ID and form data to handleUpdate
    }
    navigate("/users");
    handleModalClose();
  };

  // Handle user deletion
  const handleDelete = async (Id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(Id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.Id !== Id));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "There was an error deleting the user.", "error");
      }
    }
  };

  const handleUpdate = async (Id, updatedData) => {
    try {
      await updateUser(Id, updatedData); // Send updated data to backend

      // Update the user list locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.Id === Id ? { ...user, ...updatedData } : user
        )
      );

      Swal.fire("Success!", "User has been updated.", "success");
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", "There was an error updating the user.", "error");
    }
  };

  // Handle editing user
  const handleEdit = (user) => {
    setFormData(user);
    setCurrentUser(user.Id);
    setShowModal(true);
  };

  // Handle opening the modal for editing a user
  const handleModalOpen = (user) => {
    handleEdit(user); // Populate form with user data
    setShowModal(true); // Show modal
  };

  // Handle closing the modal
  const handleModalClose = () => {
    setShowModal(false); // Hide modal
    resetForm(); // Reset form when closing
  };

  return {
    users,
    loading,
    error,
    formData,
    formErrors,
    handleChange,
    handleSubmit,
    handleFormSubmit,
    handleEdit,
    handleDelete,
    handleUpdate,
    handleModalOpen,
    handleModalClose,
    showModal,
  };
};

export default useUsers;
