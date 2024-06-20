import {useNavigate} from "react-router-dom";
import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";
import {selectedClients} from "../assets/ReactQueryStore.ts";
import Title from "../components/title.tsx";

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
        <div>
            <Title > Clients/delete </Title>
            <button onClick={()=> navigate("/coreview/clients") }>back</button>
            <div>
                <p> are you sure you want to delete the following, this action is not reversable</p>
                { clientsQuery.data && clientsQuery.data.resp.map(item=>{
                    if(selectClientsQuery.data&& selectClientsQuery.data.includes(item.id)  ){
                        return <p> id: {item.id}, name: {item.name}</p>
                    }
                })}
            </div>
            <button onClick={()=>handleDelete()}> delete</button>
        </div>
    )
}