import Table from "../components/table.tsx";
import Title from "../components/title.tsx";
import API, {tClient} from "../API/api.ts";
import { useQuery} from "@tanstack/react-query";
import { useLayoutEffect, useState} from "react";
import { Outlet, useLocation, useNavigate} from "react-router-dom";
import {selectedClients} from "../assets/ReactQueryStore.ts";



type propsOptionBarStyle = { title:string, action: ()=>void}
function OptionsbarButtonStyle( {title,action}:propsOptionBarStyle){


    const style = useState({backgroundColor:""})

    const timout = () =>{
        style[1]({backgroundColor:"blue"})
        setTimeout(() => {
            style[1]({backgroundColor:""})
            setTimeout(() => {
                action()
            }, 50); // 1000 milliseconds equals 1 second
        }, 60); // 1000 milliseconds equals 1 second
    }

    return(
        <button onClick={()=>timout()} className={"bg-stone-700 p-1 px-3 rounded mb-2 "} style={style[0]}>
            {title}
        </button>

    )
}



function OptionsBar(){

    const navigate = useNavigate()


    const selectClientsQuery = useQuery({
        queryKey: ["selectclients"],
        queryFn: () => selectedClients
    })

    return(
        <div className={"flex flex-row gap-3"}>
            { selectClientsQuery.data && (
                <div>
                    { selectClientsQuery.data.length === 0 && ( <OptionsbarButtonStyle title={"add"} action={ ()=>navigate("/coreview/clients/add")}/>)}
                    { selectClientsQuery.data.length === 0 && ( <OptionsbarButtonStyle title={"select all"} action={()=>{}}/> )}
                    { selectClientsQuery.data.length !== 0 && ( <OptionsbarButtonStyle title={"delete"} action={()=>navigate("/coreview/clients/delete")}/> )}
                    { selectClientsQuery.data.length !== 0 && ( <OptionsbarButtonStyle title={"deselect"} action={()=>{}}/> )}
                    { selectClientsQuery.data.length === 1 && ( <OptionsbarButtonStyle title={"edit"} action={()=>{}}/> )}
                </div>
            )}

        </div>
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
                <Title> Clients </Title>

                <OptionsBar/>

                { clientsQuery.data && (
                    <Table<tClient> cols={[
                        {name:"id", width: "w-32"},
                        {name:"company_id", width: "w-32"},
                        {name:"name",width: "w-32"},
                        {name:"email",width: "w-32"}
                    ]} content={clientsQuery.data.resp } queryKey={"selectclients"} selectedArray={selectedClients}/>
                )}

            </div>
        )
    )

}