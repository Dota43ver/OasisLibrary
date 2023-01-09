
import style from "./Register.module.css"
import React, {useState} from "react"
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import oasis from "../NavBar/oasis.jpg"
import GoogleRegister from "../GoogleRegister/GoogleRegister"
import Swal from 'sweetalert2';


const Register = ({setAuth}) => {
 
    const [inputs,setInputs] = useState({
        name:"",
        lastName:"",
        email:"",
        password:""
    })

    const history = useHistory();
    const [info, setInfo] = useState({});
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

        const parseRes = await response.json()

        localStorage.setItem("Atoken",parseRes.token)
        // setAuth(true)
            

        } catch (err) {
            console.error(err.message)
        }

        setInfo({
            ...info,
            notification: "Por favor verifica tu email antes de iniciar sesión."
        })

        setTimeout(() => {
            history.push('/login')
        }, 7000);
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
            <button className={style.button1}>Iniciar Sesión</button>
            </Link>
            </div>
            <div className={style.text}>
            <h3 className={style.text1}>Hola!</h3>
            <h4 className={style.text2}>crea tu cuenta</h4>
            </div>
            <div className={style.inputContainer}>
            <input type="text" name="name" value={inputs.name} id="" placeholder='Nombre' onChange={(e)=>onChange(e)} className={style.inputs}></input>
            <input type="text" name="lastName" value={inputs.lastName} id="" placeholder='Apellido' onChange={(e)=>onChange(e)} className={style.inputs}></input>
            <input type="email" name="email" value={inputs.email} id="" placeholder='Email' onChange={(e)=>onChange(e)} className={style.inputs}></input>
            <div className={style.container_errors}>
            {errors.email && (
                <p className={style.errors}>{errors.email}</p>
                )}
                </div>
            <input type="password" name="password" value={inputs.password} id="" placeholder='Contraseña' onChange={(e)=>onChange(e)} className={style.inputs}></input>
            <div className={style.container_errors}>
            {errors.password && (
                <p className={style.errors}>{errors.password}</p>
                )}
                </div>
            </div>
            <div className={style.button2}>
            <button className={style.button3} disabled={errors.email || errors.password}>Registrarme</button>
            </div>
            <div className={style.divisor}>
            </div>
            <div className={style.notificationContainer}>
            {inputs.password && (
                info.notification &&
                    (
                        <div className={style.notification}>{info.notification}</div>
                    )
                )
            }
            </div>
            <div className={style.button4}>
            <GoogleRegister/>
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