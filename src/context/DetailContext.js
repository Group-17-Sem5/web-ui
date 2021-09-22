import React, { createContext, useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'


const DetailContext = createContext();

export function useDetail() {
    return useContext(DetailContext)
}

export function DetailProvider({  children }) {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '')
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('adminUser') || '{}'))
    const [loginStatus, setLoginStatus] = useState(false)
    const [details, setDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        localStorage.setItem('adminUser', JSON.stringify(user));
    }, [user]);
    useEffect(() => {
        localStorage.setItem('adminToken', token || '');
    },[token])

    // useEffect(() => {
    //     if (!clientId) return
    //     if (clientId === 'admin') {
    //         setDetails({ _id: "admin", name: 'Quaxor Admin' })
    //         setIsLoading(false)
    //         return
    //     }
    //     if (clientId === 'template') {
    //         setDetails({ _id: "template", name: 'CoreUI Template' })
    //         setIsLoading(false)
    //         setLoginStatus(true)
    //         return
    //     }
    //     setIsLoading(true);
    //     const abortCont = new AbortController();
    //     fetch(process.env.REACT_APP_API_HOST + '/organizations/clientId/' + clientId, { signal: abortCont.signal })
    //         .then(res => {
    //             if (res.status !== 200 && res.status !== 304) {
    //                 throw Error('could not fetch data')
    //             }
    //             return res.json()
    //         })
    //         .then(data => {
    //             setDetails(data || {});
    //             document.title = data.name;
    //             setIsLoading(false);
    //         })
    //         .catch(err => {
    //             if (err.name === 'AbortError') {
    //                 console.log('Fetch aborted');
    //             } else {
    //                 setIsLoading(false);
    //                 //setError(err.message);
    //             }
    //         });
    //     return () => abortCont.abort();
    // }, [clientId])


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

    function login(email, password) {console.log('dwf')
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
                    localStorage.setItem('loginStatus',true)
                    console.log(data.token)
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