import { useNavigate} from "react-router-dom";
import {useState} from "react";
import API, {tClient} from "../API/api.ts";
import {useMutation} from "@tanstack/react-query";
import {useQueryClient} from "@tanstack/react-query";
import Title from "../components/title.tsx";
import {OptionsbarButtonStyle} from "./clients.tsx";


export default function AddClient(){

    const QueryClient = useQueryClient()
    const navigate = useNavigate()
    const [ clientFields, setClientFields ] = useState<tClient>({id:"", name:"", username:"", email:"", phone:"", hash_password:"",company_id:14})

    const clientsMutation = useMutation({
        mutationFn: (newClient:tClient)=>API.addClient( newClient),
        onSuccess: ()=>{
            QueryClient.invalidateQueries({queryKey:["clients"]})
            navigate("/coreview/clients")
        }
    })

    const styleForInputField = "rounded p-1 mb-1 text-sm text-black"


    return(
        <div className={"flex flex-col w-full"}>
            <Title > Clients/add </Title>
            <div className={"flex h-full justify-center "}>
                <div className={" grid content-center h-full"}>
                    <div className={"flex flex-col border -mt-32 rounded bg-white p-4 w-80 "}>
                        <div className={" flex flex-row content-center py-1 gap-1 rounded mb-1"}>
                            <OptionsbarButtonStyle action={()=> navigate("/coreview/clients")} title={"back"}/>
                        </div>

                        <input className={styleForInputField} type={"text"} value={ clientFields.name} placeholder={"name"} onChange={(e)=>setClientFields({...clientFields, name: e.target.value})}/>
                        <input className={styleForInputField} type={"text"} value={ clientFields.username} placeholder={"username"} onChange={(e)=>setClientFields({...clientFields, username: e.target.value})}/>
                        <input className={styleForInputField} type={"text"} value={ clientFields.email} placeholder={"email"} onChange={(e)=>setClientFields({...clientFields, email: e.target.value})}/>
                        <input className={styleForInputField} type={"text"} value={ clientFields.phone} placeholder={"phone"} onChange={(e)=>setClientFields({...clientFields, phone: e.target.value})}/>
                        <input  className={styleForInputField} type={"text"} value={ clientFields.hash_password} placeholder={"password"} onChange={(e)=>setClientFields({...clientFields, hash_password: e.target.value})}/>

                        <OptionsbarButtonStyle optionalStyle={"mt-2  "} action={()=>clientsMutation.mutate( clientFields)} title={"add client"}/>
                    </div>
                </div>

            </div>


        </div>
    )
}