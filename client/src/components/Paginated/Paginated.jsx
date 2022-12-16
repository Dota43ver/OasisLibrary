import React from "react";
// import "./Paginated.css";
import style from './Paginated.module.css'


export default function Paginated({allBooks, booksPerPage, paginated}){

    const pageNumbers = [];

    for(let i = 0; i < Math.ceil(allBooks/booksPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <div className={style.paginado}>
            {
                 pageNumbers && pageNumbers.map(number => {

                     return(
                        <div className={style.each}>

                            <button className={style.li}
                            key={number}
                            onClick={() => paginated(number)}>                    
                            {number}
                            </button>
                            
                        </div>
                     )
                 })

             }
        </div>
    )
}