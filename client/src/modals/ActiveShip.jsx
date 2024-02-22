import react, { Component } from "react";
import AuthContext from "../utils/auth-context";
import "./ActiveShip.css";

const modal = props => {
    <div classname="activeShipCard">
        <header className="card-header">{props.title}</header>
        <section className="card-content">
            {props.children}
        </section>
        <section className="card-buttons">
            <button>Buy Ship</button>
            <button>Close</button>
        </section>
    </div>
};

export default modal;
