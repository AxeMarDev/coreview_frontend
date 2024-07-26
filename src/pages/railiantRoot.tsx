import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import AdminAuth from "./adminLogin.tsx";
import {Link, Outlet} from "react-router-dom";
import railiantLogo from "../assets/ci.png";


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
            <div className={"flex w-screen h-screen flex-col "}>
                <div className={"flex flex-row p-2 gap-3"}>
                    <Link className={" bg-gray-600 rounded px-2"} to={"/"}> {"<"} </Link>
                    <div className={"w-40"}>
                        <img src={railiantLogo} />
                    </div>
                    <Link className={" bg-gray-600 rounded px-2"} to={"blogs"}> blogs </Link>
                    <Link className={"bg-gray-600 rounded  px-2"} to={"documentation"}> documentation</Link>
                </div>
                <Outlet/>
            </div>

        )

    )
}