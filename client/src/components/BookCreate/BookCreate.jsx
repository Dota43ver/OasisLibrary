import React from 'react';
import Link, { useHistory } from 'react-router-dom';
import "./BookCreate.css";
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postBook, getBooks, getGenres } from '../../actions';

export default function BookCreate(){
    const dispatch = useDispatch()

    const history = useHistory()
    const books = useSelector((state) => state.books)
    const genres = useSelector((state)=> state.genres)

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getBooks())
    }, [])
    
    const [input , setInput] = useState({
        name:'',
        year:'',
        genre:[],
        author:'',
        price:'',
        score:'',
        language:'',
        image:'',
        saga:'',
        description:''
    })

    const [cantInputs, setCantInputs] = useState(["x"]);

    function handleChange(g){
        setInput({
            ...input,
            [g.target.name]: g.target.value
        })
        
    }

    function handleChangeGenre(g){
        let arrayResultado = [];
        let arr = Array.prototype.slice.call(g.target.parentNode.childNodes);
        arr.pop();
        arr.map((s)=>{
            arrayResultado.push(s.value);
        })
        input.genre = arrayResultado;
    }

    function handleSubmit(g){
        g.preventDefault();
        dispatch(postBook(input))
        alert('BookCreated')
        setInput({
            name:'',
            year:'',
            genre:[],
            author:'',
            price:'',
            score:'',
            language:'',
            image:'',
            saga:'',
            description:'',
        })
        history.push('/home')
    }

    const addGenre = () => {
        setCantInputs([...cantInputs,"x"])
    }

    return(
        <div className='container'>
            <form className="form" onSubmit={(g) => handleSubmit(g)}>
                <h1>Create Book</h1>
                <div className='group'>
                    <label className='letter'>Name</label>
                    <input required type= 'text' value = {input.name} name= "name" onChange={(g) => handleChange(g)}/>
                </div>
                <div className='group'>
                    <label className='letter'>Year of creation</label>
                    <input required type='date' value = {input.year} name = "year" onChange={(g) => handleChange(g)}/>
                </div>
                <div className='group'>
                    <label className='letter'>Genre/s</label>
                    <div className='genres'>
                        {cantInputs.map(() => (
                            <select required type='text' name="genre" onChange={(g) => handleChangeGenre(g)} >
                                {
                                    genres.map((g)=>(
                                        <option value={g.name}>{g.name}</option>
                                    ))
                                }
                            </select>
                        ))}
                        <button onClick={(g) => addGenre(g)}> + </button>
                    </div>
                </div>
                <div className='group'>
                    <label className='letter'>Author</label>
                    <input required type='text' value = {input.author} name = "author" onChange={(g) => handleChange(g)}/>
                </div>
                <div className='group'>
                    <label className='letter'>Price</label>
                    <input required type='number' value = {input.price} name = "price" onChange={(g) => handleChange(g)}/>
                </div>
                <div className='group'>
                    <label className='letter'>Score</label>
                    <input required type='number' value = {input.score} name = "score" onChange={(g) => handleChange(g)}/>
                </div>
                <div className='group'>
                    <label className='letter'>Language</label>
                    <input required type='text' value = {input.language} name = "language" onChange={(g) => handleChange(g)}/>
                </div>
                <div className='group'>
                    <label className='letter'>Saga</label>
                    <input required type='text' value = {input.saga} name = "saga" onChange={(g) => handleChange(g)}/>
                </div>
                <div className='group'>
                    <label className='letter'>Description</label>
                    <textarea className='desc' required type='text' value = {input.description} name = "description" onChange={(g) => handleChange(g)}/>
                </div>
                <button className="submit" type='submit'>CreateBook</button>
            </form>
        </div>
    )
}