import {OptionsbarButtonStyle} from "../pages/clients.tsx";
import Table from "./table.tsx";
import API, {tClient} from "../API/api.ts";
import {selectedClientsInProject} from "../assets/ReactQueryStore.ts";
import {CircularProgress} from "@mui/material";
import { useQuery} from "@tanstack/react-query";
import React from "react";
import {useMutation} from "@tanstack/react-query";
import {useQueryClient} from "@tanstack/react-query";
import {useLocation} from "react-router-dom";





type propsProjectAddClients = {setInModal: React.Dispatch<React.SetStateAction<boolean>>}
export default function ProjectAddClients({setInModal}:propsProjectAddClients){

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || "undef";

    const QueryClient = useQueryClient()

    const selectClientsInProjectQuery = useQuery({
        queryKey: ["selectedClientsProjects"],
        queryFn: () => selectedClientsInProject
    })

    const clientsQuery = useQuery({
        queryKey: ["clients"],
        queryFn: API.getClients
    })

    const deselectAllMutation = useMutation({
        mutationFn: () => {

            return new Promise<void>((resolve) => {

                selectedClientsInProject.splice(0, selectedClientsInProject.length);  //
                resolve();
            });
        },
        onSuccess: ()=> {
            QueryClient.resetQueries({queryKey:["selectedClientsProjects"]})
        },
    })


    const addClientsToProjectMutation = useMutation({
        mutationFn: async () => {
            if( selectClientsInProjectQuery.data){
                await Promise.all(
                    selectClientsInProjectQuery.data.map(async (clientId) => {
                        await API.putClientToProject(id, clientId);
                        console.log(`Completed: ${clientId}`);
                    })
                )
            }
        },
        onSuccess: () => {
            deselectAllMutation.mutate()
            QueryClient.invalidateQueries({queryKey: ["projectclients"]})
            setInModal(false)
        },
    });


    return(
        <div className={" h-80 bg-white p-4"}>
            <OptionsbarButtonStyle title={"back"} action={()=>setInModal(false)}/>
            <div>
                { clientsQuery.data ? (
                    <Table<tClient> cols={[
                        {name:"id", width: "w-10"},
                        {name:"company_id", width: "w-32"},
                        {name:"name",width: "w-32"},
                        {name:"email",width: "w-56"}
                    ]} content={clientsQuery.data.resp } queryKey={"selectedClientsProjects"} selectedArray={ selectedClientsInProject }/>
                ):(
                    <div className={"w-full h-full flex justify-center grid content-center"}>
                        <CircularProgress />
                    </div>
                )}
            </div>

            <OptionsbarButtonStyle title={"add"} action={addClientsToProjectMutation.mutate}/>
        </div>
    )
}