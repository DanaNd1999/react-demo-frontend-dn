import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Paginate from "../Helpers/Paginate";

import Api from "../Auth/Api";

const RoleIndex = () => {
  const { httpAuth } = Api();
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  const getRoles = async (pageNumber = 1) => {
    await httpAuth
      .get(`/roles?page=${pageNumber}`)
      .then(({ data }) => {
        setRoles(data.data);
        setCurrentPage(data.meta.current_page);
        setTotal(data.meta.total);
        setPerPage(data.meta.per_page);
        setIsloading(false);
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  const deleteRole = async (id: number) => {
    await httpAuth
      .delete(`/roles/${id}`)
      .then(({ data }) => {
        setRoles(data.data);
        setIsloading(false);
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  return (
    <>
      <div className="card-header row text-secondary mt-3">
        <h4 className="card-title">
          All Roles
          <Link
            className="btn btn-outline-primary float-end"
            to={"/roles/create"}
          >
            Add Role
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <table className="table mb-0 text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              roles.length > 0 &&
              roles.map((roleData: any) => (
                <tr key={roleData.id}>
                  <td>{roleData["name"]}</td>
                  <td>
                    <Link to={`/roles/${roleData.id}/edit`}>
                      <FaEdit />
                    </Link>
                    <FaTrash
                      style={{ color: "red", marginLeft: "5px" }}
                      type="icon"
                      onClick={() => deleteRole(roleData.id)}
                    />
                  </td>
                </tr>
              ))}
            {!isLoading && roles.length == 0 && <p>No roles found.</p>}
            {!isLoading && error && <p>{error}</p>}
            {isLoading && <p>Loading...</p>}
          </tbody>
        </table>
        <Paginate
          currentPage={currentPage}
          total={total}
          perPage={perPage}
          apiMethod={getRoles}
        />
      </div>
    </>
  );
};

export default RoleIndex;
