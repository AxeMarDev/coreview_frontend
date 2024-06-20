import {useLayoutEffect, useState} from "react";
import {useQueryClient, useMutation} from "@tanstack/react-query";



type propsHeader = {cols:{ name: string, width: string }[]}
type propsHeaderTab = {title:{ name: string, width: string }}
function Header({cols}:propsHeader){

    const HeaderTab = ({title}:propsHeaderTab) =>{
        return(
            <div className={`py-2 pl-2 ${title.width} border-r-2 border-stone-800`}>
                {title.name}
            </div>
        )
    }

    return(
        <div className={"flex flex-row rounded-t-lg border-b-2 border-stone-800 "}>
            {cols.map((column)=>
                <HeaderTab title={column}/>
            )}
        </div>
    )
}


type propsRow = { rowContent: Record<string, string> , cols: { name: string, width: string }[] , queryKey: string, selectedArray:string[]}

function Rows({rowContent, cols, queryKey, selectedArray}:propsRow ){

    console.log(selectedArray)
    const RowTab = ({title}:propsHeaderTab) =>{
        return(
            <div className={`flex py-2 pl-2 ${title.width} border-r-2 border-r-stone-900  border-b-2 border-b-stone-900`}>
                {rowContent[title.name ]}
            </div>
        )
    }

    const [styleUpdate, setStyleUpdte ] = useState({backgroundColor:""})


    const QueryClient = useQueryClient()

    const selectedClientsMutation = useMutation({
        mutationFn: (clientId: string) => {
            setStyleUpdte(( (styleUpdate.backgroundColor=== "red") ? ({backgroundColor:""}):({backgroundColor:"red"})))
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

    useLayoutEffect(() => {
        if ( selectedArray.includes(rowContent["id"] )){
            setStyleUpdte( {backgroundColor:"red"})
        }
    }, []);

    return(
        <div className={"flex flex-row"} onClick={()=>selectedClientsMutation.mutate(rowContent["id"])} style={styleUpdate}>
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
        <div className={"w-full h-full bg-[#171717] rounded-t-lg rounded-b-lg flex flex-col"}>
            <Header cols={cols}/>
            <div className={"flex flex-col bg-stone-800 h-full w-full rounded-b-lg overflow-y-scroll overflow-x-scroll"}>
                {recordContent.map((item)=> <Rows rowContent={item} cols={cols} queryKey={queryKey} selectedArray={selectedArray}/> ) }
            </div>
        </div>
    )

}