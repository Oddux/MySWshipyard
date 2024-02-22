import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import AuthContext from "../utils/auth-context.js";

const mainNavigation = props => (
    <AuthContext.Consumer>
    {context => (
        <header className="navheader">
            <nav className="navbar">
                <div className="navbar-logo">
                    <h1>My SW Shipyard</h1>
                </div>
                <div className="navbar-items">
                    <ul>
                        {context.token && (
                        <li>
                            <NavLink to="/ships">Ships</NavLink>
                        </li>)}
                        {!context.token && (
                            <React.Fragment>
                        <li>
                            <NavLink to="/auth">Pilot Auth</NavLink>
                        </li>
                        <li>
                            <button onClick={context.logout}>Logout</button>
                        </li>
                        </React.Fragment>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    )}
    </AuthContext.Consumer>
);

export default mainNavigation;