import React, { useState } from "react";
import "../styles/Table.css";
import useUsers from "../hooks/useUsers";
import {
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import UserFormPageModal from "./updateForm";

const FormTable = () => {
  const {
    users,
    loading,
    error,
    handleDelete,
    handleEdit,
    formData,
    handleChange01,
    handleSubmit,
  } = useUsers();
  const [showModal, setShowModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Show 5 rows per page

  const handleModalOpen = (user) => {
    handleEdit(user);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // Get current users for the page
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get the total number of pages
  const totalPages = Math.ceil(users.length / rowsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <MDBContainer>
      <h3>User Management</h3>
      <br />

      <MDBTable align="middle" responsive className="table table-hover">
        <MDBTableHead light>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.Id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <MDBBtn
                      color="warning"
                      size="sm"
                      onClick={() => handleModalOpen(user)}
                    >
                      <MDBIcon icon="edit" className="me-2" />
                      Update
                    </MDBBtn>

                    <MDBBtn
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(user.Id)}
                    >
                      <MDBIcon icon="trash" className="me-2" />
                      Delete
                    </MDBBtn>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>

      {/* Pagination Controls */}
      <MDBPagination className="mb-0">
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink
            onClick={() => paginate(currentPage - 1)}
            tabIndex={-1}
            aria-disabled="true"
          >
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>

        {[...Array(totalPages)].map((_, index) => (
          <MDBPaginationItem active={index + 1 === currentPage} key={index}>
            <MDBPaginationLink onClick={() => paginate(index + 1)}>
              {index + 1}
            </MDBPaginationLink>
          </MDBPaginationItem>
        ))}

        <MDBPaginationItem disabled={currentPage === totalPages}>
          <MDBPaginationLink onClick={() => paginate(currentPage + 1)}>
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>

      {/* Modal for editing user */}
      <UserFormPageModal
        show={showModal}
        handleClose={handleModalClose}
        formData={formData}
        handleChange={handleChange01}
        handleSubmit={handleSubmit}
      />
    </MDBContainer>
  );
};

export default FormTable;
