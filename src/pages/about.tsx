import {useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";



type pBlogCard = { title:string, subtitle:string, imageurl:string}
function BlogCard({title, subtitle, imageurl}:pBlogCard){
    return(
        <div className={"bg-black/50 h-72 rounded flex flex-col"}>
            <div className={"w-full flex h-full " } style={{
                backgroundImage:`url(${imageurl})`,
                backgroundSize: "cover"
            }}/>
            <div className={"p-5   "}>
                <p>{title}</p>
                <p className={"text-xs text-white/50"}>{subtitle}</p>
            </div>
        </div>
    )
}
export default function About(){

    const blogs = useQuery({
        queryKey: ["blogs"],
        queryFn: () => API.getBlogs()
    })

    return(
        <div className={"h-full w-full flex  justify-center pt-10 px-20"}>
            { blogs.data && <div className={"grid grid-cols-4 w-full gap-3"}>
                { blogs.data.resp.map((blog)=>
                    <BlogCard title={blog.title} subtitle={blog.subtitle} imageurl={blog.imageurl}/>
                )}
            </div>}
        </div>
    )
}