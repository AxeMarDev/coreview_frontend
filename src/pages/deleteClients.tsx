import {useNavigate} from "react-router-dom";

export default function DeleteClients(){

    const navigate = useNavigate()

    return(
        <div>
            <button onClick={()=> navigate("/coreview/clients") }>back</button>
            <p>delete clients</p>
        </div>
    )
}