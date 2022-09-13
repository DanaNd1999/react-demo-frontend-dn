import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../Auth/Api";
import Message from "../Helpers/Message";

const RoleEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { httpAuth } = Api();

  interface Permission {
    id: string;
    name: string;
    guard_name: string;
  }

  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  const nameInputRef = useRef<HTMLInputElement>(null); //so it doesn't rerender component on every key stroke

  // fetch role
  const getRole = async () => {
    await httpAuth
      .get("/roles/" + id)
      .then(({ data }) => {
        setRole(data.data.name);
        setSelectedPermissions(
          data.data.permissions.map((a: Permission) => a.id)
        );
      })
      .catch((error) => {
        if (error.response.status == 422) {
          setMessage(error.response.data.message);
        }
      });
  };

  //fetch permissions
  const getPermissions = async () => {
    await httpAuth
      .get("/permissions")
      .then(({ data }) => {
        setPermissions(data.data);
      })
      .catch((error) => {
        if (error.response.status == 422) {
          setMessage(error.response.data.message);
        }
      });
  };

  useEffect(() => {
    getRole();
    getPermissions();
  }, []);

  //update role
  const updateRole = async (event: React.FormEvent) => {
    event.preventDefault();
    await httpAuth
      .put(`/roles/${id}`, {
        name: nameInputRef.current?.value,
        permissions: selectedPermissions,
      })
      .then((res) => {
        setMessage("Updated Successfully");
        setType("success");
      })
      .catch((error) => {
        if (error.response.status == 422) {
          setMessage(error.response.data.message);
        }
      });
  };

  //permission handler
  const updateSelectedPermissions = (id: string) => {
    setSelectedPermissions((selectedPermissions) =>
      !selectedPermissions.includes(id)
        ? [...selectedPermissions, id]
        : [
            ...selectedPermissions.filter((element: string) => {
              return element !== id;
            }),
          ]
    );
  };

  return (
    <>
      <div className="card-header row text-secondary mt-3">
        <h4 className="card-title">
          Edit Role
          <Link
            to={"/roles"}
            className="btn btn-outline-primary btn-sm float-end"
          >
            Back
          </Link>
        </h4>
      </div>

      <div className="card-body">
        <form onSubmit={updateRole}>
          <div className="form-group row mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              ref={nameInputRef}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group row mb-3">
            {permissions.map((permission) => (
              <div
                className="col-4 mb-5 text-left form-check"
                key={permission.id}
              >
                <label className="form-check-label"> </label>
                <input
                  name="permissions"
                  className="form-check-input"
                  type="checkbox"
                  value={permission.id}
                  checked={
                    selectedPermissions.includes(permission.id) ? true : false
                  }
                  onChange={() => updateSelectedPermissions(permission.id)}
                />
                <span></span>
                {permission.name}
              </div>
            ))}
          </div>
          <div className="form-group mb-3">
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </div>
        </form>
        <Message message={message} type={type} />
      </div>
    </>
  );
};

export default RoleEdit;
