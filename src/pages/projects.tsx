import Title from "../components/title.tsx";
import Table from "../components/table.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import API, { tProject} from "../API/api.ts";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useLayoutEffect, useState} from "react";
import { selectedProjects} from "../assets/ReactQueryStore.ts";
import {OptionsbarButtonStyle} from "./clients.tsx";
import { IoIosSearch } from "react-icons/io";
import {CircularProgress} from "@mui/material";





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

    const [ field, setField ] = useState("")

    return(

        selectClientsQuery.data && (
            <div className={"flex flex-row justify-between py-1"}>
                <div className={"flex flex-row content-center  gap-1 rounded"}>
                    { selectClientsQuery.data.length === 0 && ( <OptionsbarButtonStyle title={"add"} action={ ()=>navigate("/coreview/projects/add")}/>)}
                    { selectClientsQuery.data.length !== projectsQuery.data?.resp.length && ( <OptionsbarButtonStyle title={"select all"} action={()=>selectAllMutation.mutate(projectsQuery.data && projectsQuery.data.resp || [])}/> )}
                    { selectClientsQuery.data.length !== 0 && ( <OptionsbarButtonStyle title={"delete"} action={()=>navigate("/coreview/projects/add")}/> )}
                    { selectClientsQuery.data.length !== 0 && ( <OptionsbarButtonStyle title={"deselect"} action={()=>deselectAllMutation.mutate()}/> )}
                    { selectClientsQuery.data.length === 1 && ( <OptionsbarButtonStyle title={"open"} action={()=>navigate("/coreview/projects/open")}/> )}
                </div>
                <div className={"h-full flex flex-row"}>
                    <input className={"bg-[#F7F7F7] border-y border-l border-[#E5E5E5] rounded-l text-black text-sm pl-2"} type={"text"} value={field} onChange={(e)=>setField(e.target.value)} placeholder={"search"}/>
                    <SearchbarButton  action={()=>{}} />
                </div>

            </div>


        )


    )
}

type SearchBarStyle = {  action: ()=>void, optionalStyle?:string}

 function SearchbarButton( {action, optionalStyle}:SearchBarStyle ){


    const style = useState({backgroundColor:""})

    const timout = () =>{

        setTimeout(() => {
            style[1]({backgroundColor:""})
            setTimeout(() => {
                action()
            }, 50); // 1000 milliseconds equals 1 second
        }, 60); // 1000 milliseconds equals 1 second
    }

    return(
        <button onMouseLeave={()=> style[1]({backgroundColor:""})} onMouseDown={()=> style[1]({backgroundColor:"#F1F1F1"})} onMouseUp={()=>timout()} className={`border border-[#E5E5E5] px-2 p-[2px]  rounded-r text-sm bg-white text-black ${optionalStyle}`} style={style[0]}>
            <IoIosSearch />
        </button>

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

                { projectsQuery.data ? (
                    <Table cols={[
                        {name:"id", width: "w-10"},
                        {name:"name",width: "w-32"},
                        {name:"company_id",width: "w-32"}
                    ]} content={projectsQuery.data.resp} queryKey={"selectedProjects"} selectedArray={selectedProjects}/>
                ):(
                    <div className={"w-full h-full flex justify-center grid content-center"}>
                        <CircularProgress />
                    </div>
                )}

            </div>
        )
    )
}