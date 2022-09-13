import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../Auth/Api";
import Message from "../Helpers/Message";

const PermissionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { httpAuth } = Api();
  const [permission, setPermission] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  const nameInputRef = useRef<HTMLInputElement>(null); //so it doesn't rerender component on every key stroke

  const getPermission = async () => {
    await httpAuth
      .get("/permissions/" + id)
      .then(({ data }) => {
        setPermission(data.data.name);
      })
      .catch((error) => {
        if (error.response.status == 422) {
          setMessage(error.response.data.message);
        }
      });
  };

  useEffect(() => {
    getPermission();
  }, []);

  const updatePermissionHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (nameInputRef.current) {
      await httpAuth
        .put("/permissions/" + id, { name: nameInputRef.current?.value })
        .then((res) => {
          // navigate("/permissions");
          setMessage("Updated Successfully");
          setType("success");
        })
        .catch((error) => {
          setMessage(error.response.data.message);
        });
    }
  };

  return (
    <>
      <div className="card-header row text-secondary mt-3">
        <h4 className="card-title">
          Edit Permission
          <Link
            to={"/permissions"}
            className="btn btn-outline-primary btn-sm float-end"
          >
            Back
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={updatePermissionHandler}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              ref={nameInputRef}
              value={permission}
              onChange={(e) => {
                setPermission(e.target?.value);
              }}
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

export default PermissionEdit;
