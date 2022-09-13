import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Auth/Api";
import Message from "../Helpers/Message";
import Card from "../Helpers/Card";

const UserCreate = () => {
  const { httpAuth } = Api();
  const navigate = useNavigate();
  const firstNameInputRef = useRef<HTMLInputElement>(null); //so it doesn't rerender component on every key stroke
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  const saveUser = async (event: React.FormEvent) => {
    event.preventDefault();

    const firstName = firstNameInputRef.current?.value; //the ? is in case the field is still not connected to ref, can be replaced with ! if we're sure it won't be null
    const lastName = lastNameInputRef.current?.value;

    await httpAuth
      .post("/users", { name: name })
      .then((data) => {
        navigate(`/users/${data.data.id}/edit`);
      })
      .catch((error) => {
        if (error.response.status == 422) {
          setMessage(error.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="card-header row text-secondary mt-3">
        <h4 className="card-title">
          Add User
          <Link
            to={"/users"}
            className="btn btn-outline-primary btn-sm float-end"
          >
            Back
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={saveUser}>
          <div className="form-group mb-3">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              ref={firstNameInputRef}
              placeholder="Enter first name"
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              ref={lastNameInputRef}
              placeholder="Enter last name"
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

export default UserCreate;
