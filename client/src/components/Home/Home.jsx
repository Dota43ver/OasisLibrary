import React from 'react';
import { getBooks } from '../../actions';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import './Home.css'


export default function Home() {
    const allBooks = useSelector((state) => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks())
    }, [dispatch])

    return (
        <div>
            <h3 className='home'>
                {allBooks && Array.isArray(allBooks) && allBooks.length !== 0 ? allBooks.map(el => {
                    return (
                        <div className="cards">
                            {el.Nombre}
                            <br />
                            ${el.Precio}
                            <br />
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