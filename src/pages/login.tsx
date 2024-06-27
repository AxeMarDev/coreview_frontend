// import API, {tRegister} from "../API/api.ts";
// import {useState} from "react";
//
import React, { useState} from "react";
import API, {tLogin, tRegister} from "../API/api.ts";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";


type propsLoginField = { registerFields:tRegister , setRegisterFields:React.Dispatch<React.SetStateAction<tRegister>> , target:"company_name"|"company_code"|"email"|"username"|"phone"|"password", placeholder:string }

function LoginField({registerFields,setRegisterFields, target, placeholder}:propsLoginField){
    return(
        <input type={"text"}
               className={"text-white rounded bg-[#171717] p-2 mt-3"}
       value={ registerFields[target] }
       placeholder={placeholder}
       onChange={(e)=>setRegisterFields({...registerFields, [target]: e.target.value})}/>
    )
}

type propsPromptRouter = { activeRoute:"contractor"|"client", setRouterState: React.Dispatch<React.SetStateAction<"contractor"|"client">>}
function PromptRouter({activeRoute,setRouterState}:propsPromptRouter){

    return(
        <div className={"flex flex-row p-1 bg-[#171717]"}>
            <button className={ `w-40 p-2 text-center rounded ${activeRoute === "contractor" ? ("bg-[#222222]"):("")}`} onClick={()=>setRouterState("contractor")}> contrator</button>
            <button className={`w-40  p-2 text-center rounded ${activeRoute === "client" ? ("bg-[#222222]"):("")}`} onClick={()=>setRouterState("client")}> client</button>
        </div>
    )
}

type propsLoginBox = { activeRoute:"contractor"|"client",setRouterState: React.Dispatch<React.SetStateAction<"contractor"|"client">>}

function ClientSignup({activeRoute,setRouterState}:propsLoginBox){
    return(
        <div className={"rounded bg-[#222222] text-white p-6 flex flex-col text-center"}>
            <p> Welcome </p>
            <PromptRouter  activeRoute={activeRoute} setRouterState={setRouterState}/>
        </div>
    )
}

type propsSignup = { activeRoute:"contractor"|"client",setRouterState: React.Dispatch<React.SetStateAction<"contractor"|"client">>}
function ContractorSignup({activeRoute,setRouterState}:propsSignup){


    const navigate = useNavigate()
    const [registerFields , setRegisterFields] = useState<tRegister>({
        company_name:"",
        company_code:"",
        email:"",
        username:"",
        phone:"",
        password: "",
    })



    const handleRegister = () =>{
        API.register(registerFields).then( (resp)=>{
                console.log(resp.resp)
                Cookies.set('id', JSON.stringify({id: resp.resp.id, company_name: resp.resp.company_name, jwt: resp.resp.jwt}), { expires: 7, path: '' });
                navigate("/coreview")
            }
        )
    }

    return(
        <div className={"rounded bg-[#222222] text-white p-6 flex flex-col text-center"}>
            <p> Welcome </p>
            <PromptRouter activeRoute={activeRoute} setRouterState={setRouterState}/>
            <LoginField registerFields={registerFields} setRegisterFields={setRegisterFields} target={"company_name"} placeholder={"company name"} />
            <LoginField registerFields={registerFields} setRegisterFields={setRegisterFields} target={"company_code"} placeholder={"company code"} />
            <LoginField registerFields={registerFields} setRegisterFields={setRegisterFields} target={"email"} placeholder={"email"} />
            <LoginField registerFields={registerFields} setRegisterFields={setRegisterFields} target={"username"} placeholder={"username"} />
            <LoginField registerFields={registerFields} setRegisterFields={setRegisterFields} target={"phone"} placeholder={"phone"} />
            <LoginField registerFields={registerFields} setRegisterFields={setRegisterFields} target={"password"} placeholder={"password"} />
            <button className={"bg-blue-500 rounded p-3 mt-3"}onClick={()=>handleRegister()}> Submit</button>
        </div>
    )
}


type propsLoginField2 = { registerFields:tLogin , setRegisterFields:React.Dispatch<React.SetStateAction<tLogin>> , target:"company_code"|"username"|"password", placeholder:string }

function LoginField2({registerFields,setRegisterFields, target, placeholder}:propsLoginField2){
    return(
        <input type={"text"}
               className={"text-white rounded bg-[#171717] p-2 mt-3"}
               value={ registerFields[target] }
               placeholder={placeholder}
               onChange={(e)=>setRegisterFields({...registerFields, [target]: e.target.value})}/>
    )
}

function ContractorLogin({activeRoute,setRouterState}:propsSignup){

    const navigate = useNavigate()
    const [registerFields , setRegisterFields] = useState<tLogin>({
        company_code:"",
        username:"",
        password: "",
    })

    const handleRegister = () =>{
        API.login(registerFields).then( (resp)=>{
                console.log(resp.resp)
                Cookies.set('id', JSON.stringify({id: resp.resp.id, company_name: resp.resp.company_name, jwt: resp.resp.jwt}), { expires: 7, path: '' });
                navigate("/coreview")
            }
        )
    }

    return(
        <div className={"rounded bg-[#222222] text-white p-6 flex flex-col text-center"}>
            <p> Welcome </p>
            <PromptRouter activeRoute={activeRoute} setRouterState={setRouterState}/>
            <LoginField2 registerFields={registerFields} setRegisterFields={setRegisterFields} target={"company_code"} placeholder={"company code"} />
            <LoginField2 registerFields={registerFields} setRegisterFields={setRegisterFields} target={"username"} placeholder={"username"} />
            <LoginField2 registerFields={registerFields} setRegisterFields={setRegisterFields} target={"password"} placeholder={"password"} />

            <button className={"bg-blue-500 rounded p-3 mt-3"}onClick={()=>handleRegister()}> Submit</button>
        </div>
    )
}





export default function Login(){

    const [ access , setAccessState ] = useState<"contractor"|"client">("contractor")
    const [ routerState , setRouterState ] = useState<"login"|"signup">("login")
    const navigate = useNavigate()

    return(
        <div className={" w-screen h-screen text-black flex grid justify-center content-center "}>
            <button onClick={()=>navigate("/")} className={"fixed top-3 left-3 bg-[#222222] rounded p-3 text-blue-500"}> go home </button>

            { routerState === "login" ? (
                access === "contractor"  ? (
                    <ContractorLogin activeRoute={access} setRouterState={setAccessState}/>
                ):(
                    <ClientSignup activeRoute={access} setRouterState={setAccessState}/>
                )
            ) :(
                access === "contractor"  ? (
                    <ContractorSignup activeRoute={access} setRouterState={setAccessState}/>
                ):(
                    <ClientSignup activeRoute={access} setRouterState={setAccessState}/>
                )
            )}

            { routerState === "login" ? (
                <button onClick={()=>setRouterState("signup")} className={"fixed bottom-3 left-3 bg-[#222222] rounded p-3 text-blue-500"}> signup instead </button>
            ):(
                <button onClick={()=>setRouterState("login")} className={"fixed bottom-3 left-3 bg-[#222222] rounded p-3 text-blue-500"}> login instead </button>
            )}

        </div>
    )
}
