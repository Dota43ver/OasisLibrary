import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions";
import NavBar from "../NavBar/NavBar";
import "./Account.css";

export default function Account({ setAuth }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  function handleEdit() {
    window.location.assign("http://localhost:3000/edit");
  }

  const imagedefault =
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp";

    return (
        <div>
            <NavBar></NavBar>
            <div className="account">
                <div className="left">
                    <Link to={'/order'} className="orders"> Ordenes previas </Link>
                    <Link className="orders"> Favoritos </Link>
                    <Link className="orders"> Carrito </Link>
                </div>
                <div className="info">

                    <div className="headatos">
                        <h3 className="tituloAccount"> Datos personales </h3>
                        <Link className="editAcc" onClick={handleEdit}> Editar datos </Link>
                    </div>


                    <div className="usuario">
                        <div className="usuarioimg">
                            <img className="datoimg" name='image' value={user.image} src={user.image ? user.image : imagedefault} width='120px'></img>
                            {/* <Link> <p className="editimg"> Editar foto </p></Link> */}
                        </div>
                        <div>
                            <h3 className="dato" name="name" value={user.name}> Nombre: {user.name} </h3>
                            <h3 className="dato" name="lastName" value={user.lastName}> Apellido: {user.lastName} </h3>
                            <h3 className="dato" name="email" value={user.email}> Mail: {user.email} </h3>
                            <h3 className="dato" name="password" value={user.password}> Contraseña: ********** </h3>
                        </div>
                    </div>
                    <button className="logoutBtn" onClick={e => logout(e)}>Logout</button>


                </div>
            </div>

        </div>
    )

}
