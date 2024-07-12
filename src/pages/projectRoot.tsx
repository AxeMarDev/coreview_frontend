import {useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";
import {useLocation} from "react-router-dom";
import {ReactNode, useState} from "react"
import ProjectHeader from "../components/projectHeader.tsx";


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

            <p className={"text-black"}>{ project.data.resp.name } </p>
            <ProjectHeader setLoadingTagDelete={setLoadingTagDelete} setModalNode={setModalNode} setInModal={setInModal} loadingTagDelete={loadingTagDelete}/>
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
            </div>
        </div>

    )
}