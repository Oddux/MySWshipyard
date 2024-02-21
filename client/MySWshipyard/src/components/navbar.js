import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const navbar = props => (
    <header className="navheader">
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>My SW Shipyard</h1>
            </div>
            <div className="navbar-items">
                <ul>
                    <li>
                        <NavLink to="/ships">Ships</NavLink>
                    </li>
                    <li>
                        <NavLink to="/auth">Pilot Auth</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

export default navbar;