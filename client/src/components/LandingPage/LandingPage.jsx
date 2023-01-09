import React from "react";
import style from './LandingPage.module.css'
import { Link } from 'react-router-dom';
import oasis from "./oasis.jpg"

const LandingPage = () => {
    return (
        <div className={style.home}>
            <div>
                <img className={style.image} src="https://i.pinimg.com/originals/6d/a8/b8/6da8b852257a75b7388239cf3736e62f.gif" alt="not found" width='100%'></img>
            </div>
            <div className={style.container}>
                <div className={style.buttons}>
                    <div className={style.log}>
                        <Link to='/login'>
                            <button className={style.signBtn}>Iniciar Sesion</button>
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
                    <h1 className={style.welcome}>Bienvenidos a Oasis Library</h1>
                    <h4 className={style.instructions}>Encuentra y disfruta de tus libros favoritos. Para entrar a la pagina, pulse el boton</h4>
                    <Link to='/home'>
                        <button className={style.btn}><strong>Home</strong></button>
                    </Link>
                </div>
            </div>
        </div >
    )
}


export default LandingPage