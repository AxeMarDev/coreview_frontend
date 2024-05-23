import {ReactNode} from "react";


type propsRoots = { children:ReactNode , classname :string }
export default function Root({children, classname}:propsRoots){
    return(
        <div className={`${classname} flex flex-row w-screen h-screen `}>
            {children}
        </div>
    )
}