

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


type propsRow = { rowContent: Record<string, string> , cols: { name: string, width: string }[] }

function Rows({rowContent, cols}:propsRow ){

    const RowTab = ({title}:propsHeaderTab) =>{
        return(
            <div className={`py-2 pl-2 ${title.width} border-r-2 border-r-stone-900  border-b-2 border-b-stone-900`}>
                {rowContent[title.name ]}
            </div>
        )
    }

    return(
        <div className={"flex flex-row"}>
            {cols.map((colName) => <RowTab title={colName}/> )}
        </div>
    )
}

type propsTable = {cols:{ name: string, width: string }[], content:Record<string, string>[]}
export default function Table({cols, content}:propsTable ){

    return(
        <div className={"w-full h-full bg-[#171717] rounded-t-lg rounded-b-lg flex flex-col"}>
            <Header cols={cols}/>
            <div className={"flex flex-col bg-stone-800 h-full rounded-b-lg overflow-y-scroll"}>
                {content.map((item)=> <Rows rowContent={item} cols={cols}/> ) }
            </div>
        </div>
    )

}