import React from "react";
import style from './LandingPage.module.css'
import {Link} from 'react-router-dom';

const LandingPage = () => {
    return(
        <div className={style.container}>
            {/* <img src="https://img.freepik.com/foto-gratis/abierto-volando-libros-antiguos_1232-2096.jpg?w=2000" height="250px" width="280px" className={style.img}/> */}
            <div className={style.log}>
                <Link to = '/login'>
                    <button className={style.signBtn}>Sign in</button>
                </Link>
            </div>
            <div className={style.tex}>
                <h1 className={style.welcome}>Welcome to Oasis Library</h1>
                <h4 className={style.instructions}>To enter the page, please, press the button</h4>
                <Link to = '/home'>
                    <button className={style.btn}><strong>Home</strong></button>
                </Link>
            </div>
            <div className={style.about}>
                <Link to = '/about'>
                    <button className={style.aboutBtn}>About us</button>
                </Link>
            </div>
        </div>
    )
}


export default LandingPage