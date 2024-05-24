import Content from "../components/content.tsx";
import {Outlet} from "react-router-dom";

export default function Index(){
    return(
        <Content>
            <Outlet/>
        </Content>
    )
}