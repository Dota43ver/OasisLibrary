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

    function handleAddCart(e) {
        e.preventDefault();
        const prod = product.map(p => p.id)
        console.log(user.id, prod);
        const data = { userId: user.id, itemId: prod }
        dispatch(addCart(data));
    }

    // useEffect(() => {
    //     dispatch(getCart(cart));;
    //   }, [dispatch]);

    return (
        <div>
            <h1> ORDENES </h1>
            <button onClick={handleAddCart}> Add Cart </button>

            <h3> {shoppingCart.products} </h3>

            <h3> </h3>
        </div>
    )
}