import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import style from "./Login.module.css"
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

    if((errors.email === false) && (errors.password === false)){
        errors = false
    }

    return errors
}









export default function Login({setAuth}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors,setErrors] = useState({})
    const [input, setInput] = useState({
        email:"",
        password:""
    })


    const {email, password} = input

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        // console.log("esto es errors",errors)
    }

    const onSubmitForm = async (e) =>{
        e.preventDefault()
        try {
         const body = {email , password}
        const response = await fetch("http://localhost:3001/users/login",{
            method: "POST",
            headers: {"Content-type" : "application/json"}
            ,
            body: JSON.stringify(body)
        });

        const parseRes = await response.json()
        if(parseRes.token){
            localStorage.setItem("token",parseRes.token);
            setAuth(true)
        }else{
            setAuth(false)
            alert(parseRes);
        }
        } catch (err) {
            console.error(err.message)
        }
    }



return(
    <div className={style.main_container}>
        <div className={style.cabecera}>
            <Link to = '/home'>
                <img src={oasis} alt=""  height="85px" width="90px"/>
            </Link>
            <h3 className={style.text}>OASIS LIBRARY</h3>
        </div>
        <div className={style.main_container2}>
        <form className={style.formRegistro} onSubmit={onSubmitForm}>
            <div className={style.button}>
            {/* <button className={style.button1}>Login</button> */}
            <Link to="/register">
            <button className={style.button1}>Registrarte</button>
            </Link>
            </div>
            <div className={style.text}>
            <h3 className={style.text1}>Hola!</h3>
            <h4 className={style.text2}>Inicia tu sesión debajo</h4>
            </div>
            <div className={style.inputContainer}>
            <input type="text" name="email" value={input.email} id="" placeholder='Email' onChange={(e)=>handleChange(e)} className={style.inputs}></input>
            <div className={style.container_errors}>
            {errors.email && (
                <p className={style.errors}>{errors.email}</p>
                )}
                </div>
            <input type="password" name="password" value={input.password} id="" placeholder='Contraseña' onChange={(e)=>handleChange(e)} className={style.inputs}></input>
            <div className={style.container_errors}>
            {errors.password && (
                <p className={style.errors}>{errors.password}</p>
                )}
                </div>
            </div>
            <div className={style.button2}>
            <button className={style.button3} disabled={errors.email || errors.password}>Iniciar Sesión</button>
            </div>
            <div className={style.divisor}>
            </div>
            <div className={style.button4}>
            <button className={style.button5}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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