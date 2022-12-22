import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNameBooks } from "../../actions";
import style from "./NavBar.module.css";
import oasis from "./oasis.jpg";

export default function NavBar() {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  const [name, setName] = useState("");
  const cart = useSelector((state) => state.cart);
  const totalBooks = cart.reduce((total, item) => total + item.quantity, 0);
  
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

   function onSearch(searchTerm){
    setName(searchTerm)
    console.log(searchTerm)
   }

  function handleSubmit(e) {
    e.preventDefault();
    setName("")
    dispatch(getNameBooks(name));
  }

  return (
    <div className={style.main_container}>
      <div className={style.container_image}>
        <Link to="/home">
          <img src={oasis} alt="" width="114px" height="105px" />
        </Link>
      </div>
      <div>

      <div className={style.buscar}>
        <div className={style.searchinner}>

        <input
          type="text"
          className={style.inputs1}
          onChange={(e) => handleInputChange(e)}
          value={name}
          />
        <button className={style.button} onClick={(e) => handleSubmit(e)}>
          Buscar
        </button>
        
      </div>
      </div>
      <div className={style.dropdown}>
        {allBooks.filter(item =>{
          const term = name.toLowerCase();
          const fullName = item.name.toLowerCase();   
          return term && fullName.startsWith(name)
        })
        .map((item) =>(
          <div onClick={(e)=>onSearch(item.name)} className={style.drowpdownrow}>{item.name}</div>
          ))}
        </div>
          </div>
      <div>
        <Link to="/account">
          {" "}
          <button className={style.micuenta}>Mi cuenta</button>{" "}
        </Link>
      </div>
      <div className={style.container_favs}>
        <Link to="/favorites">
          <button className={style.misfavoritos}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-heart"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            Mis favoritos
          </button>
        </Link>
      </div>
      <div>
        <Link to="/cart">
          <button className={style.micarrito}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-shopping-cart"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx="6" cy="19" r="2"></circle>
              <circle cx="17" cy="19" r="2"></circle>
              <path d="M17 17h-11v-14h-2"></path>
              <path d="M6 5l14 1l-1 7h-13"></path>
            </svg>
            Mi carrito {totalBooks}
          </button>
        </Link>
      </div>
    </div>
  );
}
