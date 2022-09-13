import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Api from "../Auth/Api";
import Paginate from "../Helpers/Paginate";

function UserIndex() {
  const { httpAuth } = Api();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  const getUsers = async (pageNumber = 1) => {
    await httpAuth
      .get(`/users?page=${pageNumber}`)
      .then(({ data }) => {
        setUsers(data.data);
        setCurrentPage(data.meta.current_page);
        setTotal(data.meta.total);
        setPerPage(data.meta.per_page);
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
    <>
      <div className="card-header row text-secondary mt-3">
        <h4 className="card-title">
          All Users
          <Link
            className="btn btn-outline-primary float-end"
            to={"/users/create"}
          >
            Add User
          </Link>
        </h4>
      </div>

      <div className="card-body">
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
        <Paginate
          currentPage={currentPage}
          total={total}
          perPage={perPage}
          apiMethod={getUsers}
        />
      </div>
    </>
  );
}

export default UserIndex;
