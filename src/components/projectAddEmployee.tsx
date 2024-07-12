import {OptionsbarButtonStyle} from "../pages/clients.tsx";
import Table from "./table.tsx";
import API, {tClient} from "../API/api.ts";
import {selectedEmployeesInProject} from "../assets/ReactQueryStore.ts";
import {CircularProgress} from "@mui/material";
import { useQuery} from "@tanstack/react-query";
import React from "react";
import {useMutation} from "@tanstack/react-query";
import {useQueryClient} from "@tanstack/react-query";
import {useLocation} from "react-router-dom";





type propsProjectAddEmployee = {setInModal: React.Dispatch<React.SetStateAction<boolean>>}
export default function ProjectAddEmployee({setInModal}:propsProjectAddEmployee){

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || "undef";

    const QueryClient = useQueryClient()

    const selectEmployeesInProjectQuery = useQuery({
        queryKey: ["selectedEmployeesProjects"],
        queryFn: () => selectedEmployeesInProject
    })

    const employeesQuery = useQuery({
        queryKey: ["employees"],
        queryFn: API.getEmployees
    })

    const deselectAllMutation = useMutation({
        mutationFn: () => {

            return new Promise<void>((resolve) => {

                selectedEmployeesInProject.splice(0, selectedEmployeesInProject.length);  //
                resolve();
            });
        },
        onSuccess: ()=> {
            QueryClient.resetQueries({queryKey:["selectedEmployeesProjects"]})
        },
    })


    const addEmployeesToProjectMutation = useMutation({
        mutationFn: async () => {
            if( selectEmployeesInProjectQuery.data){
                await Promise.all(
                    selectEmployeesInProjectQuery.data.map(async (employeeId) => {
                        await API.putEmployeeToProject(id, employeeId);
                        console.log(`Completed: ${employeeId}`);
                    })
                );
            }
        },
        onSuccess: () => {
            deselectAllMutation.mutate()
            QueryClient.invalidateQueries({queryKey: ["projectemployees"]})
            setInModal(false)
        },
    });


    return(
        <div className={" h-80 bg-white p-4"}>
            <OptionsbarButtonStyle title={"back"} action={()=>setInModal(false)}/>
            <div>
                { employeesQuery.data ? (
                    <Table<tClient> cols={[
                        {name:"id", width: "w-10"},
                        {name:"company_id", width: "w-32"},
                        {name:"name",width: "w-32"},
                        {name:"email",width: "w-56"}
                    ]} content={employeesQuery.data.resp } queryKey={"selectedEmployeesProjects"} selectedArray={ selectedEmployeesInProject }/>
                ):(
                    <div className={"w-full h-full flex justify-center grid content-center"}>
                        <CircularProgress />
                    </div>
                )}
            </div>

            <OptionsbarButtonStyle title={"add"} action={addEmployeesToProjectMutation.mutate}/>
        </div>
    )
}