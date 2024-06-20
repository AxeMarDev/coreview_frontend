import { useNavigate} from "react-router-dom";
import {useState} from "react";
import API, {tClient} from "../API/api.ts";
import {useMutation} from "@tanstack/react-query";
import {useQueryClient} from "@tanstack/react-query";


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

    return(
        <div>
            <button onClick={()=> navigate("/coreview/clients") }>back</button>

            <input type={"text"} value={ clientFields.name} placeholder={"name"} onChange={(e)=>setClientFields({...clientFields, name: e.target.value})}/>
            <input type={"text"} value={ clientFields.username} placeholder={"username"} onChange={(e)=>setClientFields({...clientFields, username: e.target.value})}/>
            <input type={"text"} value={ clientFields.email} placeholder={"email"} onChange={(e)=>setClientFields({...clientFields, email: e.target.value})}/>
            <input type={"text"} value={ clientFields.phone} placeholder={"phone"} onChange={(e)=>setClientFields({...clientFields, phone: e.target.value})}/>
            <input type={"text"} value={ clientFields.hash_password} placeholder={"password"} onChange={(e)=>setClientFields({...clientFields, hash_password: e.target.value})}/>

            <button onClick={()=>clientsMutation.mutate( clientFields)}>add client</button>

        </div>
    )
}