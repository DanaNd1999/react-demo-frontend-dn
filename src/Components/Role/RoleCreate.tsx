import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Auth/Api";
import Error from "../Helpers/Error";

const RoleCreate = () => {
  const navigate = useNavigate();
  const { httpAuth } = Api();
  const nameInputRef = useRef<HTMLInputElement>(null); //so it doesn't rerender component on every key stroke

  const [error, setError] = useState("");

  const saveRole = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;

    await httpAuth
      .post("/roles", { name: name })
      .then(({ data }) => {
        navigate(`/roles/${data.data.id}/edit`);
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
          Add Role
          <Link
            to={"/permissions"}
            className="btn btn-primary btn-sm float-end"
          >
            Back
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={saveRole}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              ref={nameInputRef}
              //   onChange={(e) => setWaybill(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <Error message={error} />
      </div>
    </>
  );
};

export default RoleCreate;
