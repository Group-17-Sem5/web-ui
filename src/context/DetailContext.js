import React, { createContext, useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'


const DetailContext = createContext();

export function useDetail() {
    return useContext(DetailContext)
}

export function DetailProvider({  children }) {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '')
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('adminUser') || '{}'))
    const [loginStatus, setLoginStatus] = useState()
    const [details, setDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        localStorage.setItem('adminUser', JSON.stringify(user));
    }, [user]);
    useEffect(() => {
        localStorage.setItem('adminToken', token || '');
    },[token])

    function customFetch(url, { method = 'GET', headers = {}, ...rest } = {}) {
        return fetch(process.env.REACT_APP_API_HOST + '/admin' + url, {
            method,
            headers: { "Authorization": "Bearer " + token, ...headers, },
            ...rest
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 304) {
                    throw Error('could not fetch data')
                }
                return res.json()
            })
    }

    function login(email, password) {
        return fetch(process.env.REACT_APP_API_HOST + `/postMaster/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setIsLoading(true)
                    setUser(data.user)
                    setToken(data.token)
                    setLoginStatus(true)
                    localStorage.setItem('loginStatus',true)
                    // console.log(data.token)
                }
                return data;
            })
            .catch(err=>{
                console.log(err)
            })
    }

    function logout() {
        setUser(null);
        setToken(null)
        setLoginStatus(false)
        localStorage.setItem('loginStatus',false)
        localStorage.removeItem('adminUser')
        localStorage.removeItem('adminToken')
        return true;
    }

    const value = {
        ...details,
        user,
       
        login,
        logout,
        customFetch,
        loginStatus,
    }

    return (
        <DetailContext.Provider value={value} >
            {
             children
            }
        </DetailContext.Provider>
    )
}