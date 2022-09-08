import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Auth/Api";
import Error from "../Helpers/Error";

const UserCreate = () => {
  const { httpAuth } = Api();
  const navigate = useNavigate();
  const nameInputRef = useRef<HTMLInputElement>(null); //so it doesn't rerender component on every key stroke
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  const saveUser = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameInputRef.current?.value; //the ? is in case the field is still not connected to ref, can be replaced with ! if we're sure it won't be null

    await httpAuth
      .post("/users", { name: name })
      .then((res) => {
        navigate("/users");
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
          Add User
          <Link to={"/users"} className="btn btn-primary btn-sm float-end">
            Back
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={saveUser}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              ref={nameInputRef}
              placeholder="Enter name"
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              ref={emailInputRef}
              placeholder="Enter email"
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              ref={passwordInputRef}
              placeholder="Enter password"
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

export default UserCreate;
