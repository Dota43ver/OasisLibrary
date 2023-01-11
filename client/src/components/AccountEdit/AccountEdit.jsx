import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUser, getUsers } from "../../actions";
import './AccountEdit.css'
import NavBar from "../NavBar/NavBar";

export default function Edit() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const [updateAccount, setUpdateAccount] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        //if (Object.keys(errors).length === 0) 
        //dispatch(postUsuario())

        setUpdateAccount({
            ...updateAccount,
            [e.target.name]: e.target.value,
            [e.target.lastName]: e.target.value,
            [e.target.mail]: e.target.value,
            [e.target.password]: e.target.value,
            [e.target.image]: e.target.value,
        })
        // else {
        //     alert('Wrong or missing data')
        // }
        console.log(updateAccount)
        
    }

    function handleUpdate(e) {
        e.preventDefault();
        dispatch(updateUser(user.id, updateAccount));
        history.push("/account")
        window.location.href = window.location.href
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="editAccount">
                <img
                    src="https://img.freepik.com/vector-gratis/gestion-recursos-humanos-analisis-abastecimiento-seleccion-seleccion-puestos-personaje-dibujos-animados-femenino-leyendo-solicitudes-empleo-cv-candidatos_335657-2682.jpg?w=2000"
                    width="40%"
                ></img>
                <form className='editForm' onSubmit={handleUpdate}>
                    <h3>Editar información personal</h3>
                    <div>
                        <label> Nombre: </label>
                        <input type="text" name="name" placeholder={user.name} value={updateAccount.name} onChange={handleSubmit} />
                    </div>

                    <div>
                        <label> Apellido: </label>
                        <input type="text" name="lastName" placeholder={user.lastName} value={updateAccount.lastName} onChange={handleSubmit} />
                    </div>

                    <div>
                        <label> Mail: </label>
                        <input type='email' name="email" placeholder={user.email} value={updateAccount.email} onChange={handleSubmit} />
                    </div>

                    <div>
                        <label> Contraseña: </label>
                        <input type='password' name="password" placeholder="Contraseña" value={updateAccount.password} onChange={handleSubmit} />
                    </div>
                    <div>
                        <label> image: </label>
                        <input type='url' name="image" placeholder={user.image} value={updateAccount.image} onChange={handleSubmit} />
                    </div>

                    <button className="guardarBtn" onClick={handleUpdate}> Guardar Cambios </button>
                </form>

            </div>
        </div>
    )


}