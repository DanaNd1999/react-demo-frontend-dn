import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Auth/Api";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const { http, saveToken } = Api();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await http
      .post("/login", {
        email: emailInputRef.current?.value,
        password: passwordInputRef.current?.value,
      })
      .then((res) => {
        saveToken(res.data.data.token);
        navigate("/dashboard");
      });
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">Login!</div>
        <div className="card-body">
          <form onSubmit={loginHandler}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                ref={emailInputRef}
                placeholder="Enter email"
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                ref={passwordInputRef}
                placeholder="Password"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
