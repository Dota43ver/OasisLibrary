import React from "react";
import './Card.css'

export default function Card({ Nombre, Precio, Puntuación, Imagen }) {
    return (
        <div className="card">

            <img className="cardimagen" src={Imagen} alt='img not found' width="135"></img>

            <h2 className="name"> {Nombre} </h2>
            <div className="datos">
                <h3 className="price"> ${Precio} </h3>
                <h3 className="score"> {Puntuación} </h3>
            </div>
        </div>
    )
}