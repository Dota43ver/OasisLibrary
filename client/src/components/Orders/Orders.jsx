import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getCart, getOrders, getUsers } from "../../actions";
import NavBar from "../NavBar/NavBar";
import "./Orders.css";

export default function OrderCart() {
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.length === 0)
            dispatch(getUsers())
        else
            dispatch(getCart(user.id))
        dispatch(getOrders(user.id))
    }, [user])


    return (
        <div>
            <NavBar></NavBar>
            <div className="ordersDiv">
                <h3> Carrito activo </h3>

                <div className="orderDisplay">
                    {cart && cart.length > 0 ?
                        cart.map((item) => (
                            <div className="orderItems">
                                <div>
                                    <img src={item.image} width="100px" alt="not found"></img>
                                </div>
                                <h3> {item.name} </h3>
                                <p> Precio: ${item.price} </p>
                                <p> Cantidad: {item.quantity} </p>
                            </div>
                        ))
                        : <p> No hay carrito activo </p>
                    }
                </div>

                <h3> Ordenes previas </h3>

                <div className="orderDisplay">
                    {order && order.length > 0 ?
                        order.map((item) => (
                            <div className="orderItems">
                                <div>
                                    <img src={item.image} width="100px" alt="not found"></img>
                                </div>
                                <h3> {item.name} </h3>
                                <p> Precio: ${item.price} </p>
                                <p> Cantidad: {item.quantity} </p>
                            </div>
                        ))
                        : <p> No hay ordenes previar </p>
                    }
                </div>

            </div>
        </div>
    )
}