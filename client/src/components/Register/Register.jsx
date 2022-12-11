import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import style from "./Register.module.css"
import oasis from "../NavBar/oasis.jpg"





function validate(input){
    let errors = {}
    if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input.email)){
        errors.email = "debe ingresar un email valido"
    }else{
        errors.email = false
    }

    if(input.password.length < 6){
        errors.password = "debe ser al menos 6 caracteres"
    }else{
        errors.password = false
    }

    if(errors.name === false && errors.password === false){
        errors = false
    }

    return errors
}









export default function Register(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors,setErrors] = useState({})
    const [input, setInput] = useState({
        email:"",
        password:""
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }



return(
    <div className={style.main_container}>
        <div className={style.cabecera}>
            <Link to = '/home'>
                <img src={oasis} alt=""  height="143px" width="151px"/>
            </Link>
            <h3 className={style.text}>OASIS LIBRARY</h3>
        </div>
        <div className={style.main_container2}>
        <form>
            <div className={style.button}>
            <button className={style.button1}>Login</button>
            <button className={style.button1}>Registrarte</button>
            </div>
            <div className={style.text}>
            <h3 className={style.text1}>Hello!</h3>
            <h4 className={style.text2}>Sign into your account</h4>
            </div>
            <input type="text" name="email" value={input.email} id="" placeholder='Email' onChange={(e)=>handleChange(e)} className={style.inputs}></input>
            <div className={style.container_errors}>
            {errors.email && (
                <p className={style.errors}>{errors.email}</p>
                )}
                </div>
            <input type="password" name="password" value={input.password} id="" placeholder='Password' onChange={(e)=>handleChange(e)} className={style.inputs}></input>
            <div className={style.container_errors}>
            {errors.password && (
                <p className={style.errors}>{errors.password}</p>
                )}
                </div>
            <div className={style.button2}>
            <button className={style.button3}>Login</button>
            </div>
            <div className={style.divisor}>
            </div>
            <div className={style.button4}>
            <button className={style.button5}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-google" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
</svg>login with google</button>
            </div>
            <div className={style.button6}>
            <button className={style.button7}>¿No podes ingresar a tu cuenta?</button>
            </div>
        </form>
        </div>
    </div>
)
}