import {useState} from "react";
import {RxCross2} from "react-icons/rx";

type propNameTags = {label:string, action:()=>void}
function AddTag({label,action}:propNameTags){

    return(
        <button onClick={()=>action()} className={`bg-[#688ED6] border-[#3264B2] w-8 00whitespace-nowrap  border-2 rounded text-white flex justify-center`}>
            {label}
        </button>
    )
}

export {AddTag}


export default function NameTag({label,action}:propNameTags){

    const [deleteAppear , setDeleteAppear] = useState(false)
    const [onDelete , setOnDelete] = useState(false)


    return(
        <div onMouseEnter={()=>setDeleteAppear(true)}
             onMouseLeave={()=>setDeleteAppear(false)}
             className={`${ !onDelete ? ("bg-[#688ED6] border-[#3264B2]"):("bg-red-500 border-red-700") } whitespace-nowrap w-min  border-2 rounded text-white flex flex-row`}>


            <div className={"w-5 "}/>
            <p className={"text-sm"}>{label}</p>
            {deleteAppear ? (
                <button className={"  grid content-center flex justify-center  w-5"}
                     onMouseOver={()=>setOnDelete(true)}
                     onMouseLeave={()=>setOnDelete(false)}
                        onClick={()=>action()}>
                    <RxCross2 />
                </button>
            ):( <div className={"w-5 "}/>)}
        </div>
    )
}


