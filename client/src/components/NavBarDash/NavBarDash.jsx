import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions";
import oasis from "./oasis.jpg";
import './NavBarDash.css'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function NavBarDash() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div className='main_container'>

                <Link to="/home">
                    <div className='container_image'>
                        <img src={oasis} alt="" width="110px" height="100px" />
                    </div>
                </Link>

                <Link to='/dashboard'>
                    <h2 className='titleDash'>Dashboard Admin</h2>
                </Link>


                <div className='linkCreate'>
                    <Link to="/dashboard/bookcreate">
                        <button className='createBtn'> <AddIcon/> Agregar Libros</button>
                    </Link>
                    <Link to="/dashboard/bookedit">
                        <button className='createBtn'> <EditIcon/> Editar libros</button>
                    </Link>
                    {/* <Link to="/dashboard/users">
                        <button className='createBtn'> <PersonOutlineIcon/> Usuarios</button>
                    </Link> */}
                </div>
        </div>
    );
}
