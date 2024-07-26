import {Link} from "react-router-dom";


type propsContentColumnFooter = { title:string ,links: {title:string, url:string}[]}
function ContentColumnFooter({title, links}:propsContentColumnFooter){
    return(
        <div className={"flex flex-col "}>
            <h2 className={"font-bold"}>{title}</h2>
            {links.map((item)=>
                <Link className={"py-1 text-white/50"} to={item.url}>{item.title}</Link>
            )}
        </div>
    )
}

export default function Footer(){
    return(
        <div className={"p-20 h-80 w-full bg-black -mt-[68px]"}>
            <div className={"flex flex-row justify-between"}>
                <div>
                    <p>Railaint</p>
                </div>
                <div className={"flex flex-row gap-10"}>
                    <ContentColumnFooter title={"Company"} links={[
                        {title:"about",url:"/about"},
                        {title:"company",url:"/internal"},
                        {title:"pricing",url:"/about"}
                    ]}/>
                    <ContentColumnFooter title={"Resources"} links={[
                        {title:"blog",url:"/about"},
                        {title:"documentation",url:"/documentation"},
                        {title:"pricing",url:"/about"}
                    ]}/>
                </div>
            </div>

        </div>
    )
}