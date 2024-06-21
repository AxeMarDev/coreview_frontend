import './App.css'
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useLayoutEffect, useState} from "react";
import Root from "./components/root.tsx";
import Navbar from "./components/navbar.tsx";
import Index from "./pages";
import Home from "./pages/home.tsx";
import Clients from "./pages/clients.tsx";
import Projects from "./pages/projects.tsx";
import Login from "./pages/login.tsx";
import Cookies from "js-cookie";
import AddClient from "./pages/addClient.tsx";
import AddProject from "./pages/addProject.tsx";
import DeleteClients from "./pages/deleteClients.tsx";
import Employees from "./pages/employees.tsx";



function AppRouter(){
    const location = useLocation()
    const navigate = useNavigate()
    const [ disabledNav , setDisabledNav] = useState(false)
    const [loading, setLoading ] = useState(true)

    useLayoutEffect(() => {
        console.log(location.pathname)
        if ( location.pathname === "/" || location.pathname ==="/login"){
            setDisabledNav(true)
        } else{
            setDisabledNav(false)
        }

    }, [location, navigate]);

    useEffect(() => {
        const value = Cookies.get('id'); // returns 'value' if the cookie exists
        console.log(value)
        if ( (value !== undefined) || ( location.pathname === "/" || location.pathname ==="/login" ) ){
            // setId( JSON.parse(value) )
            navigate(location.pathname)
            setLoading(false)
        } else {
            navigate("/login")
            setLoading(false)
        }

    }, [navigate]);

    return(

        !loading &&

        <Root classname={"text-white"} >
            { !disabledNav && <Navbar /> }
            <Routes>
                <Route path={"/"} element={ <Home/> }/>
                <Route path={"/about"} element={ <Home/> }/>
                <Route path={"/product"} element={ <Home/> }/>
                <Route path={"/login"} element={ <Login/> }/>
                <Route path={"/coreview"} element={ <Index/> }>
                    <Route path={""} element={ <Index/> }/>
                    <Route path={"clients"} element={ <Clients/> }>
                        <Route path={"add"} element={ <AddClient/> }/>
                        <Route path={"delete"} element={ <DeleteClients/> }/>
                    </Route>
                    <Route path={"projects"} element={ <Projects/> }>
                        <Route path={"add"} element={ <AddProject/> }/>
                    </Route>
                    <Route path={"templates"} element={ <Index/> }/>
                    <Route path={"employees"} element={ <Employees/> }/>
                    <Route path={"settings"} element={ <Index/> }>
                        <Route path={"theme"} element={ <Index/> }/>
                        <Route path={"billing"} element={ <Index/> }/>
                    </Route>
                </Route>
            </Routes>
        </Root>
    )
}

function App() {

  return (
    <>
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
    </>
  )
}

export default App
