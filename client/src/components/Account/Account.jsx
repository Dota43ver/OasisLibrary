import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Account.css";


export default function Account({setAuth}) {
    const dispatch = useDispatch();
    // const [account, setAccount] = useState({
    //     name: "",
    //     lastname: "",
    //     mail: "",
    //     password: "",
    //     favorites: "",
    //     orderStatus: "",
    // });

    const[name, setName] = useState("")
    const[lastName, setLastName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    async function getName() {
        try {
            const response = await fetch("http://localhost:3001/users/profile",{
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseRes = await response.json();
            setName(parseRes.name)
            setLastName(parseRes.lastName)
            setEmail(parseRes.email)
            setPassword(parseRes.password)
        } catch (err) {
            console.error(err.message)
        }
    }
    const logout = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false)
        
    }

    useEffect(() =>{
        getName();
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
                        <h3 className="dato" name="name" value={name}> Name: {name} </h3>
                        <h3 className="dato" name="lastName" value={lastName}> Last Name: {lastName} </h3>
                        <h3 className="dato" name="email" value={email}> Mail: {email} </h3>
                        <h3 className="dato" name="password" value={password}> Password: ******** </h3>
                    </div>
                    <button className="logoutBtn" onClick={e => logout(e)}>Logout</button>
                    {/* <button> Guardar Cambios </button> */}

                </div>
            </div>
           
        </div>
    )

}