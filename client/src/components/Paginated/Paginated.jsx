import React from "react";

export default function Paginated({allBooks, booksPerPage, paginated}){
    
    const pageNumbers = [];

    for(let i = 0; Math.ceil(allBooks/booksPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <div>

           {
                pageNumbers && pageNumbers.map(number => {
                    return(
                        <button
                        key={number}
                        onClick={() => paginated(number)}>                    
                        {number}
                        </button>
                    )
                })
            }

        </div>
    )
}