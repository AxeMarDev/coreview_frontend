import {useMutation} from "@tanstack/react-query";
import API, {tBlog} from "../API/api.ts";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";

export default function AddBlog() {

    const QueryClient = useQueryClient()
    const navigate = useNavigate()
    const [fields, setFields] = useState<tBlog>(
        { title:"", subtitle:"", author_id: 0, date_posted:0, imageurl:""}
    )

    const blogMutation = useMutation({
        mutationFn: (newBlog:tBlog)=>API.addBlog( newBlog),
        onSuccess: ()=>{
            QueryClient.invalidateQueries({queryKey:["blogs"]})
            navigate("/internal")
        }
    })

    return(
        <div className={"flex flex-col text-black"}>
            <input type={"text"} value={fields.title} onChange={(e)=>setFields({...fields, title:e.target.value})}/>
            <input type={"text"} value={fields.subtitle} onChange={(e)=>setFields({...fields, subtitle:e.target.value})}/>
            <input type={"text"} value={fields.imageurl} onChange={(e)=>setFields({...fields, imageurl:e.target.value})}/>

            <button onClick={()=>blogMutation.mutate(fields)}> add </button>
        </div>
    )
}