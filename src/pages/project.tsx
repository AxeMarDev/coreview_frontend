import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { IoIosArrowBack } from "react-icons/io";


type propsOptionBarStyle = { action: ()=>void, optionalStyle?:string}
export function OptionsbarButtonStyle( {action, optionalStyle}:propsOptionBarStyle){


    const style = useState({backgroundColor:""})

    const timout = () =>{

        setTimeout(() => {
            style[1]({backgroundColor:""})
            setTimeout(() => {
                action()
            }, 50); // 1000 milliseconds equals 1 second
        }, 60); // 1000 milliseconds equals 1 second
    }

    return(
        <button onMouseLeave={()=> style[1]({backgroundColor:""})} onMouseDown={()=> style[1]({backgroundColor:"#252525"})} onMouseUp={()=>timout()}
                className={` p-[2px] px-4   text-sm  h-full ${optionalStyle}`} style={style[0]}>
            <IoIosArrowBack />
        </button>

    )
}

export default function Project(){

    const navigate = useNavigate()

    return(
        <div className={"flex flex-col w-full pt-12 "}>
            <div className={"flex w-full h-12 bg-[#171717] fixed top-0 text-white flex flex-row"}>
                <OptionsbarButtonStyle action={()=>navigate("/coreview/projects")}/>
                <div className={" flex flex-row grid content-center"}>
                    <p className={" font-medium ml-2"} >Projects </p>
                </div>
            </div>
            <div className={"pb-20 grid grid-cols-2 gap-3  p-5"}>
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