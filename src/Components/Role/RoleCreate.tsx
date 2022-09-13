import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Auth/Api";
import Message from "../Helpers/Message";

const RoleCreate = () => {
  const navigate = useNavigate();
  const { httpAuth } = Api();
  const nameInputRef = useRef<HTMLInputElement>(null); //so it doesn't rerender component on every key stroke

  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

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
          setMessage(error.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="card-header row text-secondary mt-3">
        <h4 className="card-title">
          Add Role
          <Link
            to={"/roles"}
            className="btn btn-outline-primary btn-sm float-end"
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

export default RoleCreate;
