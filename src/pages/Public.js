import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of your app.</p>
      <Link to="/login">Go to Employee Login</Link>
    </div>
  );
};

export default Public;
