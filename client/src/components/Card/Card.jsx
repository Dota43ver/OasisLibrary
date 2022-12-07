import React from "react";
import './Card.css'

export default function Card({ Nombre, Precio, Puntuación, Imagen }) {
    return (
        <div className="card">
            <div class="div-imagen">
                <img className="cardimagen" src={Imagen} alt='img not found' width="175"></img>
                <div className="text">
                    {Nombre}
                    <div className="botones">
                        <button className="buttoncarro"> Agregar al carrito </button>
                        <button className="buttondetalle"> Ver detalle </button>
                    </div>
                </div>
            </div>
            <h2 className="name"> {Nombre} </h2>
            <div className="datos">
                <h3 className="price"> ${Precio} </h3>
                <h3 className="score"> {Puntuación} </h3>
            </div>
        </div>
    )
}