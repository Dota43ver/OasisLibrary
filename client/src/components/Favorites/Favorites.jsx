import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart, removeFromFavs } from "../../actions";
import NavBar from "../NavBar/NavBar";
import './Favorites.css'

export default function Favorites() {
    const allFavs = useSelector((state) => state.favs);
    const totalFavs = allFavs.length

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (i) => {
        const addBooks = allFavs.find(e => e.id === i.target.value)
        dispatch(
          addToCart({
            id: i.target.value,
            name: addBooks.name,
            price: addBooks.price,
            image: addBooks.image,
            quantity: quantity,
    
          })
        );
        console.log(i.target.value);
        alert('Item agregado')
      };

    const handleRemoveFavs = (id) => {
        dispatch(removeFromFavs(id));
    };

    return (
        <div>
            <NavBar></NavBar>

            <div className="infoTop">

                <h1> Tus favoritos 'nombre de user' </h1>
                <h4> Cantidad: {totalFavs} </h4>

                <div className="selectFavs">

                    <h4> Ordenar items por: </h4>

                    <select>
                        <option> Agregados recientemente </option>
                        <option> Precio mayor a menor </option>
                        <option> Precio menor a mayor </option>
                    </select>

                </div>

            </div>

            <div className="cardFavs">

                {allFavs.map(i => (
                    <div className="detailFavs">
                        <img src={i.image} width='150px'></img>
                        <div className="infoFavs">
                            <h3>{i.name}</h3>
                            <h3>Precio: ${i.price}</h3>
                        </div>

                        <div className="btnStyles">

                            <div className="buttonFav">

                                {
                                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                                }

                                <button class="material-symbols-outlined">
                                    delete
                                </button>
                                <button onClick={() => handleRemoveFavs(i.id)} className="addAndDelete" > Eliminar </button>

                            </div>

                            <div className="buttonFav">

                                {
                                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                                }

                                <button class="material-symbols-outlined">
                                    add
                                </button>
                                <button value={i.id} onClick={(i) => handleAddToCart(i)} className="addAndDelete"> Agregar al carrito </button>

                            </div>

                        </div>

                    </div>
                ))}


            </div>

        </div >
    )
}