import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ReactNode, useLayoutEffect, useState} from "react";
import { IoIosArrowBack } from "react-icons/io";
import CVlogo from "../assets/CVllogo.png"
import { RiHomeFill } from "react-icons/ri";
import { RiMessage2Fill } from "react-icons/ri";
import { FaBox } from "react-icons/fa";
import {useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";
import {CircularProgress} from "@mui/material";


type propsOptionBarStyle = { action: ()=>void, optionalStyle?:string}
export function OptionsbarButtonStyle( {action, optionalStyle}:propsOptionBarStyle){


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
        <button onMouseLeave={()=> style[1]({backgroundColor:""})} onMouseDown={()=> style[1]({backgroundColor:"#252525"})} onMouseUp={()=>timout()}
                className={` p-[2px] px-4   text-sm  h-full ${optionalStyle}`} style={style[0]}>
            <IoIosArrowBack />
        </button>

    )
}


type TabButtomProps = { title:string, to:string, icon:ReactNode}
function TabButton({title, to, icon}:TabButtomProps){

    const navigate = useNavigate()
    const location = useLocation()

    const [buttonActive, setButtonActive] = useState(false)

    useLayoutEffect(() => {

        console.log(location.pathname)
        console.log(to)
        if(location.pathname === to){
            setButtonActive(true)
        } else{
            setButtonActive(false)
        }

    }, [navigate]);
    return(
        <button className={`flex flex-row  grid content-center  gap-2`} onMouseUp={()=>navigate(to)}>
            <div className={` ${ buttonActive ? ("bg-[#2B2B2B] "): ("bg-[#212121] text-[#7F7E7E]")} p-2  rounded flex flex-row `}>
                {icon}
                <p className={"text-sm"}>{title}</p>
            </div>
        </button>
    )
}

export default function Project(){

    const navigate = useNavigate()

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || "undef";

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


    return(
        <>
            { (project.data && projectClients.data && projectEmployee.data  )&& (
                <div className={"flex flex-col w-full pt-12 grid "}>
                    <div className={"flex w-full h-12 bg-[#171717] fixed top-0 text-white flex flex-row justify-between"}>
                        <div className={"flex flex-row "}>
                            <div className={"flex flex-row"}>
                                <OptionsbarButtonStyle action={()=>navigate("/coreview/projects")}/>
                                <div className={"w-[2px] bg-[#2B2B2B]"}/>
                            </div>

                            {/*<div className={" flex flex-row grid content-center mr-10"}>*/}
                            {/*    <p className={" font-medium ml-2"} >Projects </p>*/}
                            {/*</div>*/}
                            <div className={"flex flex-row gap-2 pl-2"}>
                                <TabButton title={"Home"} to={`/coreview/projects/open?id=${id}`} icon={<RiHomeFill className={"pt-1 mr-1"}/>}/>
                                <TabButton title={"Files"} to={`/coreview/projects/open/files?id=${id}`} icon={<FaBox className={"pt-1 mr-1"}/>}/>
                            </div>
                        </div>

                        <div className={"flex flex-row"}>
                            <div className={"flex flex-row gap-2 pr-2"}>
                                <TabButton title={"Messages"} to={`/coreview/projects/open/messages?id=${id}`} icon={<RiMessage2Fill className={"pt-1 mr-1"}/>}/>
                            </div>
                            <div className={"w-[2px] bg-[#2B2B2B]"}/>
                            <div className={" flex flex-row grid content-center mx-1"}>
                                <img className={"h-10"} src={CVlogo}/>
                            </div>
                        </div>

                    </div>
                    <Outlet/>
                </div>
            )}
            { project.isLoading && (
                <div className={"bg-[#171717] w-screen h-screen flex justify-center grid content-center"}>
                    <CircularProgress />
                </div>
            )}
        </>




    )
}