import Table from "../components/table.tsx";
import Title from "../components/title.tsx";
import API, {tClient} from "../API/api.ts";
import { useQuery} from "@tanstack/react-query";
import { useLayoutEffect, useState} from "react";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";


export default function Clients(){

    const clientsQuery = useQuery({
        queryKey: ["clients"],
        queryFn: API.getClients
    })

    const [ inOutlet, setInOutlet ] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if ( location.pathname !== "/coreview/clients"){
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
                <Title> Clients </Title>

                <Link to={"/coreview/clients/add"}>add </Link>

                { clientsQuery.data && (
                    <Table<tClient> cols={[
                        {name:"id", width: "w-32"},
                        {name:"company_id", width: "w-32"},
                        {name:"name",width: "w-32"},
                        {name:"email",width: "w-32"}
                    ]} content={clientsQuery.data.resp }/>
                )}

            </div>
        )
    )
}