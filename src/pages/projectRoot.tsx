import {useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";
import {useLocation} from "react-router-dom";
import {OptionsbarButtonStyle} from "./clients.tsx";
import {useState} from "react"
import ProjectAddClients from "../components/projectAddClients.tsx";
import ProjectAddEmployee from "../components/projectAddEmployee.tsx";
import NameTag from "../components/nameTag.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export default function ProjectRoot(){

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || "undef";

    const [ modalNode, setModalNode ] = useState(<></>)
    const QueryClient = useQueryClient()
    const project = useQuery({
        queryKey: ["project"],
        queryFn: ()=>API.getProject( id)
    })


    const projectClients = useQuery({
        queryKey: ["projectclients"],
        queryFn: ()=>API.getProjectClients(id)
    })


    const projectEmployee = useQuery({
        queryKey: ["projectemployees"],
        queryFn: ()=>API.getProjectEmployees(id)
    })

    const deleteEmployeeFromProjec = useMutation({
        mutationFn: (employeeId:string) => API.deleteEmployeeFromProject(id,employeeId),
        onSuccess: () => QueryClient.invalidateQueries({queryKey: ["projectemployees"]}),
    });


    const [ inModal , setInModal ] = useState(false)

    return(
        project.data &&
        <div className={"flex flex-col  p-5"}>

            { inModal && (
                <div className={" flex justify-center grid content-center p-5 fixed top-0 left-0 z-50  w-screen h-screen bg-black/70 "}>

                    {modalNode}
                </div>

            )}

            <p className={"text-black"}>{ project.data.resp.name } </p>
            <div className={"pb-20 grid grid-cols-2 gap-3 "}>
                <div className={ "border border-[#E5E5E5]  text-[#616161] text-sm    rounded-lg "}>
                    <p className={"py-1 pl-2"}>Media</p>
                    <div className={"bg-white h-64 rounded-b-lg"}>
                        <p className={"text-black p-1 "}> #content# </p>
                    </div>
                </div>

                <div className={ "border border-[#E5E5E5]  text-[#616161] text-sm  rounded-lg "}>
                    <p className={"py-1 pl-2"}>Messages</p>
                    <div className={"bg-white h-64 rounded-b-lg"}>
                        <p className={"text-black p-1 "}> #content# </p>
                    </div>
                </div>

                <div className={ "border border-[#E5E5E5]  text-[#616161] text-sm rounded-lg "}>
                    <p className={"py-1 pl-2"}>Finance</p>
                    <div className={"bg-white h-64 rounded-b-lg"}>
                        <p className={"text-black p-1 "}> #content# </p>
                    </div>
                </div>

                <div className={ "border border-[#E5E5E5]  text-[#616161] text-sm   rounded-lg "}>
                    <p className={"py-1 pl-2"}>Content</p>
                    <div className={"bg-white h-64 rounded-b-lg"}>
                        <p className={"text-black p-1 "}> #content# </p>
                    </div>
                </div>

                <div className={ "border border-[#E5E5E5]  text-[#616161] text-sm   rounded-lg "}>
                    <p className={"py-1 pl-2"}>People</p>
                    <div className={"bg-white h-64 rounded-b-lg p-2"}>
                        <OptionsbarButtonStyle title={"add"} action={()=>{
                            setModalNode(  <ProjectAddClients setInModal={setInModal}/> )
                            setInModal(true)
                        }}/>
                        { projectClients.data && (
                            <div>
                                <p>- Clients</p>
                                {projectClients.data.resp.map((client)=>(
                                    <NameTag label={client.name} action={()=>console.log("not done")}/>
                                ))}
                            </div>
                        )}
                        <OptionsbarButtonStyle title={"add"} action={()=>{
                            setModalNode(  <ProjectAddEmployee setInModal={setInModal}/> )
                            setInModal(true)
                        }}/>
                        { projectEmployee.data && (
                            <div>
                                <p>- Employee</p>
                                <div className={"flex w-full  gap-2 flex flex-wrap"}>
                                    {projectEmployee.data.resp.map((employee)=>(
                                        <NameTag label={employee.name} action={ ()=>deleteEmployeeFromProjec.mutate(employee.id)}/>
                                    ))}
                                </div>

                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>

    )
}