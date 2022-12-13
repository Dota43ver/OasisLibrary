import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";

export default function Favorites() {
    const favs = useSelector((state) => state.favs);
    const totalFavs = favs.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <NavBar></NavBar>

            <h1> Favoritos de 'nombre de user' </h1>
            <h4> Cantidad: {totalFavs} </h4>
            <h4> Ordenar items por: { } </h4>

            <div>

                {favs.map(i => (
                    <div>
                        <img src={i.image}></img>
                        <h3>{i.name}</h3>
                        <h3>Precio: ${i.price}</h3>
                    </div>
                ))}

            </div>

        </div>
    )
}