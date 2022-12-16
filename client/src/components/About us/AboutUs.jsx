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
                <a href="/">
                    <img className="logo" src={logo} alt="logo" width="150"/>
                </a>
                <p>
                    Texto donde vamos a poner a que nos dedicamos y que hacemos bien en inglish.com
                </p>
            </div>
            <div className="cardsAbout">
                {data.map((user) => {
                    return(
                        <div className="cardsInfo">
                            <div className="logos">
                                <a href={user.linkedin} id='icono' className="svg-container">
                                    <LinkedInIcon id="contenedor"/>
                                </a>
                                <a href={user.github} id="icono" className="svg-container">
                                    <GitHubIcon id="contenedor"/>
                                </a>
                            </div>
                            <img src={user.img} width="185" alt="profile" />
                            <h2>{user.name}</h2>
                            <h3>Full Stack Developer</h3>
                        </div>
                    )
                })}
<div className="title">ABOUT US</div>
            </div>
        </div>
    )
}