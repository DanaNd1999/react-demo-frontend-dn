import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Auth/Api";
import PermissionsForm from "./PermissionForm";

const PermissionCreate = () => {
  const navigate = useNavigate();
  const { httpAuth } = Api();
  const nameInputRef = useRef<HTMLInputElement>(null); //so it doesn't rerender component on every key stroke

  const [error, setError] = useState("");

  const savePermissionHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameInputRef.current?.value || "";

    await httpAuth
      .post("/permissions", { name: name })
      .then((res) => {
        navigate("/permissions");
      })
      .catch((error) => {
        if (error.response.status == 422) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="card-header">
        <h4>
          Add Permission
          <Link
            to={"/permissions"}
            className="btn btn-primary btn-sm float-end"
          >
            Back
          </Link>
        </h4>
      </div>
      <PermissionsForm
        handler={savePermissionHandler}
        error={error}
        nameRef={nameInputRef}
      />
    </>
  );
};

export default PermissionCreate;
