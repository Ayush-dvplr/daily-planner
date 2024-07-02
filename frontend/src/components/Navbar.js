// src/components/Navbar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { connectWeb3 } from "../contractFunctions";
import { useEffect } from "react";

const Navbar = () => {
  const [account, setAccount] = useState("");
  useEffect(() => {
    const init = async () => {
      try {
        const { accounts } = await connectWeb3();
        setAccount(accounts[0]);
      } catch (error) {
        console.log(error?.message);
      }
    };
    init();
  }, []);
  return (
    <nav className="navbar">
      <div
        className="navbar-left"
        style={{
          fontFamily: "Brush Script MT, Brush Script Std, cursive",
          fontSize: "2rem",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link to="/" className="navbar-brand">
          Daily Planner
        </Link>
        <div style={{ fontFamily: "sans-serif", fontSize: "1rem" }}>
          Account address : {account.length > 0 ? account : "not connected"}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
