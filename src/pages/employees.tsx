import Table from "../components/table.tsx";
import Title from "../components/title.tsx";
import API, { tEmployee} from "../API/api.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useLayoutEffect, useState} from "react";
import { Outlet, useLocation, useNavigate} from "react-router-dom";
import { selectedEmployees} from "../assets/ReactQueryStore.ts";



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

    const selectEmployeeQuery = useQuery({
        queryKey: ["selectEmployees"],
        queryFn: () => selectedEmployees
    })

    const employeeQuery = useQuery({
        queryKey: ["employees"],
        queryFn: API.getEmployees
    })


    const deselectAllMutation = useMutation({
        mutationFn: () => {

            return new Promise<void>((resolve) => {

                selectedEmployees.splice(0, selectedEmployees.length);  //
                resolve();
            });
        },
        onSuccess: ()=> {
            QueryClient.resetQueries({queryKey:["selectEmployees"]})
        },
    })

    const selectAllMutation = useMutation({
        mutationFn: (employees:tEmployee[]) => {

            return new Promise<void>((resolve) => {

                selectedEmployees.splice(0, selectedEmployees.length);
                employees.map( item => selectedEmployees.push( item.id) )

                resolve();
            });
        },
        onSuccess: ()=> {
            QueryClient.resetQueries({queryKey:["selectEmployees"]})
        },
    })

    return(

        selectEmployeeQuery.data && (
            <div className={" flex flex-row content-center py-1 gap-1 rounded "}>
                { selectEmployeeQuery.data.length === 0 && ( <OptionsbarButtonStyle title={"add"} action={ ()=>navigate("/coreview/employees/add")}/>)}
                { selectEmployeeQuery.data.length !== employeeQuery.data?.resp.length && ( <OptionsbarButtonStyle title={"select all"} action={()=>selectAllMutation.mutate(employeeQuery.data && employeeQuery.data.resp || [])}/> )}
                { selectEmployeeQuery.data.length !== 0 && ( <OptionsbarButtonStyle title={"delete"} action={()=>navigate("/coreview/employees/delete")}/> )}
                { selectEmployeeQuery.data.length !== 0 && ( <OptionsbarButtonStyle title={"deselect"} action={()=>deselectAllMutation.mutate()}/> )}
                { selectEmployeeQuery.data.length === 1 && ( <OptionsbarButtonStyle title={"edit"} action={()=>{}}/> )}
            </div>
        )
    )
}


export default function Employees(){


    const location = useLocation()
    const navigate = useNavigate()
    const [ inOutlet, setInOutlet ] = useState(false)


    useLayoutEffect(() => {
        if ( location.pathname !== "/coreview/employees"){
            setInOutlet(true)
        } else{
            setInOutlet(false)
        }
    }, [location,navigate]);


    const employeeQuery = useQuery({
        queryKey: ["employees"],
        queryFn: API.getEmployees
    })

    return(
        inOutlet ?(
            <Outlet/>
        ):(
            <div className={"w-full h-full flex flex-col "}>
                <Title > Employees </Title>

                <OptionsBar/>

                { employeeQuery.data && (
                    <Table<tEmployee> cols={[
                        {name:"id", width: "w-10"},
                        {name:"name",width: "w-32"},
                        {name:"username",width: "w-32"},
                        {name:"email",width: "w-32"},
                        {name:"phone",width: "w-32"},
                    ]} content={employeeQuery.data.resp } queryKey={"selectEmployees"} selectedArray={ selectedEmployees }/>
                )}

            </div>
        )
    )

}