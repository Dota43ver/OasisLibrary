import React from "react";
import './Success.css';
import { Link } from 'react-router-dom';

export default function Success() {
    return (
        <div className="bodySc">
            <div className="infoSc">
                <h1> ¡Pago realizado con éxito! </h1>

                <h2> Recibiras un mail a tu cuenta registrada junto con el comprobante de compra </h2>
                <Link to='/home'>
                    <button className="buttonSc"> Volver al home </button>
                </Link>
            </div>

            <div className="imgSc">
                <img src="https://i.pinimg.com/originals/5a/d0/47/5ad047a18772cf0488a908d98942f9bf.gif" alt="not found"></img>
            </div>
        </div>
    )
}