import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import AdminAuth from "./adminLogin.tsx";
import {Outlet} from "react-router-dom";


export default function RailiantRoot(){


    const [ onLoginScreen , setLoginScreen ] = useState(true)

    useEffect(() => {
        const value = Cookies.get('id'); // returns 'value' if the cookie exists
        if ( (value !== undefined) ){
            setLoginScreen(false)
        }
    })

    return(
        onLoginScreen ? (
            <AdminAuth setLoginScreen={setLoginScreen}/>
        ):(
            <Outlet/>
        )

    )
}