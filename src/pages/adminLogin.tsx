import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import API, {tAdmin, tLoginAdmin} from "../API/api.ts";
import Cookies from "js-cookie";
import railiamnt from "../assets/ci.png";


function Icon(){

    return(
        <div>
            <div className={"w-full flex justify-start pb-4"}>
                <img className={"w-32"} src={railiamnt} alt={"railiant logo"}/>
            </div>
            <div className={"w-full h-[1px] bg-[#313131] mb-4 "}/>
        </div>
    )
}

type propsLoginField2 = { registerField:string , setRegisterFields: (e:React.ChangeEvent<HTMLInputElement>)=>void , placeholder:string }

function LoginField2 ({registerField,setRegisterFields, placeholder}:propsLoginField2){

    return(
        <input type={"text"}
               className={"text-black text-sm rounded bg-[#282828] border border-[#313131] p-2 mt-3 w-80 text-white"}
               value={ registerField }
               placeholder={placeholder}
               onChange={setRegisterFields}/>
    )
}


type propsSignup = {
    setLoginScreen: React.Dispatch<React.SetStateAction<boolean>>
}

function AdminLogin({setLoginScreen}:propsSignup){

    const [registerFields , setRegisterFields] = useState<tLoginAdmin>({
        username:"",
        hash_password: "",
    })

    const handleLogin = () =>{
        API.adminlogin(registerFields).then( (resp)=>{
            if ( !resp.resp.error){
                console.log(resp.resp)
                Cookies.set('id', JSON.stringify({id: resp.resp.id, type:"admin", company_name: resp.resp.company_name, jwt: resp.resp.jwt}), { expires: 7, path: '' })
                setLoginScreen(false)
            }
        })
    }

    return(
        <div className={"rounded bg-[#282828]   text-white px-10 pt-10 pb-5 flex flex-col text-center"}>

            <Icon/>
            <LoginField2 registerField={registerFields.username} setRegisterFields={(e)=>setRegisterFields({...registerFields, username:e.target.value})} placeholder={"username"} />
            <LoginField2 registerField={registerFields.hash_password} setRegisterFields={(e)=>setRegisterFields({...registerFields, hash_password:e.target.value})}  placeholder={"password"} />

            <button className={"bg-[#131313] text-sm rounded p-3 mt-10"}onClick={()=>handleLogin()}> Submit</button>

        </div>
    )
}


function AdminRegister({setLoginScreen}:propsSignup){

    const [registerFields , setRegisterFields] = useState<tAdmin>({
        username:"",
        hash_password: "",
        email: "",
        name: ""
    })

    const handleRegister = () =>{
        API.adminRegister(registerFields).then( (resp)=>{
            if ( !resp.resp.error){
                console.log(resp.resp)
                Cookies.set('id', JSON.stringify({id: resp.resp.id, type:"admin", company_name: resp.resp.company_name, jwt: resp.resp.jwt}), { expires: 7, path: '' })
                setLoginScreen(false)
            }
        })
    }

    return(
        <div className={"rounded bg-[#282828]   text-white px-10 pt-10 pb-5 flex flex-col text-center"}>

            <Icon/>
            <LoginField2 registerField={registerFields.name} setRegisterFields={(e)=>setRegisterFields({...registerFields, name:e.target.value})}  placeholder={"name"} />
            <LoginField2 registerField={registerFields.username} setRegisterFields={(e)=>setRegisterFields({...registerFields, username:e.target.value})} placeholder={"username"} />
            <LoginField2 registerField={registerFields.email} setRegisterFields={(e)=>setRegisterFields({...registerFields, email:e.target.value})}  placeholder={"email"} />
            <LoginField2 registerField={registerFields.hash_password} setRegisterFields={(e)=>setRegisterFields({...registerFields, hash_password:e.target.value})}  placeholder={"password"} />

            <button className={"bg-[#131313] text-sm rounded p-3 mt-10"}onClick={()=>handleRegister()}> Submit</button>

        </div>
    )
}

export default function AdminAuth({setLoginScreen}:{setLoginScreen: React.Dispatch<React.SetStateAction<boolean>>}){

    const navigate = useNavigate()
    const [ onResgister , setOnRegister ]= useState(false)

    return(
        <div className={" w-screen h-screen text-black flex grid justify-center content-center bg-[#131313]"}>

            <button onClick={()=>navigate("/")} className={"fixed top-3  left-3 bg-[#282828]  rounded p-3 text-sm text-white"}> go home </button>
            { onResgister ? (
                <AdminLogin  setLoginScreen={setLoginScreen}/>
            ):(
                <AdminRegister setLoginScreen={setLoginScreen}/>
            )}
            <button className={"pt-3 text-gray-700 text-sm"} onClick={()=>setOnRegister(!onResgister)}> {onResgister? "register":"login"} </button>

        </div>
    )
}
