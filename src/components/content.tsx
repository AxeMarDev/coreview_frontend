import {ReactNode} from "react";
import {useLocation} from "react-router-dom";

type propsContent = { children: ReactNode}




export default function Content({children}:propsContent){

    const location = useLocation()

    return(
        <div className={`bg-[#F1F1F1] ${ (
            (location.pathname.substring(0,11) === "/coreview/c" && ( (location.pathname.length === 11) || (location.pathname[12] === "/") ))  || 
            (location.pathname.substring(0,23) === "/coreview/projects/open")) 
            ? (""):("p-5")} flex w-full overflow-y-scroll`}>

             {children}
        </div>
    )
}