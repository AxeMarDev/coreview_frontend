import {useNavigate} from "react-router-dom";
import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";
import { selectedProjects} from "../assets/ReactQueryStore.ts";
import Title from "../components/title.tsx";
import {OptionsbarButtonStyle} from "./clients.tsx";

export default function DeleteProjects(){

    const navigate = useNavigate()
    const QueryClient = useQueryClient()

    const projectsQuery = useQuery({
        queryKey: ["projects"],
        queryFn: API.getProjects
    })

    const selectProjectsQuery = useQuery({
        queryKey: ["selectedProjects"],
        queryFn: () => selectedProjects
    })

    const projectDeleteMutation = useMutation({
        mutationFn: (projectid: string) => API.deleteProject( {id: projectid}),
        onSuccess: ()=>{
            QueryClient.resetQueries({queryKey:["selectedProjects"]})
            QueryClient.invalidateQueries({queryKey:["projects"]})
        }
    })

    const deselectAllMutation = useMutation({
        mutationFn: () => {

            return new Promise<void>((resolve) => {

                selectedProjects.splice(0, selectedProjects.length);  //
                resolve();
            });
        },
        onSuccess: ()=> {
            QueryClient.resetQueries({queryKey:["selectedProjects"]})
        },
    })

    const handleDelete = () =>{

        projectsQuery.data && projectsQuery.data.resp.map(item=>{
            if(selectProjectsQuery.data && selectProjectsQuery.data.includes(item.id)  ){
                projectDeleteMutation.mutate(item.id)
            }
        })
        deselectAllMutation.mutate()
        navigate("/coreview/projects")

    }


    return(

        <div className={"flex flex-col w-full"}>
            <Title > Projects/delete </Title>
            <div className={"flex h-full justify-center "}>
                <div className={" grid content-center w-80 h-full"}>
                    <div className={"flex flex-col border -mt-32 rounded bg-white p-4 w-80 text-black"}>
                        <div className={" flex flex-row content-center py-1 gap-1 rounded mb-1"}>
                            <OptionsbarButtonStyle action={()=> navigate("/coreview/projects")} title={"back"}/>
                        </div>
                        <div>
                            { projectsQuery.data && projectsQuery.data.resp.map(item=>{
                                if(selectProjectsQuery.data&& selectProjectsQuery.data.includes(item.id)  ){
                                    return <p> id: {item.id}, name: {item.name}</p>
                                }
                            })}
                        </div>
                        <OptionsbarButtonStyle optionalStyle={"mt-2  "} action={()=>handleDelete()} title={"delete all"}/>
                    </div>
                    <div className={" flex-wrap text-center text-black/50 text-xs p-1"}>
                        <p className={"text-wrap"}> This action is not reversable</p>
                    </div>
                </div>
            </div>
        </div>


    )
}