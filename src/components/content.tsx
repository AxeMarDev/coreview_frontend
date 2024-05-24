import {ReactNode} from "react";

type propsContent = { children: ReactNode}
export default function Content({children}:propsContent){
    return(
        <div className={"bg-[#222222] p-5 flex w-full overflow-y-scroll"}>
             {children}
        </div>
    )
}