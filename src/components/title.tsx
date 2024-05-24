import {ReactNode} from "react";

type propsTitle = {children:ReactNode}
export default function Title({children}:propsTitle){
    return(
        <div>
            <h1 className={"text-3xl mb-5"}>{children}</h1>
        </div>
    )
}