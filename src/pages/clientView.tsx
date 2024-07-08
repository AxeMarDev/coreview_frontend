import {RiHomeFill, RiMessage2Fill} from "react-icons/ri";
import {FaBox} from "react-icons/fa";
import CVlogo from "../assets/CVllogo.png";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ReactNode, useLayoutEffect, useState} from "react";


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


export default function ClientView(){

    return(
        <div className={"flex flex-col w-full pt-12 grid "}>
            <div className={"flex w-full h-12 bg-[#171717] fixed top-0 text-white flex flex-row justify-between"}>

                <div className={"flex flex-row "}>
                    <div className={"flex flex-row w-12 justify-end"}>
                        <div className={"w-[2px] bg-[#2B2B2B]"}/>
                    </div>

                    <div className={"flex flex-row gap-2 pl-2"}>
                        <TabButton title={"Home"} to={"/coreview/c"} icon={<RiHomeFill className={"pt-1 mr-1"}/>}/>
                        <TabButton title={"Files"} to={"/coreview/c/files"} icon={<FaBox className={"pt-1 mr-1"}/>}/>
                    </div>
                </div>

                <div className={"flex flex-row"}>
                    <div className={"flex flex-row gap-2 pr-2"}>
                        <TabButton title={"Messages"} to={"/coreview/c/messages"} icon={<RiMessage2Fill className={"pt-1 mr-1"}/>}/>
                    </div>
                    <div className={"w-[2px] bg-[#2B2B2B]"}/>
                    <div className={" flex flex-row grid content-center mx-1"}>
                        <img className={"h-10"} src={CVlogo}/>
                    </div>
                </div>

            </div>
            <Outlet/>
        </div>
    )
}