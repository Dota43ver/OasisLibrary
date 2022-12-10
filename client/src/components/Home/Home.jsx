import React from 'react';
import { getBooks } from '../../actions';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import './Home.css'
import NavBar from '../NavBar/NavBar'
import Card from '../Card/Card';
import { Link } from 'react-router-dom';


export default function Home() {
    const allBooks = useSelector((state) => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks())
    }, [dispatch])

    return (
        <div>
            <NavBar />
            <h3 className='home'>
                {allBooks && Array.isArray(allBooks) && allBooks.length !== 0 ? allBooks.map(el => {
                    return (
                        <div>
                              {/* <div className="text">
                                    <div className="botones">
                                        <button className="buttoncarro"> Agregar al carrito </button>
                                        <button className="buttondetalle"> Ver detalle </button>
                                    </div>
                            </div> */}
                        <div className="cards">
                            <Card Nombre={el.Nombre} Precio={el.Precio} Puntuación={el.Puntuación} Imagen={el.Imagen} />
                        </div>
                        </div>
                    )
                })
                    : null
                }
            </h3>
        </div>
    )
}