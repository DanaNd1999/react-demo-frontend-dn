import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import Api from "../Auth/Api";

const RoleIndex = () => {
  const { httpAuth } = Api();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(false);

  const getRoles = async () => {
    await httpAuth
      .get("/roles")
      .then(({ data }) => {
        setRoles(data.data);
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
    <div>
      <div className="card">
        <div className="card-header">
          <Link className="btn btn-primary mb-2 float-end" to={"/roles/create"}>
            Add Role
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
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default RoleIndex;
