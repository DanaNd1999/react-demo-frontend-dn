import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Paginate from "../Helpers/Paginate";

import Api from "../Auth/Api";

const PermissionIndex = () => {
  const { httpAuth } = Api();
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);

  const getPermissions = async (pageNumber = 1) => {
    await httpAuth
      .get(`/permissions?page=${pageNumber}`)
      .then(({ data }) => {
        setPermissions(data.data);
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
    getPermissions();
  }, []);

  const deletePermission = async (id: number) => {
    await httpAuth
      .delete(`/permissions/${id}`)
      .then(({ data }) => {
        //should I filter the permissions array without reloading the page?
        getPermissions();
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  return (
    <>
      <div className="card-header row text-secondary">
        <h4 className="card-title">
          All Permissions
          <Link
            className="btn btn-outline-primary float-end"
            to={"/permissions/create"}
          >
            Add Permission
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
              permissions.length > 0 &&
              permissions.map((permissionsData: any) => (
                <tr key={permissionsData.id}>
                  <td>{permissionsData["name"]}</td>
                  <td>
                    <Link to={`/permissions/${permissionsData.id}/edit`}>
                      <FaEdit />
                    </Link>
                    <FaTrash
                      style={{ color: "red", marginLeft: "5px" }}
                      type="icon"
                      onClick={() => deletePermission(permissionsData.id)}
                    />
                  </td>
                </tr>
              ))}
            {!isLoading && permissions.length == 0 && (
              <p>No permissions found.</p>
            )}
            {!isLoading && error && <p>{error}</p>}
            {isLoading && <p>Loading...</p>}
          </tbody>
        </table>
        <Paginate
          currentPage={currentPage}
          total={total}
          perPage={perPage}
          apiMethod={getPermissions}
        />
      </div>
    </>
  );
};

export default PermissionIndex;
