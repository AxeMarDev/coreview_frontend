import API, {tFile} from "../API/api.ts";
import {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {HiDotsHorizontal} from "react-icons/hi";

type pFileCard = { file:tFile}
export default function FileCard({file}:pFileCard){

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || "undef";

    const divRef = useRef<HTMLDivElement>(null);  // Create a ref object
    const [width, setWidth] = useState(0);  // State to store the width

    const image = useQuery({
        queryKey: [`image-${file.image_id}`],
        queryFn: ()=>API.getFile( id, file.image_id || "", { mime_type: file.mime_type })
    })

    useEffect(() => {

        if (divRef.current) {
            console.log(divRef.current.offsetWidth)
            setWidth(divRef.current.offsetWidth);  // Set width after component mounts
        }


    }, []);  // Empty dependency array means this runs once after initial render

    return(
        <div className={"flex flex-col border  border-[#E5E5E5] rounded w-full"}>
            <div className={`bg-white flex`} style={{
                height: width ,
                backgroundImage: `url('data:image/jpeg;base64,${image.data && image.data.resp.file}')`,  // how to put image var that is in base64
                backgroundSize: "cover"
            }} ref={divRef}>
                <div className={"w-full flex  justify-end"}>
                    <div className={"px-2 h-6 border grid content-center hover:bg-[#E5E5E5] border-[#E5E5E5] rounded relative top-3 right-2 bg-[#F1F1F1] drop-shadow"}>
                        <HiDotsHorizontal className={"border-[#E5E5E5] w-5"} />
                    </div>
                </div>

            </div>
            <div className={`w-full p-2 hover:bg-[#E5E5E5] hover:underline text-[#616161] flex justify-between  `}  ref={divRef}>
                <p> {file.file_name}</p>
                <p> {file.mime_type}</p>
            </div>
        </div>

    )
}