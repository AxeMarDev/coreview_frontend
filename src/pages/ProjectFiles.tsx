import ImageUploader from "../components/ImageUploader.tsx";
import {useQuery} from "@tanstack/react-query";
import API from "../API/api.ts";
import {useLocation} from "react-router-dom";
import FileCard from "../components/fileCard.tsx";

export function ProjectFiles() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || "undef";

    const files = useQuery({
        queryKey: ["files"],
        queryFn: ()=>API.getFiles( id)
    })

    return(
        <div className={"text-sm p-5 text-black"}>
            <ImageUploader/>
            <div className={" w-full grid grid-cols-6 mt-5 gap-5"}>
                { files.data && files.data.resp.map((file)=> <FileCard file={file}/>)}
            </div>

        </div>
    )
}