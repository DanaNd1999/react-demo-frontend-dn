import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Api from "../Auth/Api";

function UserIndex() {
  const { httpAuth } = Api();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const getUsers = async () => {
    await httpAuth
      .get("/users")
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  const deleteUser = async (id: number) => {
    try {
      setUsers(await httpAuth.delete(`/users/${id}`));
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <Link className="btn btn-primary mb-2 float-end" to={"/users/create"}>
            Add User
          </Link>
        </div>
        <div className=" card-body">
          <table className="table mb-0 text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((userData: any) => (
                  <tr key={userData.id}>
                    <td>{userData["name"]}</td>
                    <td>{userData["email"]}</td>
                    <td>
                      {userData["roles"].map((role: any) => role["name"] + " ")}
                    </td>

                    <td>
                      <Link to={`/users/${userData.id}/edit`}>
                        <FaEdit />
                      </Link>
                      <FaTrash
                        style={{ color: "red", marginLeft: "5px" }}
                        type="icon"
                        onClick={() => deleteUser(userData.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserIndex;
