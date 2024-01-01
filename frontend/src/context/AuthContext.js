import { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import React from 'react';
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../context/config'
import manager from "../helper/manager";

const AuthContext = createContext()



export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('Token') )
    let [user, setUser] = useState(()=> localStorage.getItem('Token'))
    let [loading, setLoading] = useState(true)


    const history = useNavigate()



    // if (window.location.search !== "") {
    //     let token = String(window.location.search).split("=")[1];
    //     localStorage.setItem('Token', token)
    //     history('/')
    //   }

    let loginUser = async (e )=> {
        e.preventDefault()
        let response = await fetch(API_BASE_URL+'/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        // let response = manager.accesstoken(e.target.username.value,e.target.password.value)
        let data = await response.json()
        console.log('data: ',data)
        console.log('response: ',response)



        if(response.status === 200){
            console.log('In---------------------------------------------')
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('Token', data.access)
            history('/')
        }else{
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        // localStorage.removeItem('authTokens')
        localStorage.removeItem('Token')
        history('/login')
    }


    let updateToken = async ()=> {

        console.log(authTokens)
   
        // let response = await fetch(API_BASE_URL+'/api/token/refresh/', {
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     // body:JSON.stringify({'refresh':authTokens?.refresh})
        //     body:JSON.stringify({'refresh': authTokens && authTokens.refresh})
            
        // })

        // let response = manager.refreshtoken(authTokens)

        // let data = await response.json()
        
        // if (response.status === 200){
        //     setAuthTokens(data)
        //     setUser(jwt_decode(data.access))
        //     localStorage.setItem('authTokens', JSON.stringify(data))
        // }else{
        //     logoutUser()
        // }

        // if(loading){
        //     setLoading(false)
        // }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }


    useEffect(()=> {
        console.log('authTokens:   ',authTokens)
        console.log('user:   ',user)
        if(authTokens){
            setLoading(false)
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {children ? children : children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
