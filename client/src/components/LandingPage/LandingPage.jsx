import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div>
      <div>
        <h1>Welcome to Beard care</h1>
        <h3>Create an account and log in to buy</h3>
        <Link className="links" to="/allProducts">
          Click Here to see the Products
        </Link>
      </div>
    </div>
  );
};
