import './App.css'
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Root from "./components/root.tsx";
import Navbar from "./components/navbar.tsx";
import Index from "./pages";
import Home from "./pages/home.tsx";
import Clients from "./pages/clients.tsx";
import Projects from "./pages/projects.tsx";



function AppRouter(){
    const location = useLocation()
    const navigate = useNavigate()
    const [ disabledNav , setDisabledNav] = useState(false)

    useEffect(() => {
        console.log(location.pathname)

        if ( location.pathname === "/"){
            setDisabledNav(true)
        } else{
            setDisabledNav(false)
        }

    }, [location, navigate]);

    return(
        <Root classname={"text-white"} >

            { !disabledNav && <Navbar /> }
            <Routes>
                <Route path={"/"} element={ <Home/> }/>
                <Route path={"about"} element={ <Home/> }/>
                <Route path={"product"} element={ <Home/> }/>
                <Route path={"/login"} element={ <Index/> }/>
                <Route path={"/coreview"} element={ <Index/> }>
                    <Route path={""} element={ <Index/> }/>
                    <Route path={"clients"} element={ <Clients/> }/>
                    <Route path={"projects"} element={ <Projects/> }/>
                    <Route path={"templates"} element={ <Index/> }/>
                    <Route path={"employees"} element={ <Index/> }/>
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
