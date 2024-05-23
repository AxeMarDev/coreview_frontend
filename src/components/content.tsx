import {ReactNode} from "react";

type propsContent = { children: ReactNode}
export default function Content({children}:propsContent){
    return(
        <div className={"bg-[#222222] flex w-full overflow-y-scroll"}>
            <div className={"w-52"}>
                {children}
            </div>
        </div>
    )
}