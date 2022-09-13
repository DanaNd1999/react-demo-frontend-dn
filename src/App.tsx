import React from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import UserIndex from "./Components/User/UserIndex";
import UserCreate from "./Components/User/UserCreate";
import UserEdit from "./Components/User/UserEdit";

import RoleIndex from "./Components/Role/RoleIndex";
import RoleCreate from "./Components/Role/RoleCreate";
import RoleEdit from "./Components/Role/RoleEdit";

import PermissionIndex from "./Components/Permission/PermissionIndex";
import PermissionCreate from "./Components/Permission/PermissionCreate";
import PermissionEdit from "./Components/Permission/PermissionEdit";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./Components/Auth/LogIn";

import Api from "./Components/Auth/Api";
import Card from "./Components/Helpers/Card";

function App() {
  const { getToken } = Api();
  const navigate = useNavigate();

  if (!getToken()) {
    return <Login />;
  }

  const logout = () => {
    if (getToken != undefined) {
      sessionStorage.clear();
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#dashboard">React Demo</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to={"users"}>
              Users
            </Link>
            <Link className="nav-link" to={"roles"}>
              Roles
            </Link>
            <Link className="nav-link" to={"permissions"}>
              Permissions
            </Link>
          </Nav>
          <div className="d-flex">
            <button type="button" className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          </div>
        </Container>
      </Navbar>
      <Card>
        <Routes>
          <Route path="dashboard" element={<Main />} />
          <Route path="users">
            <Route index element={<UserIndex />} />
            <Route path="create" element={<UserCreate />} />
            <Route path=":id/edit" element={<UserEdit />} />
          </Route>
          <Route path="roles">
            <Route index element={<RoleIndex />} />
            <Route path="create" element={<RoleCreate />} />
            <Route path=":id/edit" element={<RoleEdit />} />
          </Route>
          <Route path="permissions">
            <Route index element={<PermissionIndex />} />
            <Route path="create" element={<PermissionCreate />} />
            <Route path=":id/edit" element={<PermissionEdit />} />
          </Route>
        </Routes>
      </Card>
    </>
  );
}

export default App;
