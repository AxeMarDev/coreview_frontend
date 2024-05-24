import Title from "../components/title.tsx";
import Table from "../components/table.tsx";

export type tProject = {id:string, name:string, email:string}

export default function Projects(){



    const projects:tProject[] = [
        {id:"1",name:"Axell",email:"axell"},
        {id:"2",name:"Axell1",email:"axell1"},
        {id:"3",name:"Axell2",email:"axell2"},
        {id:"1",name:"Axell",email:"axell"},
        {id:"2",name:"Axell1",email:"axell1"},
        {id:"3",name:"Axell2",email:"axell2"} ,
        {id:"1",name:"Axell",email:"axell"}]


    return(
        <div className={"w-full h-full flex flex-col"}>
            <Title> Projects </Title>
            <Table cols={[
                {name:"id", width: "w-10"},
                {name:"name",width: "w-32"},
                {name:"email",width: "w-32"}
            ]} content={projects}/>
        </div>
    )
}