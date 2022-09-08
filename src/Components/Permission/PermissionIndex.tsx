import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import Api from "../Auth/Api";

const PermissionIndex = () => {
  const { httpAuth } = Api();
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(false);

  const getPermissions = async () => {
    await httpAuth
      .get("/permissions")
      .then(({ data }) => {
        setPermissions(data.data);
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
        setPermissions(data.data);
        setIsloading(false);
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <Link
            className="btn btn-primary mb-2 float-end"
            to={"/permissions/create"}
          >
            Add Permission
          </Link>
        </div>
        <div className=" card-body">
          {/* <div className="table-responsive"> */}
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
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default PermissionIndex;
