import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {useState} from "react";



type propsHeader = {cols:{ name: string, width: string }[]}
type propsHeaderTab = {title:{ name: string, width: string }}
function Header({cols}:propsHeader){

    const HeaderTab = ({title}:propsHeaderTab) =>{
        return(
            <div className={`py-1 pl-2 ${title.width} `}>
                {title.name}
            </div>
        )
    }

    return(
        <div className={"flex flex-row rounded-t-lg border-b border-[#E3E3E3] text-[#616161] text-sm"}>
            {cols.map((column)=>
                <HeaderTab title={column}/>
            )}
        </div>
    )
}


type propsRow = { rowContent: Record<string, string> , cols: { name: string, width: string }[] , queryKey: string, selectedArray:string[]}

function Rows({rowContent, cols, queryKey, selectedArray}:propsRow ){


    const hoverBackground = useState("")
    const RowTab = ({title}:propsHeaderTab) =>{
        return(
            <div className={`flex py-1 pl-2 ${title.width} border-r border-r-[#E3E3E3] text-[#303030] text-sm `}>
                {rowContent[title.name ]}
            </div>
        )
    }

    const QueryClient = useQueryClient()

    const selectedClientsMutation = useMutation({
        mutationFn: (clientId: string) => {

            // Find and toggle the clientId in selectedArray
            return new Promise<void>((resolve) => {
                const index = selectedArray.indexOf(clientId);
                if (index !== -1) {
                    selectedArray.splice(index, 1);  // Remove client ID
                } else {
                    selectedArray.push(clientId);  // Add client ID
                }
                resolve();
            });
        },
        onSuccess: ()=> {
            // this took way to long
            QueryClient.resetQueries({queryKey:[queryKey]})
        },
    })

    const selectClientsQuery = useQuery({
        queryKey: [queryKey],
        queryFn: () => selectedArray
    })

    return(
        <div onMouseOver={()=>hoverBackground[1]("#F7F7F7")} onMouseLeave={()=>hoverBackground[1]("")} className={"flex flex-row bg-white border-b border-b-[#E3E3E3]"} onClick={()=>selectedClientsMutation.mutate(rowContent["id"])} style={
            {backgroundColor: ((selectClientsQuery.data && selectClientsQuery.data.includes(rowContent["id"]) ? ("#F1F1F1") : (hoverBackground[0]) ))}
        }>
            {cols.map((colName) => <RowTab title={colName}/> )}
        </div>
    )
}

type propsTable<type> = {cols:{ name: string, width: string }[], content: type[] , queryKey: string, selectedArray:string[]}

export default function Table<type>({cols, content, queryKey,selectedArray}:propsTable<type> ){



    const recordContent: Record<string, string>[]  = content.map( (item )=>{
        return Object.entries(item as object).reduce((acc, [key, value]) => {
            acc[key] = String(value); // Convert each value to a string
            return acc;
        }, {} as Record<string, string>)
    })


    return(
        <div className={"w-full h-full  rounded-t-lg rounded-b-lg flex flex-col border border-[#E5E5E5]"}>
            <Header cols={cols}/>
            <div className={"flex flex-col bg-white h-full w-full rounded-b-lg overflow-y-scroll overflow-x-scroll"}>
                {recordContent.map((item)=> <Rows rowContent={item} cols={cols} queryKey={queryKey} selectedArray={selectedArray}/> ) }
            </div>
        </div>
    )

}