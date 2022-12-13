import React from "react";
import style from './LandingPage.module.css'
import { Link } from 'react-router-dom';
import oasis from "./oasis.jpg"

const LandingPage = () => {
    return (
        <div className={style.home}>
            <div>
                <img className={style.image} src="https://i.pinimg.com/originals/6d/a8/b8/6da8b852257a75b7388239cf3736e62f.gif" width='100%'></img>
            </div>
            <div className={style.container}>
                <div className={style.buttons}>
                    <div className={style.log}>
                        <Link to='/a'>
                            <button className={style.signBtn}>Sign in</button>
                        </Link>
                    </div>
                    <div className={style.about}>
                        <Link to='/about'>
                            <button className={style.aboutBtn}>About us</button>
                        </Link>
                    </div>
                </div>
                <div className={style.div}>
                    <div className={style.container_image}>
                        <img src={oasis} alt="" width="114px" height="105px" />
                    </div>
                    <h1 className={style.welcome}>Welcome to Oasis Library</h1>
                    <h4 className={style.instructions}>Find and enjoy your favorite books. To enter the page, please, press the button</h4>
                    <Link to='/home'>
                        <button className={style.btn}><strong>Home</strong></button>
                    </Link>
                </div>
            </div>
        </div >
    )
}


export default LandingPage