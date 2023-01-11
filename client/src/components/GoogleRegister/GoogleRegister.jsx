import React from 'react';
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import Swal from 'sweetalert2';
import {useHistory} from "react-router-dom"

export default function GoogleRegister(){
    const history = useHistory()

    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId: '643207090110-euugpdnslg50a08q6blb58ah3vi3b2l2.apps.googleusercontent.com',
            plugin_name: "chat"
        })})

        const onSuccess = async (res) => {
          console.log(res)
          const body = {name:res.profileObj.givenName , lastName:res.profileObj.familyName, email:res.profileObj.email, image: res.profileObj.imageUrl}
          const response = await fetch("https://oasislibrary-production.up.railway.app/users/signUpWithGoogle",{
            method: "POST",
            headers: {"Content-Type" : "application/json"}
            ,
            body: JSON.stringify(body)
        });

        const parseRes = await response.json()

        localStorage.setItem("Atoken",parseRes.token)

        Swal.fire({
            title: 'Registro exitoso',
            text: 'Has registrado con éxito tu cuenta con Google ya podes iniciar sesion',
            icon: 'success'
          });
          history.push("/login")

        };
        const onFailure = (err) => {
            console.log('failed:', err);
        };
    
      
        

    return (

        <GoogleLogin
        clientId="643207090110-euugpdnslg50a08q6blb58ah3vi3b2l2.apps.googleusercontent.com"
        buttonText="Sing Up with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        />
        )
}

