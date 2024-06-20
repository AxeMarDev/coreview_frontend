import {useQueryClient} from "@tanstack/react-query";
import {useMutation} from "@tanstack/react-query";
import API, {tProject} from "../API/api.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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

    return(

        <div>
            <button onClick={()=> navigate("/coreview/projects") }>back</button>
            <input type={"text"} value={ projectFields.name} placeholder={"name"} onChange={(e)=>setProjectFields({...projectFields, name: e.target.value})}/>
            <button onClick={()=>projectsMutation.mutate( projectFields)}>add client</button>
        </div>
    )
}