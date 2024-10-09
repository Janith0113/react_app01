import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Form from "./components/form";
import FormTablePage from "./pages/formTablePage";
import LoginPage from "./components/login";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation();

  const hideSidebarPaths = ["/", "/form"];
  const shouldHideSidebar =
    hideSidebarPaths.includes(location.pathname);

  return (
    <div className="App" style={{ display: "flex" }}>
      {!shouldHideSidebar && <Sidebar />}{" "}
      <div className="content" style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/users" element={<FormTablePage />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
