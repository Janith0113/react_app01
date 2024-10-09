import React from "react";
import Sidebar from "../components/Sidebar"; 
import FormTable from "../components/formTable"; 
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit"; 
import Navbar from "../components/Navbar";

const FormTablePage = () => {
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md="2">
            <Sidebar />
        </MDBCol>

        <MDBCol md="10">
        <MDBRow>
            <Navbar/>
        </MDBRow><br></br><br></br>

          <div className="content">
            <FormTable />
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormTablePage;
