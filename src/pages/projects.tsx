import Title from "../components/title.tsx";
import Table from "../components/table.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import API, { tProject} from "../API/api.ts";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useLayoutEffect, useState} from "react";
import { selectedProjects} from "../assets/ReactQueryStore.ts";
import {OptionsbarButtonStyle} from "./clients.tsx";




function OptionsBar(){

    const navigate = useNavigate()
    const QueryClient = useQueryClient()

    const selectClientsQuery = useQuery({
        queryKey: ["selectedProjects"],
        queryFn: () => selectedProjects
    })

    const projectsQuery = useQuery({
        queryKey: ["projects"],
        queryFn: API.getProjects
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

    const selectAllMutation = useMutation({
        mutationFn: (projects:tProject[]) => {

            return new Promise<void>((resolve) => {

                selectedProjects.splice(0, selectedProjects.length);
                projects.map( item => selectedProjects.push( item.id) )

                resolve();
            });
        },
        onSuccess: ()=> {
            QueryClient.resetQueries({queryKey:["selectedProjects"]})
        },
    })

    return(

        selectClientsQuery.data && (
            <div className={"flex flex-row content-center py-1 gap-1 rounded"}>
                { selectClientsQuery.data.length === 0 && ( <OptionsbarButtonStyle title={"add"} action={ ()=>navigate("/coreview/projects/add")}/>)}
                { selectClientsQuery.data.length !== projectsQuery.data?.resp.length && ( <OptionsbarButtonStyle title={"select all"} action={()=>selectAllMutation.mutate(projectsQuery.data && projectsQuery.data.resp || [])}/> )}
                { selectClientsQuery.data.length !== 0 && ( <OptionsbarButtonStyle title={"delete"} action={()=>navigate("/coreview/projects/add")}/> )}
                { selectClientsQuery.data.length !== 0 && ( <OptionsbarButtonStyle title={"deselect"} action={()=>deselectAllMutation.mutate()}/> )}
                { selectClientsQuery.data.length === 1 && ( <OptionsbarButtonStyle title={"edit"} action={()=>{}}/> )}
            </div>
        )


    )
}

export default function Projects(){


    const location = useLocation()
    const navigate = useNavigate()
    const [ inOutlet, setInOutlet ] = useState(false)

    useLayoutEffect(() => {
        if ( location.pathname !== "/coreview/projects"){
            setInOutlet(true)
        } else{
            setInOutlet(false)
        }
    }, [location,navigate]);

    const projectsQuery = useQuery({
        queryKey: ["projects"],
        queryFn: API.getProjects
    })


    return(
        inOutlet ?(
            <Outlet/>
        ):(
            <div className={"w-full h-full flex flex-col"}>
                <Title> Projects </Title>

                <OptionsBar/>

                { projectsQuery.data && (
                    <Table cols={[
                        {name:"id", width: "w-10"},
                        {name:"name",width: "w-32"},
                        {name:"company_id",width: "w-32"}
                    ]} content={projectsQuery.data.resp} queryKey={"selectedProjects"} selectedArray={selectedProjects}/>
                )}

            </div>
        )
    )
}