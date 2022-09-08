import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../Auth/Api";
import Error from "../Helpers/Error";
import PermissionsForm from "./PermissionForm";

const PermissionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { httpAuth } = Api();
  const [permission, setPermission] = useState("");

  const [error, setError] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null); //so it doesn't rerender component on every key stroke

  const getPermission = async () => {
    await httpAuth
      .get("/permissions/" + id)
      .then(({ data }) => {
        setPermission(data.data.name);
      })
      .catch((error) => {
        if (error.response.status == 422) {
          setError(error.response.data.message);
        }
      });
  };

  useEffect(() => {
    getPermission();
  }, []);

  const updatePermissionHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const name: string = nameInputRef.current?.value || "";

    await httpAuth
      .put("/permissions/" + id, { name: name })
      .then((res) => {
        navigate("/permissions");
      })
      .catch((response) => {});
  };

  const nameHandler = (e: any) => {
    setPermission(e.target?.value);
  };

  return (
    <>
      <div className="card-header">
        <h4>
          Edit Permission
          <Link
            to={"/permissions"}
            className="btn btn-primary btn-sm float-end"
          >
            Back
          </Link>
        </h4>
      </div>
      <PermissionsForm
        handler={updatePermissionHandler}
        error={error}
        nameRef={nameInputRef}
        name={permission}
        fieldHandler={nameHandler}
      />
    </>
  );
};

export default PermissionEdit;
