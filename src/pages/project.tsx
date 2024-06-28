import {OptionsbarButtonStyle} from "./clients.tsx";
import {useNavigate} from "react-router-dom";


export default function Project(){

    const navigate = useNavigate()

    return(
        <div className={"flex flex-col w-full"}>
            <div className={"flex w-full"}>
                <div>
                    <OptionsbarButtonStyle action={()=>navigate("/coreview/projects")} title={"back"}/>
                </div>
                <p className={"text-black font-medium ml-2"} >Projects </p>
            </div>
            <div className={"pb-20 grid grid-cols-2 gap-3 mt-5"}>
                <div className={ "border border-[#E5E5E5]  text-[#616161] text-sm    rounded-lg "}>
                    <p className={"py-1 pl-2"}>Media</p>
                    <div className={"bg-white h-64 rounded-b-lg"}>
                        <p className={"text-black p-1 "}> #content# </p>
                    </div>
                </div>

                <div className={ "border border-[#E5E5E5]  text-[#616161] text-sm  rounded-lg "}>
                    <p className={"py-1 pl-2"}>Messages</p>
                    <div className={"bg-white h-64 rounded-b-lg"}>
                        <p className={"text-black p-1 "}> #content# </p>
                    </div>
                </div>

                <div className={ "border border-[#E5E5E5]  text-[#616161] text-sm rounded-lg "}>
                    <p className={"py-1 pl-2"}>Finance</p>
                    <div className={"bg-white h-64 rounded-b-lg"}>
                        <p className={"text-black p-1 "}> #content# </p>
                    </div>
                </div>

                <div className={ "border border-[#E5E5E5]  text-[#616161] text-sm   rounded-lg "}>
                    <p className={"py-1 pl-2"}>Content</p>
                    <div className={"bg-white h-64 rounded-b-lg"}>
                        <p className={"text-black p-1 "}> #content# </p>
                    </div>
                </div>

                <div className={ "border border-[#E5E5E5]  text-[#616161] text-sm   rounded-lg "}>
                    <p className={"py-1 pl-2"}>People</p>
                    <div className={"bg-white h-64 rounded-b-lg"}>
                        <p className={"text-black p-1 "}> #content# </p>
                    </div>
                </div>
            </div>

        </div>
    )
}