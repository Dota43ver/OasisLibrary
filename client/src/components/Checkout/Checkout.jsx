import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCart } from "../../actions/index";
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import './Checkout.css'

export default function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const purchasedCart = useSelector((state) => state.purchasedCart)

  const [couponCode, setCouponCode] = useState('');
  const [total, setTotal] = useState(0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (purchasedCart.redirectURL) window.location.replace(purchasedCart.redirectURL)
  }, [purchasedCart])

  const handeleCheckout = () => {
    dispatch(checkoutCart(cart, user));
  };

  // const voucher = ['oasislibrary2022'] (hacer un array con todos los cupones)

  function applyCoupon(couponCode) {
    if (couponCode == "oasislibrary2022") {
      var newPrice = totalPrice * 0.2;
      setTotal(newPrice);
    } else {
      alert("Código de cupón no válido");
    }
  }


  return (
    <div>
      <NavBar />

      <div className="checkTitulo">
        <h2> Checkout</h2>
        {
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        }

        <h3> ¡Te quedan los ultimos pasos! </h3>
      </div>

      <div className="checkInfo">
        <div className="checkUsuario">
          <h3> Información personal </h3>
          {user.length ? (user.map((user) =>
            <div>
              <p> Nombre: </p>
              <p> Apellido: </p>
              <p> Email: </p>
            </div>
          )) :
            <div className="checkerror">
              <div>
                <p>  Registrate para poder continuar con la compra </p>
              </div>
              <Link to='/a'>
                <button className="buttoncheck"> Sing In </button>
              </Link>
            </div>
          }
        </div>

        <div className="checkCompra">
          <h3> Información de compra </h3>

          {cart.length ? (cart.map((item) =>
            <div className="checkItems">

              <div>
                <img src={item.image} width='50px' alt="not found"></img>
              </div>

              <div>
                <h3> {item.name} </h3>
                <p> Precio: ${item.price} </p>
                <p> Cantidad: {item.quantity} </p>
              </div>

            </div>
          )

          ) : <div className="checkerror"> <h3> Carrito vacío, vuelve y completa tu compra </h3>
            <Link to='/home'>
              <button className="buttoncheck" > Home </button>
            </Link>
          </div>}

          <p> Cupón de descuento: </p>

          <form>

            <input type="text" value={couponCode} onChange={e => setCouponCode(e.target.value)} />

            <button type="button" onClick={() => applyCoupon(couponCode)}>Aplicar cupón</button>
          </form>

          {couponCode ?
            <h4> Total final: ${totalPrice - total} </h4>
            : <h4> Total final: ${totalPrice} </h4>}

          <button className="buttonCompra" onClick={handeleCheckout}> Completar compra </button>


        </div>
      </div>
    </div>
  );
}