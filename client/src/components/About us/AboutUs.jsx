import React from "react";
import './AboutUs.css';
import logo from './oasis.jpg';
import {data} from "./data.js";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function AboutUs(){
    return(
        <div className="abaut">
            <div className="header">
                <h1 className="title">ABOUT US</h1>
                <a href="/">
                    <img className="logo" src={logo} alt="logo" width="45"/>
                </a>
                <p>
                    Texto donde vamos a poner a que nos dedicamos y que hacemos bien en inglish
                </p>
            </div>
            <div className="cardsAbout">
                {data.map((user) => {
                    return(
                        <div className="cardsInfo">
                            <div className="logos">
                                <a href={user.linkedin} id='icono' className="logo-container">
                                    <LinkedInIcon id="contenedor"/>
                                </a>
                                <a href={user.github} id="icono" className="logo-container">
                                    <GitHubIcon id="contenedor"/>
                                </a>
                            </div>
                            <h3>Full Stack Developer</h3>
                            <h2 className="letraName">{user.name}</h2>
                            <img src={user.img} width="195" alt="profile" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}