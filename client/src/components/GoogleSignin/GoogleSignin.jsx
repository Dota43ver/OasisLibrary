import React from 'react';
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import {useHistory} from "react-router-dom"

export default function GoogleSignin({setAuth}){

   

    const history = useHistory()
    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId: '643207090110-euugpdnslg50a08q6blb58ah3vi3b2l2.apps.googleusercontent.com',
            plugin_name: "chat"
        })})

        const onSuccess = async (res) => {
          console.log(res)
          const body = {email:res.profileObj.email}
         setTimeout(() => {
            window.location.href = window.location.href
         }, 2000); 
          const response = await fetch("https://oasislibrary-production.up.railway.app/users/googleSignIn",{
            method: "POST",
            headers: {"Content-Type" : "application/json"}
            ,
            body: JSON.stringify(body)
            
        });

        const parseRes = await response.json()
            localStorage.setItem("token",parseRes.token);
            setAuth(true)
            history.push("/account")
            window.location.href = window.location.href
        
       
       

        };
        const onFailure = (err) => {
            console.log('failed:', err);
        };
    
      
        

    return (

        <GoogleLogin
        clientId="643207090110-euugpdnslg50a08q6blb58ah3vi3b2l2.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        />
        )
}