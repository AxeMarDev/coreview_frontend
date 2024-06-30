import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import railiamntLogo from "../assets/railiantlogowh.png"
import { MeshGradientRenderer } from '@johnn-e/react-mesh-gradient';
import { FaArrowDown } from "react-icons/fa";
import {useEffect, useLayoutEffect, useState} from "react";

export function Navbar(){

    const location = useLocation()
    return(
        <div className={"w-screen  grid content-center mt-3 p-2 px-32"}>
            <div className={"flex flex-row justify-between "}>
                <div className={"flex flex-row  w-44"}>
                    <Link to={"/"}>
                        <img src={railiamntLogo} alt={"railiant logotype"} className={"p-2 h-10"}/>
                    </Link>
                </div>

                <div className={"flex flex-row "}>
                    <Link to={"/product"} className={`text-white h-full p-2 grid content-center px-4 rounded ${location.pathname === "/product" && "bg-white/20"}`}>product</Link>
                    <Link to={"/pricing"} className={`text-white h-full p-2 grid content-center px-4 rounded ${location.pathname === "/pricing" && "bg-white/20"}`}>pricing</Link>
                    <Link to={"/docs"} className={`text-white h-full p-2 grid content-center px-4 rounded ${location.pathname === "/docs" && "bg-white/20"}`}>docs</Link>
                    <Link to={"/about"} className={`text-white h-full p-2 grid content-center px-4 rounded ${location.pathname === "/about" && "bg-white/20"}`}>about us</Link>
                </div>
                <div className={"flex flex-row justify-end  w-44"}>
                    <Link to={"/coreview"} className={"bg-white text-black h-full p-2 grid content-center px-4 rounded"}>login</Link>
                </div>
            </div>
        </div>
    )
}
export default function Home(){

    const navigate = useNavigate()
    const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

    const [ index , setIndex ] = useState(0)

    const messages = [ "Dont leave your clients in the dark", "Show your clients the work they love"]

    useLayoutEffect(() => {

        setIndex(0)

    }, [navigate]);

    useEffect(() => {
        sleep(5000).then( ()=>{

                setIndex( (index +1) % 2)
                console.log(index +1 % 2)
        })

    }, [index]);

    return(
        <div className={"w-screen h-full flex flex-col"}>
            <Navbar/>
            <MeshGradientRenderer
                id="gradient-container"
                className="gradient"
                colors={[
                    "#676B70",
                    "#676B70",
                    "#676B70",
                    "#676B70",
                    "#71757a"
                ]}
            />
            { (location.pathname === "/") ? (
                <div className={"h-full flex  flex-row p-20"}>


                    <div className={"flex flex-col grid content-center justify-center w-full px-14 "}>
                        <div className={"flex justify-center text-center   mb-28 flex-col"}>
                            <p className={"text-5xl font-black"}>{messages[index]}</p>
                            <div className={" flex justify-center mt-12  h-12"}>
                                <FaArrowDown className={"h-10 w-10"} />
                            </div>

                        </div>


                        {/*<img src={consoless} className={"rounded shadow-lg"}/>*/}
                    </div>
                </div>
            ) :(
                <Outlet/>
            )}

        </div>
    )
}