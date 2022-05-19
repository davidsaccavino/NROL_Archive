// import { useHistory } from "react-router";
import React, { useEffect }from 'react';
import { history } from '../../App.js'
import UserDataService from '../../services/user.service.js'


export default function Register(){


    async function handleRegister(e){
        e.preventDefault();

        const form = e.target;
        const user = {
            email: form[0].value,
            username: form[1].value,
            password: form[2].value
        }
        
        UserDataService.register(JSON.stringify(user))
    }

    useEffect( () => {
        UserDataService.isUserAuth({"x-access-token": localStorage.getItem("token")})
        .then(res => {
            res.data.isLoggedIn ? history.push("/") : null
        })
        
    }, [])

    return (
        <form onSubmit={event => handleRegister(event)}>
            <input required type="email"></input>
            <input required type="username"></input>
            <input required type="password"></input>
            <input type="submit" value="Register"/>
        </form>
    )
}