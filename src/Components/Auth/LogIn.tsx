import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Auth/Api";
import Card from "../Helpers/Card";

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
    <Card>
      <h4 className="card-title text-center text-secondary mt-3">Login!</h4>
      <form onSubmit={loginHandler}>
        <div className="form-group mb-3 mt-3">
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
        <div className="form-group mb-3 text-center">
          <button type="submit" className="btn btn-outline-primary text-center">
            Submit
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
