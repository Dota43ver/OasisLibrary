import React from 'react';
import { getBooks } from '../../actions';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import './Home.module.css'


export default function Home() {
    const allBooks = useSelector((state) => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks())
    }, [dispatch])

    return (
        <div className='home'>
            <h3>
                {allBooks && Array.isArray(allBooks) && allBooks.length !== 0 ? allBooks.map(el => {
                    return (
                        <div className="cards">
                            
                            {el.Nombre}
                            ${el.Precio}
                            {el.Puntuación}
                            <img src={el.Imagen} alt='img not found' width="175"></img>
                        </div>
                    )
                })
                    : null
                }
            </h3>
        </div>
    )
}