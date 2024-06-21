import {useQueryClient} from "@tanstack/react-query";
import {useMutation} from "@tanstack/react-query";
import API, {tProject} from "../API/api.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Title from "../components/title.tsx";
import {OptionsbarButtonStyle} from "./clients.tsx";

export default function AddProject(){

    const QueryProject = useQueryClient()
    const navigate = useNavigate()
    const [ projectFields, setProjectFields ] = useState<tProject>({id:"", name:"", company_id: 0})


    const projectsMutation = useMutation({
        mutationFn: (newProject:tProject)=>API.addProjects( newProject),
        onSuccess: ()=>{
            QueryProject.invalidateQueries()
            navigate("/coreview/projects")
        }
    })

    const styleForInputField = "rounded p-1 mb-1 text-sm text-black"

    return(
        <div className={"flex flex-col w-full"}>
            <Title > Projects/add </Title>
            <div className={"flex h-full justify-center "}>
                <div className={" grid content-center h-full"}>
                    <div className={"flex flex-col border -mt-32 rounded bg-white p-4 w-80 "}>
                        <div className={" flex flex-row content-center py-1 gap-1 rounded mb-1"}>
                            <OptionsbarButtonStyle action={()=> navigate("/coreview/projects")} title={"back"}/>
                        </div>
                        <input className={styleForInputField} type={"text"} value={ projectFields.name} placeholder={"name"} onChange={(e)=>setProjectFields({...projectFields, name: e.target.value})}/>
                        <OptionsbarButtonStyle optionalStyle={"mt-2  "} action={()=>projectsMutation.mutate( projectFields)} title={"add project"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}