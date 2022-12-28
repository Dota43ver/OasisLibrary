import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions";
import NavBar from "../NavBar/NavBar";
import "./Account.css";


export default function Account({setAuth}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)

    // const [account, setAccount] = useState({
    //     name: "",
    //     lastname: "",
    //     mail: "",
    //     password: "",
    //     favorites: "",
    //     orderStatus: "",
    // });

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false)     
    }

    useEffect(() =>{
        dispatch(getUsers())
    })

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     //if (Object.keys(errors).length === 0) 
    //     //dispatch(postUsuario())
    //     {
    //         alert('Cambios guardados')
    //         setAccount({
    //             name: "",
    //             lastname: "",
    //             mail: "",
    //             password: "",
    //             favorites: "",
    //             orderStatus: "",
    //         })
    //     }
    //     // else {
    //     //     alert('Wrong or missing data')
    //     // }
    // }

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
                        <h3 className="dato" name="name" value={user.name}> Name: {user.name} </h3>
                        <h3 className="dato" name="lastName" value={user.lastName}> Last Name: {user.lastName} </h3>
                        <h3 className="dato" name="email" value={user.email}> Mail: {user.email} </h3>
                        <h3 className="dato" name="password" value={user.password}> Password: ******** </h3>
                    </div>
                    <button className="logoutBtn" onClick={e => logout(e)}>Logout</button>
                    {/* <button> Guardar Cambios </button> */}

                </div>
            </div>
           
        </div>
    )

}