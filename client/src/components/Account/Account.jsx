import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Account.css";


export default function Account() {
    const dispatch = useDispatch();
    const [account, setAccount] = useState({
        name: "",
        lastname: "",
        mail: "",
        password: "",
        favorites: "",
        orderStatus: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        //if (Object.keys(errors).length === 0) 
        //dispatch(postUsuario())
        {
            alert('Cambios guardados')
            setAccount({
                name: "",
                lastname: "",
                mail: "",
                password: "",
                favorites: "",
                orderStatus: "",
            })
        }
        // else {
        //     alert('Wrong or missing data')
        // }
    }

    return (
        <div> 
            <NavBar></NavBar>
            <div className="account">
                <div className="left">
                    <Link className="orders"> Orders </Link>
                    <Link className="orders"> Wishlist </Link>
                </div>
                <div className="info">

                    <div className="headatos">
                        <h3 className="crear"> Personal Details </h3>
                        <Link className="crear"> Editar </Link>
                    </div>

                    {/* <form onSubmit={handleSubmit}>
            <label> Name: </label>
            <label> Lastname: </label>
            <label> Mail: </label>
            <label> Password: </label>
            </form> */}

                    <div className="usuario">
                        <h3 className="dato"> Name: </h3>
                        <h3 className="dato"> Last Name: </h3>
                        <h3 className="dato"> Mail: </h3>
                        <h3 className="dato"> Password: </h3>
                    </div>

                    {/* <button> Guardar Cambios </button> */}

                </div>
            </div>
        </div>
    )

}