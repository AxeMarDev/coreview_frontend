import {useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";
import {useNavigate} from "react-router-dom";
import {RxCross2} from "react-icons/rx";
import railiantLogo from "../assets/ci.png"
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {useQueryClient} from "@tanstack/react-query";


type pBlogCard = { title:string, subtitle:string, id:number}
function BlogCard({title, subtitle, id}:pBlogCard){

    const QueryClient = useQueryClient()

    const blogsMutation = useMutation({
        mutationFn: ()=>API.deleteBlog( `${id}` ),
        onSuccess: ()=>{
            QueryClient.invalidateQueries({queryKey:["blogs"]})
        }
    })

    const [ onHover, setOnHover ] = useState(false)
    return(
        <div className={` border rounded ${onHover?("bg-red-500 border-gray-800 "):("border-gray-800 border")}`}>
            <div className={`flex flex-row px-2 pt-2 justify-between `}>
                <p className={"text-sm"}>{title} </p>
                <button onMouseOver={()=>setOnHover(true)}
                        onMouseLeave={()=>setOnHover(false)}
                        onClick={()=>blogsMutation.mutate()}
                        className={"text-gray-800"}> <RxCross2 /></button>
            </div>

            <div className={`w-full  h-[1px] my-1 ${onHover ? "bg-white/20" : "bg-gray-800"}`}/>
            <p className={"text-xs text-white/50 px-2 pb-2"}>{subtitle} </p>
        </div>
    )
}

export default function RailiantAdminDashboard(){

    const navigate = useNavigate()

    const blogs = useQuery({
        queryKey: ["blogs"],
        queryFn: () => API.getBlogs()
    })

    return(
        <div className={"flex flex-row w-screen "}>
            <div className={"flex h-full w-72 bg-gray-900 flex-col p-2 gap-3"}>
                <div className={"p-2 w-40"}>
                    <img src={railiantLogo} />
                </div>

                {blogs.data && blogs.data.resp.map(( blog)=>
                    <BlogCard title={blog.title} subtitle={blog.subtitle} id={ Number(blog.id) }/>
                )}
                <button className={"border border-gray-800 rounded p-1 flex justify-center hover:bg-gray-800"} onClick={()=>navigate("/internal/add")}>
                    +
                </button>
            </div>
            <div className={" flex h-full w-full bg-gray-800 justify-center grid content-center"}>
                <p> nothing selected</p>
            </div>
        </div>
    )
 }