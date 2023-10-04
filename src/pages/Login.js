import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ user, password }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPassword("");
      navigate("/welcome");
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("No Server Response");
      } else if (error.response?.status === 400) {
        setErrorMessage("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? <h1>Loading...</h1> : (
        <section className="login">
            <p ref={errRef} className={errorMessage ? "ErrorMessage" : "offscreen"} aria-label="login"/>

            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                type="text"
                id="username"
                ref={useRef}
                value={user}
                onChange={handleUserInput}
                autoComplete="off"
                required
                />
                 <label htmlFor="password">Password:</label>
                <input
                type="text"
                id="password"
                ref={useRef}
                value={password}
                onChange={handlePasswordInput}
                autoComplete="off"
                required
                />
                <button>Sign In</button>
            </form>
        </section>
  )

  return content;
};

export default Login;
