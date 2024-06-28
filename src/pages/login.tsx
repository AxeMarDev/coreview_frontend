// import API, {tRegister} from "../API/api.ts";
// import {useState} from "react";
//
import React, { useState} from "react";
import API, {tLogin, tRegister} from "../API/api.ts";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import railiamnt from "../assets/railiamnt.png"



type propsPromptRouter = { activeRoute:"contractor"|"client", setRouterState: React.Dispatch<React.SetStateAction<"contractor"|"client">>, disable?: true}
function PromptRouter({activeRoute,setRouterState, disable}:propsPromptRouter){

    return(
        <div>
            <div className={"w-full flex justify-start pb-4"}>
                <img className={"w-20"} src={railiamnt} alt={"railiant logo"}/>
            </div>
            <div className={"w-full h-[1px] bg-black/10 mb-4 "}/>

            { !disable && (
                <div className={"flex flex-row p-1 bg-[#F1F1F1]  rounded border w-80"}>
                    <button className={ ` text-black text-sm w-1/2 p-2 text-center rounded ${activeRoute === "contractor" ? ("bg-white"):("")}`} onClick={()=>setRouterState("contractor")}> contrator</button>
                    <button className={`  text-black text-sm w-1/2 p-2 text-center rounded ${activeRoute === "client" ? ("bg-white"):("")}`} onClick={()=>setRouterState("client")}> client</button>
                </div>
            )}

        </div>
    )
}

type propsLoginBox = { activeRoute:"contractor"|"client",setRouterState: React.Dispatch<React.SetStateAction<"contractor"|"client">>, setRouterState2: React.Dispatch<React.SetStateAction<"login"|"signup">>}

function ClientLogin({activeRoute,setRouterState, setRouterState2}:propsLoginBox){

    const navigate = useNavigate()

    const [registerFields , setRegisterFields] = useState<tLogin>({
        company_code:"",
        username:"",
        password: "",
    })

    const handleRegister = () =>{
        API.login(registerFields).then( (resp)=>{
                console.log(resp.resp)

                if ( !resp.resp.error ){
                    Cookies.set('id', JSON.stringify({id: resp.resp.id, company_name: resp.resp.company_name, jwt: resp.resp.jwt}), { expires: 7, path: '' });
                    navigate("/coreview")
                } else{
                    console.log("undefined")
                }


            }
        )
    }
    return(
        <div className={"rounded bg-white border  text-white px-10 pt-10 pb-5 flex flex-col text-center"}>

            <PromptRouter activeRoute={activeRoute} setRouterState={setRouterState}/>
            <LoginField2 registerField={registerFields.company_code} setRegisterFields={(e)=>setRegisterFields({...registerFields, company_code:e.target.value})} placeholder={"company code"} />
            <LoginField2 registerField={registerFields.password} setRegisterFields={(e)=>setRegisterFields({...registerFields, password:e.target.value})} placeholder={"username"} />
            <LoginField2 registerField={registerFields.username} setRegisterFields={(e)=>setRegisterFields({...registerFields, username:e.target.value})}  placeholder={"password"} />

            <button className={"bg-black text-sm rounded p-3 mt-10"}onClick={()=>handleRegister()}> Submit</button>
            <button onClick={()=>setRouterState2("signup")} className={"text-sm text-black mt-4"}> sign up instead </button>

        </div>
    )
}

type propsLoginField2 = { registerField:string , setRegisterFields: (e:React.ChangeEvent<HTMLInputElement>)=>void , placeholder:string }

function LoginField2 ({registerField,setRegisterFields, placeholder}:propsLoginField2){

    return(
        <input type={"text"}
               className={"text-black text-sm rounded bg-white border p-2 mt-3 w-80"}
               value={ registerField }
               placeholder={placeholder}
               onChange={setRegisterFields}/>
    )
}


type propsSignup = { activeRoute:"contractor"|"client",setRouterState: React.Dispatch<React.SetStateAction<"contractor"|"client">>, setRouterState2: React.Dispatch<React.SetStateAction<"login"|"signup">>}
function ContractorSignup({activeRoute,setRouterState, setRouterState2}:propsSignup){


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
        <div className={"rounded bg-white text-white px-10 pt-10 pb-5 flex flex-col text-center"}>
            <PromptRouter activeRoute={activeRoute} setRouterState={setRouterState} disable/>

            <LoginField2 registerField={registerFields.company_name} setRegisterFields={(e)=>setRegisterFields({...registerFields, company_name:e.target.value})} placeholder={"company name"} />
            <LoginField2 registerField={registerFields.company_code} setRegisterFields={(e)=>setRegisterFields({...registerFields, company_code:e.target.value})} placeholder={"company code"} />
            <LoginField2 registerField={registerFields.email} setRegisterFields={(e)=>setRegisterFields({...registerFields, email:e.target.value})} placeholder={"email"} />
            <LoginField2 registerField={registerFields.username} setRegisterFields={(e)=>setRegisterFields({...registerFields, username:e.target.value})} placeholder={"username"} />
            <LoginField2 registerField={registerFields.phone} setRegisterFields={(e)=>setRegisterFields({...registerFields, phone:e.target.value})} placeholder={"phone"} />
            <LoginField2 registerField={registerFields.password} setRegisterFields={(e)=>setRegisterFields({...registerFields, password:e.target.value})} placeholder={"password"} />

            <button className={"bg-black text-sm rounded p-3 mt-10"}onClick={()=>handleRegister()}> Submit</button>
            <button onClick={()=>setRouterState2("login")} className={"text-sm text-black mt-4"}> login instead </button>
        </div>
    )
}



function ContractorLogin({activeRoute,setRouterState, setRouterState2}:propsSignup){

    const navigate = useNavigate()
    const [registerFields , setRegisterFields] = useState<tLogin>({
        company_code:"",
        username:"",
        password: "",
    })

    const handleRegister = () =>{
        API.login(registerFields).then( (resp)=>{
                console.log(resp.resp)

                if ( !resp.resp.error ){
                    Cookies.set('id', JSON.stringify({id: resp.resp.id, company_name: resp.resp.company_name, jwt: resp.resp.jwt}), { expires: 7, path: '' });
                    navigate("/coreview")
                } else{
                    console.log("undefined")
                }


            }
        )
    }

    return(
        <div className={"rounded bg-white border  text-white px-10 pt-10 pb-5 flex flex-col text-center"}>

            <PromptRouter activeRoute={activeRoute} setRouterState={setRouterState}/>
            <LoginField2 registerField={registerFields.company_code} setRegisterFields={(e)=>setRegisterFields({...registerFields, company_code:e.target.value})} placeholder={"company code"} />
            <LoginField2 registerField={registerFields.password} setRegisterFields={(e)=>setRegisterFields({...registerFields, password:e.target.value})} placeholder={"username"} />
            <LoginField2 registerField={registerFields.username} setRegisterFields={(e)=>setRegisterFields({...registerFields, username:e.target.value})}  placeholder={"password"} />

            <button className={"bg-black text-sm rounded p-3 mt-10"}onClick={()=>handleRegister()}> Submit</button>
            <button onClick={()=>setRouterState2("signup")} className={"text-sm text-black mt-4"}> sign up instead </button>

        </div>
    )
}





export default function Login(){

    const [ access , setAccessState ] = useState<"contractor"|"client">("contractor")
    const [ routerState , setRouterState ] = useState<"login"|"signup">("login")
    const navigate = useNavigate()

    return(
        <div className={" w-screen h-screen text-black flex grid justify-center content-center bg-[#F1F1F1]"}>

            <button onClick={()=>navigate("/")} className={"fixed top-3 left-3 bg-white border rounded p-3 text-sm text-black"}> go home </button>

            { routerState === "login" ? (
                access === "contractor"  ? (
                    <ContractorLogin activeRoute={access} setRouterState={setAccessState} setRouterState2={setRouterState}/>
                ):(
                    <ClientLogin activeRoute={access} setRouterState={setAccessState} setRouterState2={setRouterState}/>
                )
            ) :(
                <ContractorSignup activeRoute={access} setRouterState={setAccessState} setRouterState2={setRouterState}/>

            )}

        </div>
    )
}
