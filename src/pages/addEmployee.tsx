import { useNavigate} from "react-router-dom";
import {useState} from "react";
import API, { tEmployee} from "../API/api.ts";
import {useMutation} from "@tanstack/react-query";
import {useQueryClient} from "@tanstack/react-query";
import Title from "../components/title.tsx";
import {OptionsbarButtonStyle} from "./clients.tsx";


export default function AddEmployee(){

    const QueryClient = useQueryClient()
    const navigate = useNavigate()
    const [ employeeFields, setEmployeeFields ] = useState<tEmployee>({id:"", name:"", username:"", email:"", phone:"", hash_password:"",company_id:14})

    const employeeMutation = useMutation({
        mutationFn: (newEmployee:tEmployee)=>API.addEmployee( newEmployee),
        onSuccess: ()=>{
            QueryClient.invalidateQueries({queryKey:["employees"]})
            navigate("/coreview/employees")
        }
    })

    const styleForInputField = "rounded p-1 mb-1 text-sm text-black"

    return(
        <div className={"flex flex-col w-full"}>
            <Title > Employees/add </Title>
            <div className={"flex h-full justify-center "}>
                <div className={" grid content-center h-full"}>
                    <div className={"flex flex-col border -mt-32 rounded bg-white p-4 w-80 "}>
                        <div className={" flex flex-row content-center py-1 gap-1 rounded mb-1"}>
                            <OptionsbarButtonStyle action={()=> navigate("/coreview/employees")} title={"back"}/>
                        </div>

                        <input className={styleForInputField} type={"text"} value={ employeeFields.name} placeholder={"name"} onChange={(e)=>setEmployeeFields({...employeeFields, name: e.target.value})}/>
                        <input className={styleForInputField} type={"text"} value={ employeeFields.username} placeholder={"username"} onChange={(e)=>setEmployeeFields({...employeeFields, username: e.target.value})}/>
                        <input className={styleForInputField} type={"text"} value={ employeeFields.email} placeholder={"email"} onChange={(e)=>setEmployeeFields({...employeeFields, email: e.target.value})}/>
                        <input className={styleForInputField} type={"text"} value={ employeeFields.phone} placeholder={"phone"} onChange={(e)=>setEmployeeFields({...employeeFields, phone: e.target.value})}/>
                        <input className={styleForInputField} type={"text"} value={ employeeFields.hash_password} placeholder={"password"} onChange={(e)=>setEmployeeFields({...employeeFields, hash_password: e.target.value})}/>

                        <OptionsbarButtonStyle optionalStyle={"mt-2  "} action={()=>employeeMutation.mutate( employeeFields)} title={"add employee"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}