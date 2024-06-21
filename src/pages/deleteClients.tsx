import {useNavigate} from "react-router-dom";
import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";
import {selectedClients} from "../assets/ReactQueryStore.ts";
import Title from "../components/title.tsx";
import {OptionsbarButtonStyle} from "./clients.tsx";

export default function DeleteClients(){

    const navigate = useNavigate()
    const QueryClient = useQueryClient()

    const clientsQuery = useQuery({
        queryKey: ["clients"],
        queryFn: API.getClients
    })

    const selectClientsQuery = useQuery({
        queryKey: ["selectclients"],
        queryFn: () => selectedClients
    })

    const clientDeleteMutation = useMutation({
        mutationFn: (clientId: string) => API.deleteClient( {id: clientId}),
        onSuccess: ()=>{
            QueryClient.resetQueries({queryKey:["selectclients"]})
            QueryClient.invalidateQueries({queryKey:["clients"]})
        }
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

    const handleDelete = () =>{

        clientsQuery.data && clientsQuery.data.resp.map(item=>{
            if(selectClientsQuery.data&& selectClientsQuery.data.includes(item.id)  ){
                clientDeleteMutation.mutate(item.id)
            }
        })
        deselectAllMutation.mutate()
        navigate("/coreview/clients")

    }


    return(

        <div className={"flex flex-col w-full"}>
            <Title > Clients/delete </Title>
            <div className={"flex h-full justify-center "}>
                <div className={" grid content-center w-80 h-full"}>
                    <div className={"flex flex-col border -mt-32 rounded bg-white p-4 w-80 text-black"}>
                        <div className={" flex flex-row content-center py-1 gap-1 rounded mb-1"}>
                            <OptionsbarButtonStyle action={()=> navigate("/coreview/clients")} title={"back"}/>
                        </div>
                        <div>
                            { clientsQuery.data && clientsQuery.data.resp.map(item=>{
                                if(selectClientsQuery.data&& selectClientsQuery.data.includes(item.id)  ){
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