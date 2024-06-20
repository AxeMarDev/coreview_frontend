import Title from "../components/title.tsx";
import Table from "../components/table.tsx";
import { useQuery}  from "@tanstack/react-query";
import API from "../API/api.ts";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useLayoutEffect, useState} from "react";
import {selectedProjects} from "../assets/ReactQueryStore.ts";


export default function Projects(){


    const projectsQuery = useQuery({
        queryKey: ["projects"],
        queryFn: API.getProjects
    })

    const [ inOutlet, setInOutlet ] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if ( location.pathname !== "/coreview/projects"){
            setInOutlet(true)
        } else{
            setInOutlet(false)
        }
    }, [location,navigate]);

    return(
        inOutlet ?(
            <Outlet/>
        ):(
            <div className={"w-full h-full flex flex-col text-blue-500"}>
                <Title> Projects </Title>

                <Link to={"/coreview/projects/add"}>add</Link>

                { projectsQuery.data && (
                    <Table cols={[
                        {name:"id", width: "w-10"},
                        {name:"name",width: "w-32"},
                        {name:"company_id",width: "w-32"}
                    ]} content={projectsQuery.data.resp} queryKey={"selectedProjects"} selectedArray={selectedProjects}/>
                )}

            </div>
        )
    )
}