import React from "react";
import './AboutUs.css';
import logo from './oasis.jpg';
import {data} from "./data.js";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ScrollToTop from "react-scroll-to-top";

export default function AboutUs(){
    return(
        <div className="abaut">
            <div className="header">
                <h1 className="title">ABOUT US</h1>
                <a href="/">
                    <img className="logo" src={logo} alt="logo" width="45"/>
                </a>
                <p>
                Hello! We are the creators of Oasis Library, a website where you can buy your favorite books, and see details about them and their authors. We studied at "SoyHenry" to become Full Stack Developers, learning various technologies and tools to perform successfully in the workplace. In this section you will find the information of each one of us, and our respective links to Linkedin and GitHub. Thank you for visiting our website!
                </p>
            </div>
            <div className="cardsAbout">
                {data.map((user) => {
                    return(
                        <div>
                        <ScrollToTop smooth className="scroll" />
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
                        </div>
                    )
                })}
            </div>
        </div>
    )
}