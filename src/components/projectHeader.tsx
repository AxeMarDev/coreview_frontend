import {LinearProgress} from "@mui/material";
import ProjectAddClients from "./projectAddClients.tsx";
import NameTag from "./nameTag.tsx";
import ProjectAddEmployee from "./projectAddEmployee.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";
import {useLocation} from "react-router-dom";
import React, {ReactNode} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {AddTag} from "./nameTag.tsx";
import HeaderField from "./headerField.tsx";


type propsProjectHeader = {
    loadingTagDelete:boolean,
    setLoadingTagDelete:React.Dispatch<React.SetStateAction<boolean>>,
    setInModal:React.Dispatch<React.SetStateAction<boolean>>
    setModalNode:React.Dispatch<React.SetStateAction<ReactNode>>
}
export default function ProjectHeader({loadingTagDelete,setLoadingTagDelete,setInModal,setModalNode}:propsProjectHeader){

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || "undef";

    const QueryClient = useQueryClient()

    const project = useQuery({
        queryKey: ["project"],
        queryFn: ()=>API.getProject( id)
    })

    const projectClients = useQuery({
        queryKey: ["projectclients"],
        queryFn: ()=>API.getProjectClients(id).finally(()=>setLoadingTagDelete(false))
    })


    const projectEmployee = useQuery({
        queryKey: ["projectemployees"],
        queryFn: ()=>API.getProjectEmployees(id).finally(()=>setLoadingTagDelete(false))
    })

    const deleteEmployeeFromProject = useMutation({
        mutationFn: (employeeId:string) => API.deleteEmployeeFromProject(id,employeeId),
        onSuccess: () => {
            QueryClient.invalidateQueries({queryKey: ["projectemployees"]})
        },
    });

    const deleteClientFromProject = useMutation({
        mutationFn: (clientId:string) => API.deleteClientFromProject(id,clientId),
        onSuccess: () =>{
            QueryClient.invalidateQueries({queryKey: ["projectclients"]})
        } ,
    });

    const updateProjectName = useMutation({
        mutationFn: ( props:{projectId:string, newName:string}) => API.updateProjectName(props.projectId,props.newName),
        onSuccess: () =>{
            QueryClient.invalidateQueries({queryKey: ["project"]})
        } ,
    });


    return(
        <div className={ "border border-[#E5E5E5]  text-[#616161] text-sm   rounded-lg "}>
            <div className={"flex justify-between"}>
                <p className={"py-1 pl-2"}>Overview</p>

                <div className={" grid content-end"}>
                    <div className={"py-1 mr-2 bg-green-800 rounded h-6 grid content-center text-green-400 border border-green-400"}>
                        <p className={"px-1"}>Connected</p>
                    </div>
                </div>

            </div>

            <div className={"h-1"}>
                { loadingTagDelete && <LinearProgress />}
            </div>
            <div className={"bg-white h-64 rounded-b-lg p-2"}>
                <div className={"flex flex-row gap-4"}>
                    {project.data && <HeaderField field={project.data.resp.name} fieldName={"Project Name"} updateable action={(field:string)=>updateProjectName.mutate({projectId:id, newName:field})}/> }
                    {project.data && <HeaderField field={project.data.resp.id} fieldName={"Project Id"}/> }
                    {project.data && <HeaderField field={`${project.data.resp.company_id}`} fieldName={"Company Id"}/> }

                </div>
                { projectClients.data && (
                    <div>
                        <p>- Clients</p>
                        <div className={"flex w-full  gap-2 flex flex-wrap"}>
                            {projectClients.data.resp.map((client)=>(
                                <NameTag label={client.name} action={()=>{setLoadingTagDelete(true);deleteClientFromProject.mutate(client.id)}}/>
                            ))}
                            <AddTag label={"+"} action={()=>{
                                setModalNode(  <ProjectAddClients setInModal={setInModal}/> )
                                setInModal(true)
                            }}/>
                        </div>
                    </div>
                )}
                { projectEmployee.data && (
                    <div>
                        <p>- Employee</p>
                        <div className={"flex w-full  gap-2 flex flex-wrap"}>
                            {projectEmployee.data.resp.map((employee)=>(
                                <NameTag label={employee.name} action={ ()=>{setLoadingTagDelete(true); deleteEmployeeFromProject.mutate(employee.id)}}/>
                            ))}
                            <AddTag label={"+"} action={()=>{
                                setModalNode(  <ProjectAddEmployee setInModal={setInModal}/> )
                                setInModal(true)
                            }}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}