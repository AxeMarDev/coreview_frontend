import {useState} from "react";
import {RxCross2} from "react-icons/rx";


type propNameTags = {label:string, action:()=>void}
export default function NameTag({label,action}:propNameTags){

    const [deleteAppear , setDeleteAppear] = useState(false)
    const [onDelete , setOnDelete] = useState(false)


    return(
        <div onMouseEnter={()=>setDeleteAppear(true)}
             onMouseLeave={()=>setDeleteAppear(false)}
             className={`${ !onDelete ? ("bg-[#688ED6] border-[#3264B2]"):("bg-red-500 border-red-700") } px-2 whitespace-nowrap w-min  border-2 rounded text-white flex flex-row`}>
            {label}
            {deleteAppear && (
                <button className={" grid content-center flex justify-center pl-1"}
                     onMouseOver={()=>setOnDelete(true)}
                     onMouseLeave={()=>setOnDelete(false)}
                        onClick={()=>action()}>
                    <RxCross2 />
                </button>
            )}
        </div>
    )
}