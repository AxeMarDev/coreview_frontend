import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";
import {selectedClients} from "../assets/ReactQueryStore.ts";

export default function DeleteClients(){

    const navigate = useNavigate()

    const clientsQuery = useQuery({
        queryKey: ["clients"],
        queryFn: API.getClients
    })

    const selectClientsQuery = useQuery({
        queryKey: ["selectclients"],
        queryFn: () => selectedClients
    })


    return(
        <div>
            <button onClick={()=> navigate("/coreview/clients") }>back</button>
            <div>
                <p> are you sure you want to delete the following, this action is not reversable</p>
                { clientsQuery.data && clientsQuery.data.resp.map(item=>{
                    if(selectClientsQuery.data&& selectClientsQuery.data.includes(item.id)  ){
                        return <p> id: {item.id}, name: {item.name}</p>
                    }

                })}
            </div>
        </div>
    )
}