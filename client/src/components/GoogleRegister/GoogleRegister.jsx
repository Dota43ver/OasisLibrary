import React from 'react';
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";

export default function GoogleRegister(){

    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId: '643207090110-euugpdnslg50a08q6blb58ah3vi3b2l2.apps.googleusercontent.com',
            plugin_name: "chat"
        })})

        const onSuccess = async (res) => {
          console.log(res)
          const body = {name:res.profileObj.givenName , lastName:res.profileObj.familyName, email:res.profileObj.email}
          const response = await fetch("http://localhost:3001/users/signUpWithGoogle",{
            method: "POST",
            headers: {"Content-Type" : "application/json"}
            ,
            body: JSON.stringify(body)
        });

        const parseRes = await response.json()

        localStorage.setItem("Atoken",parseRes.token)

        };
        const onFailure = (err) => {
            console.log('failed:', err);
        };
    
      
        

    return (

        <GoogleLogin
        clientId="643207090110-euugpdnslg50a08q6blb58ah3vi3b2l2.apps.googleusercontent.com"
        buttonText="sing up"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        />
        )
}