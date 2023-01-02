
import style from "./Register.module.css"
import React, {useState} from "react"
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import oasis from "../NavBar/oasis.jpg"

const Register = ({setAuth}) => {
 
    const [inputs,setInputs] = useState({
        name:"",
        lastName:"",
        email:"",
        password:""
    })

    const history = useHistory()
    const [errors,setErrors] = useState({})
    const {email , password , name , lastName} = inputs

    const onChange = e => {
        setInputs({...inputs,[e.target.name]
        : e.target.value})
        setErrors(validate({
            ...inputs,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()

        try {
        const body = {name , lastName, email, password}
        const response = await fetch("http://localhost:3001/users/signup",{
            method: "POST",
            headers: {"Content-Type" : "application/json"}
            ,
            body: JSON.stringify(body)
        });

        alert('usuario creado, revise su mail para verificar')
        history.push('/Login')
        const parseRes = await response.json()

        localStorage.setItem("Atoken",parseRes.token)
        // setAuth(true)
            

        } catch (err) {
            console.error(err.message)
        }

    }

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
    return (
        // <div>
        // <h1>Register</h1>
        // <form onSubmit={onSubmitForm}>
        // <input type="text" name="name" placeholder="name" value={name} onChange={e => onChange(e)} />
        // <input type="text" name="lastName" placeholder="lastName" value={lastName} onChange={e => onChange(e)} />
        // <input type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)} />
        // <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)} />
        // <button>submit</button>
        // </form>
        // </div>
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
            <Link to="/Login">
            <button className={style.button1}>Login</button>
            </Link>
            </div>
            <div className={style.text}>
            <h3 className={style.text1}>Hello!</h3>
            <h4 className={style.text2}>create your account</h4>
            </div>
            <div className={style.inputContainer}>
            <input type="text" name="name" value={inputs.name} id="" placeholder='Name' onChange={(e)=>onChange(e)} className={style.inputs}></input>
            <input type="text" name="lastName" value={inputs.lastName} id="" placeholder='lastName' onChange={(e)=>onChange(e)} className={style.inputs}></input>
            <input type="email" name="email" value={inputs.email} id="" placeholder='Email' onChange={(e)=>onChange(e)} className={style.inputs}></input>
            <div className={style.container_errors}>
            {errors.email && (
                <p className={style.errors}>{errors.email}</p>
                )}
                </div>
            <input type="password" name="password" value={inputs.password} id="" placeholder='Password' onChange={(e)=>onChange(e)} className={style.inputs}></input>
            <div className={style.container_errors}>
            {errors.password && (
                <p className={style.errors}>{errors.password}</p>
                )}
                </div>
            </div>
            <div className={style.button2}>
            <button className={style.button3} disabled={errors.email || errors.password}>Register</button>
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


export default Register;