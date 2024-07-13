import {OptionsbarButtonStyle} from "../pages/clients.tsx";


type propsClientModal = { setModal: React.Dispatch<React.SetStateAction<boolean>>}
export default function ClientModal({setModal}:propsClientModal){
    return(
        <div className={"bg-white h-full rounded w-[40rem] p-4 "}>
            <OptionsbarButtonStyle action={()=>setModal(false)} title={"esc"}/>
        </div>
    )
}