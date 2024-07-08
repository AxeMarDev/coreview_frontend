import Table from "../components/table.tsx";
import Title from "../components/title.tsx";
import API, {tClient} from "../API/api.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useLayoutEffect, useState} from "react";
import { Outlet, useLocation, useNavigate} from "react-router-dom";
import {selectedClients} from "../assets/ReactQueryStore.ts";
import {CircularProgress} from "@mui/material";



type propsOptionBarStyle = { title:string, action: ()=>void, optionalStyle?:string}
export function OptionsbarButtonStyle( {title,action, optionalStyle}:propsOptionBarStyle){


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
        <button onMouseLeave={()=> style[1]({backgroundColor:""})} onMouseDown={()=> style[1]({backgroundColor:"#F1F1F1"})} onMouseUp={()=>timout()} className={`border border-[#E5E5E5] p-[2px] px-3 rounded text-sm bg-white text-black ${optionalStyle}`} style={style[0]}>
            {title}
        </button>

    )
}


export function OptionsBar(){

    const navigate = useNavigate()
    const QueryClient = useQueryClient()

    const selectClientsQuery = useQuery({
        queryKey: ["selectclients"],
        queryFn: () => selectedClients
    })

    const clientsQuery = useQuery({
        queryKey: ["clients"],
        queryFn: API.getClients
    })


    const deselectAllMutation = useMutation({
        mutationFn: () => {

            return new Promise<void>((resolve) => {

                selectedClients.splice(0, selectedClients.length);  //
                resolve();
            });
        },
        onSuccess: ()=> {
            QueryClient.resetQueries({queryKey:["selectclients"]})
        },
    })

    const selectAllMutation = useMutation({
        mutationFn: (clients:tClient[]) => {

            return new Promise<void>((resolve) => {

                selectedClients.splice(0, selectedClients.length);
                clients.map( item => selectedClients.push( item.id) )

                resolve();
            });
        },
        onSuccess: ()=> {
            QueryClient.resetQueries({queryKey:["selectclients"]})
        },
    })

    return(

        selectClientsQuery.data && (
            <div className={" flex flex-row content-center py-1 gap-1 rounded "}>
                    { selectClientsQuery.data.length === 0 && ( <OptionsbarButtonStyle title={"add"} action={ ()=>navigate("/coreview/clients/add")}/>)}
                    { selectClientsQuery.data.length !== clientsQuery.data?.resp.length && ( <OptionsbarButtonStyle title={"select all"} action={()=>selectAllMutation.mutate(clientsQuery.data && clientsQuery.data.resp || [])}/> )}
                    { selectClientsQuery.data.length !== 0 && ( <OptionsbarButtonStyle title={"delete"} action={()=>navigate("/coreview/clients/delete")}/> )}
                    { selectClientsQuery.data.length !== 0 && ( <OptionsbarButtonStyle title={"deselect"} action={()=>deselectAllMutation.mutate()}/> )}
                    { selectClientsQuery.data.length === 1 && ( <OptionsbarButtonStyle title={"edit"} action={()=>{}}/> )}
            </div>
        )
    )
}


export default function Clients(){


    const location = useLocation()
    const navigate = useNavigate()
    const [ inOutlet, setInOutlet ] = useState(false)


    useLayoutEffect(() => {
        if ( location.pathname !== "/coreview/clients"){
            setInOutlet(true)
        } else{
            setInOutlet(false)
        }
    }, [location,navigate]);


    const clientsQuery = useQuery({
        queryKey: ["clients"],
        queryFn: API.getClients
    })

    return(
        inOutlet ?(
            <Outlet/>
        ):(
            <div className={"w-full h-full flex flex-col "}>
                <Title > Clients </Title>

                <OptionsBar/>

                { clientsQuery.data ? (
                    <Table<tClient> cols={[
                        {name:"id", width: "w-10"},
                        {name:"company_id", width: "w-32"},
                        {name:"name",width: "w-32"},
                        {name:"email",width: "w-56"}
                    ]} content={clientsQuery.data.resp } queryKey={"selectclients"} selectedArray={ selectedClients }/>
                ):(
                    <div className={"w-full h-full flex justify-center grid content-center"}>
                        <CircularProgress />
                    </div>
                )}

            </div>
        )
    )

}