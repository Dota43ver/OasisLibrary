import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import { addToCart, removeFromFavs, getUsers, getFavs } from "../../actions";
import NavBar from "../NavBar/NavBar";
import "./Favorites.css";
const Swal = require("sweetalert2");

export default function Favorites() {
  const user = useSelector((state) => state.user);
  const allFavs = useSelector((state) => state.favs);
  const history = useHistory();
  const dispatch = useDispatch();
  
  const [quantity, setQuantity] = useState(1);
  
  useEffect( () => {
    dispatch(getUsers())
    dispatch(getFavs(user.id))
    // allFavs.length > 0 ? history.push("/favorites") : null
  },[dispatch, user.id]);
  
  console.log("allFavs ", allFavs);
  // let totalFavs;


  const handleAddToCart = (i) => {
    const addBooks = allFavs[ultimo].data.find((e) => e.id === i.target.value);
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
    Swal.fire({
      position: "bottom-left",
      icon: "success",
      title: "Libro agregado al carrito",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 4000,
      toast: true,
    });
  };



  const ultimo = allFavs.length - 1
  console.log("allFavs ultimo: ",allFavs[ultimo]);
  // console.log("punto data",allFavs[0].data);
  
  
  const handleRemoveFavs = (e) => {
    e.preventDefault()
    dispatch(removeFromFavs(e.target.value));
    dispatch(getFavs(user.id));
    window.location.href = window.location.href;
  };

  return (
    <div>
      <NavBar></NavBar>

      <div className="infoTop">
        <h1> {user.name} tus favoritos son: </h1>
        <h4> Cantidad: {allFavs.length !== 0 ? allFavs[ultimo].data.length : null} </h4>

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

        {allFavs.length !== 0 ?
        allFavs[ultimo].data.map((i) => (
          
          <div className="detailFavs">
            <img src={i.libro.image} width="150px"></img>
            <div className="infoFavs">
              <h3>{i.libro.name}</h3>
              <h3>Precio: ${i.libro.price}</h3>
            </div>

            {/* <div className="buttonFav">
              {
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
              }
              <button class="material-symbols-outlined">
                add
              </button>
              <button value={i.id} onClick={(i) => handleAddToCart(i)} className="addAndDelete"> Agregar al carrito </button>
            </div> */}

            {/* <div className="btnStyles">
              <div className="buttonFav">
                {
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
                  />
                } */}

                {/* {allFavs[0].data?.map(i => (
                  <div className="detailFavs">
                    <img src={i.image} width='150px' alt="not found"></img>
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
                ))} */}

                <div className="buttonFav">
                  {
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                  }
                  <button class="material-symbols-outlined">
                    delete
                  </button>
                  <button value={i.id} onClick={(e) => handleRemoveFavs(e)} className="addAndDelete" > Eliminar </button>
                </div>

                <div className="buttonFav">
                  {
                    <link
                      rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
                    />
                  }

                  <button class="material-symbols-outlined">add</button>
                  <button
                    value={i.id}
                    onClick={(i) => handleAddToCart(i)}
                    className="addAndDelete"
                  >
                    {" "}
                    Agregar al carrito{" "}
                  </button>
                </div>
              {/* </div> */}
            {/* </div> */}
          </div> 
        )): null} 
      </div>
    </div>
  );
}
