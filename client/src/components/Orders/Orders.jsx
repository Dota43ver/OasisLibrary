import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addCart, getUsers } from "../../actions";

export default function OrderCart() {
    const shoppingCart = useSelector((state) => state.shoppingCart);
    const user = useSelector((state) => state.user);
    const product = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getCart(cart));;
    //   }, [dispatch]);

    return (
        <div>
            <h1> ORDENES </h1>
        </div>
    )
}