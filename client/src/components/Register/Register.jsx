import React, {useState} from "react"

const Register = ({setAuth}) => {

const [inputs,setInputs] = useState({
    name:"",
    lastName:"",
    email:"",
    password:""
})

    const {email , password , name , lastName} = inputs

    const onChange = e => {
        setInputs({...inputs,[e.target.name]
        : e.target.value})
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

        localStorage.setItem("token",parseRes.token)

        setAuth(true)
            

        } catch (err) {
            console.error(err.message)
        }

    }

    return (
        <div>
        <h1>Register</h1>
        <form onSubmit={onSubmitForm}>
        <input type="text" name="name" placeholder="name" value={name} onChange={e => onChange(e)} />
        <input type="text" name="lastName" placeholder="lastName" value={lastName} onChange={e => onChange(e)} />
        <input type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)} />
        <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)} />
        <button>submit</button>
        </form>
        </div>
    )
}


export default Register;