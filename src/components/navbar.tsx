import {Link, useLocation} from "react-router-dom";
import {ReactNode, useEffect, useState} from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { FaBox } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";
import Cookies from "js-cookie";


function CompanyLabel(){

    const value:{id:string, company_name:string,jwt:string} = JSON.parse(Cookies.get('id') || "{}"); // returns 'value' if the cookie exists


    return(
        <div className={"rounded bg-[#212121]  mb-1 p-2 flex flex-row"}>
            <div className={"rounded bg-blue-500 w-10 h-10 mr-2"}></div>
            <div className={"text-sm"}>
                <p>{value.id}</p>
                <p className={"text-white/60"}>{value.company_name}</p>
            </div>
        </div>
    )
}

function NavbarDivider(){
    return(
        <div className={"bg-[#212121] h-[2px] w-full my-1"}/>
    )
}

type propsNavBarButton = { to: string, label:string, icon:ReactNode, children?:ReactNode}
function NavBarButton({to, label, icon}:propsNavBarButton){

    const location = useLocation()
    const [active, setActive ] = useState(false)
    const style = useState({backgroundColor:""})

    const timout = () =>{

        setTimeout(() => {
            style[1]({backgroundColor:""})

        }, 60); // 1000 milliseconds equals 1 second
    }

    useEffect(() => {
        if( location.pathname === to){
            setActive(true)
        } else{
            setActive(false )
        }
    }, [location]);

    return(
        <Link to={to} >
            <div onMouseUp={()=>timout()} onMouseDown={()=> style[1]({backgroundColor:"#2f2f2f"})} onMouseLeave={()=> style[1]({backgroundColor:""})} style={style[0]} className={`flex text-sm flex-row my-1 p-2 ${ active ? "bg-[#212121] text-white" : "text-[#767676]"} rounded hover:bg-[#212121]`}>
                <div className={"grid content-center mr-3"}>
                    {icon}
                </div>
                {label}
            </div>
        </Link>
    )
}


type propsSubmenu = { pathPrefix:string, label:string, icon:ReactNode, children?:ReactNode}
function SubMenu({pathPrefix,label,icon,children}:propsSubmenu){

    const location = useLocation()
    const [active, setActive ] = useState(false)

    useEffect(() => {
        console.log(location.pathname)
        if(  location.pathname.substring(0,pathPrefix.length ) === pathPrefix){
            setActive(true)
        } else{
            setActive(false )
        }
    }, [location]);
    return(
        !active ? (
            <Link to={pathPrefix}>
                <div  className={`flex flex-row text-sm p-2 ${ active ? "bg-[#212121] text-white" : "text-[#767676]"} rounded hover:bg-[#212121]`}>
                    <div className={"grid content-center mr-3"}>
                        {icon}
                    </div>
                    {label}
                </div>
            </Link>
        ):(
            <div className={"flex flex-col"}>
                <div className={`flex flex-row text-sm p-2 ${ active ? "bg-[#212121] text-white" : "text-[#767676]"} rounded-t hover:bg-[#212121]`}>
                    <div className={"grid content-center mr-3"}>
                        {icon}
                    </div>
                    {label}
                </div>
                <div className={"h-[2px] bg-[#171717]"}/>
                <div className={`flex flex-col space-y-1  p-2 ${ active ? "bg-[#212121] text-white" : "text-[#767676]"} rounded-b hover:bg-[#212121]`}>
                    {children}
                </div>
            </div>
        )
    )
}

type propsSubMenuButton = { to: string, label:string, icon:ReactNode}

function SubMenuButton({to,label,icon}:propsSubMenuButton){
    const location = useLocation()
    const [active, setActive ] = useState(false)

    useEffect(() => {
        console.log(location.pathname)
        if( location.pathname === to){
            setActive(true)
        } else{
            setActive(false )
        }
    }, [location]);

    return(
        <Link to={to} >
            <div className={`flex flex-row text-sm p-2 ${ active ? "bg-[#464646] text-white" : "text-[#767676]"} rounded hover:bg-[#464646]`}>
                <div className={"grid content-center mr-3"}>
                    {icon}
                </div>
                {label}
            </div>
        </Link>
    )
}

export default function Navbar(){


    return(
        <div className={" flex flex-col h-screen p-3"}>
            <div className={" flex flex-col  h-full w-48 "}>
                <CompanyLabel/>
                <NavBarButton to={"/coreview"} label={"Dashboard"} icon={<MdHomeFilled/>} />
                <NavbarDivider/>
                <NavBarButton to={"/coreview/clients"} label={"Clients"} icon={<IoPersonCircle/>} />
                <NavBarButton to={"/coreview/projects"} label={"Projects"} icon={<FaBox/>} />
                <NavBarButton to={"/coreview/templates"} label={"Templates"} icon={<IoIosPaper/>} />
                <NavbarDivider/>
                <NavBarButton to={"/coreview/employees"} label={"Employees"} icon={<FaBox/>} />
                <SubMenu pathPrefix={"/coreview/settings"} label={"Settings"} icon={<FaBox/>} >
                    <SubMenuButton to={"/coreview/settings"} label={"Overview"} icon={<FaBox/>} />
                    <SubMenuButton to={"/coreview/settings/theme"} label={"Theme"} icon={<FaBox/>} />
                    <SubMenuButton to={"/coreview/settings/billing"} label={"Billing"} icon={<FaBox/>} />
                </SubMenu>
            </div>
        </div>
    )
}