import React, { useEffect }from 'react';
import { useNavigate } from 'react-router-dom'
import UserDataService from '../../services/user.service.js'



export default function Login(){

    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        
        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }
        
        UserDataService.login(JSON.stringify(user))
        .then(res => {
            localStorage.setItem("token", res.data.token)
            
            res.data.isLoggedIn ? navigate("/launches/list") : null

            
        })

        UserDataService.isUserAuth({"x-access-token": localStorage.getItem("token")})
        .then(res => {
            console.log(res.data)
            res.data.isLoggedIn ? navigate("/launches/list") : null
        })
    }

    useEffect( () => {
        let config = {"x-access-token": localStorage.getItem("token")};
        UserDataService.isUserAuth(config)
        .then(res => {
            console.log(res.data)
            res.data.isLoggedIn ? navigate("/launches/list") : null
        })
        
    }, [])

    return (
        <form onSubmit={event => handleLogin(event)}>
            <input required type= "username"></input>
            <input required type= "password"></input>
            <input type="submit" value="Submit"/>
        </form>
    )
}