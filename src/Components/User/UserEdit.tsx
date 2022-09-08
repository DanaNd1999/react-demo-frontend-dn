import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../Auth/Api";
import Error from "../Helpers/Error";

const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { httpAuth } = Api();

  interface Role {
    id: string;
    name: string;
    guard_name: string;
  }

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const [error, setError] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null); //so it doesn't rerender component on every key stroke
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // fetch user
  const getUser = async () => {
    await httpAuth
      .get(`/users/${id}`)
      .then(({ data }) => {
        setUser(data.data.name);
        setEmail(data.data.email);
        setSelectedRoles(data.data.roles.map((a: Role) => a.id));
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  //fetch roles
  const getRoles = async () => {
    await httpAuth
      .get("/roles")
      .then(({ data }) => {
        setRoles(data.data);
      })
      .catch((error: any) => {
        setError(error.response.data.message);
      });
  };

  useEffect(() => {
    getUser();
    getRoles();
  }, []);

  const updateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    await httpAuth
      .put(`/users/${id}`, {
        name: nameInputRef.current?.value,
        email: emailInputRef.current?.value,
        password: passwordInputRef.current?.value,
        roles: selectedRoles,
      })
      .then((res) => {
        navigate("/users");
      })
      .catch((error) => {
        if (error.response.status == 422) {
          setError(error.response.data.message);
        }
      });
  };

  const updateSelectedRoles = (id: string) => {
    setSelectedRoles((selectedRoles) =>
      !selectedRoles.includes(id)
        ? [...selectedRoles, id]
        : [
            ...selectedRoles.filter((element: string) => {
              return element !== id;
            }),
          ]
    );
  };
  return (
    <>
      <div className="card-header">
        <h4>
          Edit User
          <Link to={"/users"} className="btn btn-primary btn-sm float-end">
            Back
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={updateUser}>
          <div className="form-group row mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              ref={nameInputRef}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group row mb-3">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              name="email"
              ref={emailInputRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group row mb-3">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              name="password"
              ref={passwordInputRef}
              className="form-control"
            />
          </div>
          <div className="form-group row mb-3">
            {roles.map((role) => (
              <div className="col-4 mb-5 text-left form-check" key={role.id}>
                <label className="form-check-label"> </label>
                <input
                  name="roles"
                  className="form-check-input"
                  type="checkbox"
                  value={role.id}
                  checked={selectedRoles.includes(role.id) ? true : false}
                  onChange={() => updateSelectedRoles(role.id)}
                />
                <span></span>
                {role.name}
              </div>
            ))}
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

export default UserEdit;
