import {ReactNode} from "react";

type propsTitle = {children:ReactNode}
export default function Title({children}:propsTitle){
    return(
        <div>
            <h1 className={"text-xl text-black font-bold mb-3"}>{children}</h1>
        </div>
    )
}