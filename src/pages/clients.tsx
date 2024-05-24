import Table from "../components/table.tsx";
import Title from "../components/title.tsx";

export type tClients = {id:string, name:string, email:string}
export default function Clients(){


    const clients:tClients[] = [
        {id:"1",name:"Axell",email:"axell"},
        {id:"2",name:"Axell1",email:"axell1"},
        {id:"3",name:"Axell2",email:"axell2"}]


    return(
        <div className={"w-full h-full flex flex-col"}>
            <Title> Clients </Title>
            <Table cols={[
                {name:"id", width: "w-32"},
                {name:"name",width: "w-32"},
                {name:"email",width: "w-32"}
            ]} content={clients}/>
        </div>
    )
}