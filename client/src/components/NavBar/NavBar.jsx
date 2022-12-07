import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import style from "./NavBar.module.css"
import oasis from "./oasis.jpg"

export default function NavBar(){
    return(
        <div className={style.main_container}>
            <div className={style.container_image}>
                <img src={oasis} alt="" width="164px" height="155px"/>
            </div>
            
            <div className={style.buscar}>
                <input type="text" className={style.input} />
                <button className={style.button}>buscar</button>
            </div>
            <div>
                <button className={style.micuenta}>Mi cuenta</button>
            </div>
                <div className={style.container_favs}>
                    <button className={style.misfavoritos}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                        </svg>
                        Mis favoritos
                    </button>
                </div>
                <div>
                    <button className={style.micarrito}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <circle cx="6" cy="19" r="2"></circle>
   <circle cx="17" cy="19" r="2"></circle>
   <path d="M17 17h-11v-14h-2"></path>
   <path d="M6 5l14 1l-1 7h-13"></path>
</svg>
        Mi carrito
                    </button>
                </div>
        </div>
    )
}