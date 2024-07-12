import {useState} from "react";


type propsHeaderField = { field:string, fieldName:string, updateable?:true, action?:(field:string)=>void}
export default function HeaderField({field,fieldName, updateable,action}:propsHeaderField){

    const [over, setOver] = useState(false)
    const [inEdit, setInEdit] = useState(false)
    const [updatedField, setUpdatedField]  = useState(field)

    return(
        <div className={"flex flex-row"}>
            <p className={"pr-3"}>{fieldName}:</p>

            { over ? (

                !inEdit ? (
                    <button onClick={()=>setInEdit(true)} className={` bg-gray-400 rounded px-1 text-white`} onMouseEnter={()=>setOver(!!updateable )} onMouseLeave={()=>setOver(false)}>
                        <p>{field}</p>
                    </button>
                ):(
                    <div className={"flex flex-row"}>
                        <input type={"text"}
                               className={`bg-gray-400 rounded px-1 text-white`}
                               value={updatedField}
                               onChange={(e)=>setUpdatedField(e.target.value)} />
                        {action && <button onClick={()=>{action(updatedField); setInEdit(false);setOver(false)}}>Y</button>}
                        <button onClick={()=>{setInEdit(false);setOver(false)}}>X</button>
                    </div>
                )
            ):(
                <div className={` bg-gray-200 rounded px-1 `} onMouseEnter={()=>setOver(!!updateable )} onMouseLeave={()=>setOver(false)}>
                    <p>{field}</p>
                </div>
            )}

        </div>
    )
}