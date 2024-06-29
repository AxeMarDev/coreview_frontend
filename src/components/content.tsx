import {ReactNode} from "react";
import {useLocation} from "react-router-dom";

type propsContent = { children: ReactNode}
export default function Content({children}:propsContent){

    const location = useLocation()

    return(
        <div className={`bg-[#F1F1F1] ${location.pathname !== "/coreview/c" ? ("p-5"):("")} flex w-full overflow-y-scroll`}>
             {children}
        </div>
    )
}