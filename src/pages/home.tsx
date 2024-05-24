import {Link} from "react-router-dom";
import railiamntLogo from "../assets/railiantlogowh.png"
import coreviewbookcover from "../assets/coreviewbookcover.png"

function Navbar(){
    return(
        <div className={"w-screen h-14 bg-[#171717] pl-10 border-b-2 border-b-stone-800 p-3 fixed"}>
            <img src={railiamntLogo} alt={"railiant logotype"} className={"h-full"}/>
        </div>
    )
}
export default function Home(){


    return(
        <div className={"w-screen h-full flex flex-col"}>
            <Navbar/>
            <div className={"h-full flex  flex-row p-20"}>
                <img className={"h-auto"} src={coreviewbookcover} alt={"book cover for coreview"}/>
                <div className={"flex flex-col justify-between w-full px-14"}>
                    <div>
                        <p className={"text-9xl"}>COREVIEW</p>
                        <p>Show your clients the work they love. Coreview is a platform built to
                            strengthen relations with clients by creating a tangile connection to a clients investment. Coreview can be used by clients to see the
                            progress of their service such as the construction of a new home or
                            the development of software. What ever the service is, core view can
                            be the portal that brings your client along for the development </p>
                    </div>

                    <Link to={"/coreview"} > go to console</Link>
                </div>

            </div>
        </div>
    )
}