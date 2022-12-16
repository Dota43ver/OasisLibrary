import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { checkoutCart } from "../../actions/index";
import NavBar from "../NavBar/NavBar";
import './Checkout.css'

export default function Checkout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const purchasedCart = useSelector((state) => state.purchasedCart)

  useEffect(() => {
    if (purchasedCart.redirectURL) window.location.replace(purchasedCart.redirectURL)
  }, [purchasedCart])

  const handeleCheckout = () => {
    dispatch(checkoutCart(cart, user));
  };

  return (
    <div>
      <NavBar />

      <div className="checkTitulo">
        <h2>Checkout</h2>
        <h4> frase motivacional </h4>
      </div>

      <div className="checkInfo">
        <div className="checkUsuario">
          <h3> Información personal </h3>
        </div>

        <div className="checkCompra">
          <h3> Información de compra </h3>

          {cart.length ? (cart.map((item) =>
            <div className="checkItems">

              <div>
                <img src={item.image} width='50px'></img>
              </div>

              <div>
                <h3> {item.name} </h3>
                <p> Precio: ${item.price} </p>
                <p> Cantidad: {item.quantity} </p>
              </div>

            </div>
          )
          ) : <h3> Carrito vacío, vuelve y completa tu compra </h3>}

          <button className="buttonCompra" onClick={handeleCheckout}> Completar compra </button>
        </div>
      </div>
    </div>
  );
}