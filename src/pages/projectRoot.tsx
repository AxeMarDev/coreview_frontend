import {useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";
import {ReactNode, useState} from "react"
import ProjectHeader from "../components/projectHeader.tsx";
import {useLocation} from "react-router-dom";
import GnattChart from "../components/gnattChart.tsx";


export default function ProjectRoot(){

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || "undef";

    const [ modalNode, setModalNode ] = useState<ReactNode>(<></>)
    const project = useQuery({
        queryKey: ["project"],
        queryFn: ()=>API.getProject( id),
    })



    const [ inModal , setInModal ] = useState(false)
    const [ loadingTagDelete , setLoadingTagDelete] = useState(false)

    return(
        project.data &&
        <div className={"flex flex-col  p-5"}>

            { inModal && (
                <div className={" flex justify-center grid content-center p-5 fixed top-0 left-0 z-50  w-screen h-screen bg-black/70 "}>
                    {modalNode}
                </div>
            )}

            <ProjectHeader setLoadingTagDelete={setLoadingTagDelete} setModalNode={setModalNode} setInModal={setInModal} loadingTagDelete={loadingTagDelete}/>
            <GnattChart/>
        </div>

    )
}