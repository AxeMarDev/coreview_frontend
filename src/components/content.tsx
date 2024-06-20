import {ReactNode} from "react";

type propsContent = { children: ReactNode}
export default function Content({children}:propsContent){
    return(
        <div className={"bg-[#F1F1F1] p-5 flex w-full overflow-y-scroll"}>
             {children}
        </div>
    )
}