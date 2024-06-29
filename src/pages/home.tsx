import {Link} from "react-router-dom";
import railiamntLogo from "../assets/railiantlogowh.png"
import { MeshGradientRenderer } from '@johnn-e/react-mesh-gradient';
import { FaArrowDown } from "react-icons/fa";

function Navbar(){
    return(
        <div className={"w-screen  grid content-center mt-3 p-2 px-32"}>
            <div className={"flex flex-row justify-between "}>
                <img src={railiamntLogo} alt={"railiant logotype"} className={"p-2 h-10"}/>
                <div className={"flex flex-row "}>
                    <Link to={"/about"} className={"text-white h-full p-2 grid content-center px-4 rounded"}>about</Link>

                    <Link to={"/coreview"} className={"bg-white text-black h-full p-2 grid content-center px-4 rounded"}>login</Link>
                </div>
            </div>
        </div>
    )
}
export default function Home(){


    return(
        <div className={"w-screen h-full flex flex-col"}>
            <Navbar/>
            <div className={"h-full flex  flex-row p-20"}>
                <MeshGradientRenderer
                    id="gradient-container"
                    className="gradient"
                    colors={[
                        "#707067",
                        "#606055",
                        "#606055",
                        "#606055",
                        "#606055"
                    ]}
                />

                <div className={"flex flex-col grid content-center justify-center w-full px-14 "}>
                    <div className={"flex justify-center text-center   mb-28 flex-col"}>
                        <p className={"text-5xl font-black"}> Dont let you clients be left in the dark </p>
                        <div className={" flex justify-center mt-12  h-12"}>
                            <FaArrowDown className={"h-10 w-10"} />
                        </div>

                    </div>


                    {/*<img src={consoless} className={"rounded shadow-lg"}/>*/}
                </div>

            </div>
        </div>
    )
}