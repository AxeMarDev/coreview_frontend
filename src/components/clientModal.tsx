import {OptionsbarButtonStyle} from "../pages/clients.tsx";
import {useQuery} from "@tanstack/react-query";
import {selectedClients} from "../assets/ReactQueryStore.ts";
import API from "../API/api.ts";
import HeaderField from "./headerField.tsx";


type propsClientModal = { setModal: React.Dispatch<React.SetStateAction<boolean>>}
export default function ClientModal({setModal}:propsClientModal){

    const selectClientsQuery = useQuery({
        queryKey: ["selectclients"],
        queryFn: () => selectedClients
    })

    const selectedClientQuery =  useQuery({
            queryKey: ["client"],
            queryFn: () => API.getClient( selectClientsQuery.data ? (`${selectClientsQuery.data[0]}`) : ("") )
    })



    return(
        <div>
            { selectedClientQuery.data &&
                <div className={"bg-white h-full rounded w-[35rem] p-4 "}>
                    <OptionsbarButtonStyle action={()=>setModal(false)} title={"esc"}/>
                    <div className={"text-black text-sm flex flex-wrap gap-4"}>
                        <HeaderField fieldName={"Client Name"} field={selectedClientQuery.data.resp.id} />
                        <HeaderField fieldName={"Client Name"} field={selectedClientQuery.data.resp.name} updateable/>
                        <HeaderField fieldName={"Client Name"} field={ `${selectedClientQuery.data.resp.company_id}`} />

                    </div>
                </div>
            }
        </div>
    )
}