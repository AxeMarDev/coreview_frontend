import './App.css'
import {BrowserRouter, Outlet, Route, Routes, useLocation, useNavigate} from "react-router-dom";
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
import AddEmployee from "./pages/addEmployee.tsx";
import Project from "./pages/project.tsx";
import ClientView from "./pages/clientView.tsx";
import Pricing from "./pages/pricing.tsx";
import Docs from "./pages/docs.tsx";
import Product from "./pages/product.tsx";
import About from "./pages/about.tsx";
import ProjectRoot from "./pages/projectRoot.tsx";
import DeleteProjects from "./pages/deleteProjects.tsx";
import RailiantRoot from "./pages/railiantRoot.tsx";
import RailiantAdminDashboard from "./pages/railiantAdminDashboard.tsx";
import AddBlog from "./pages/addBlog.tsx";
import {ProjectFiles} from "./pages/ProjectFiles.tsx";
import Documentation from "./pages/documentation.tsx";



function AppRouter(){
    const location = useLocation()
    const navigate = useNavigate()
    const [ disabledNav , setDisabledNav] = useState(false)
    const [loading, setLoading ] = useState(true)

    useLayoutEffect(() => {
        console.log(location.pathname)

        if ( location.pathname === "/" ||
            location.pathname ==="/login"
            || location.pathname ==="/about"
            || location.pathname ==="/pricing"
            || location.pathname ==="/docs"
            || location.pathname ==="/product"
            || location.pathname ==="/documentation"||
            (location.pathname.substring(0,9) === "/internal" && ( (location.pathname.length === 9) || (location.pathname[9] === "/") )) ||
            location.pathname.substring(0,23) === "/coreview/projects/open"||
            (location.pathname.substring(0,11) === "/coreview/c" && ( (location.pathname.length === 11) || (location.pathname[11] === "/") )) )
        {
            setDisabledNav(true)
        } else{
            setDisabledNav(false)
        }

    }, [location, navigate]);

    useEffect(() => {


        const value = Cookies.get('id'); // returns 'value' if the cookie exists
        console.log( location )
        if ( (value !== undefined) || ( location.pathname.substring(0, 9) !== "/coreview")){
            navigate(location)
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
                <Route path={"/"} element={ <Home/> }>
                    <Route path={"/about"} element={ <About/> }/>
                    <Route path={"/product"} element={ <Product/> }/>
                    <Route path={"/pricing"} element={ <Pricing/> }/>
                    <Route path={"/docs"} element={ <Docs/> }/>
                </Route>

                <Route path={"/documentation"} element={ <Documentation/> }/>

                <Route path={"/internal"} element={<RailiantRoot/>}>
                    <Route path={""} element={ <Outlet/>  }/>
                    <Route path={"add"} element={ <AddBlog/> }/>

                    <Route path={"documentation"} element={ <p>blog</p> }/>
                    <Route path={"blogs"} element={ <RailiantAdminDashboard/> }/>
                </Route>

                <Route path={"/login"} element={ <Login/> }/>
                <Route path={"/coreview"} element={ <Index/> }>
                    <Route path={"c"} element={<ClientView />}>
                        <Route path={""} element={ <p> home </p> }/>
                        <Route path={"files"} element={ <p> files </p> }/>
                        <Route path={"messages"} element={ <p> messages </p> }/>
                    </Route>
                    <Route path={""} element={ <Index/> }/>
                    <Route path={"clients"} element={ <Clients/> }>
                        <Route path={"add"} element={ <AddClient/> }/>
                        <Route path={"delete"} element={ <DeleteClients/> }/>
                    </Route>
                    <Route path={"projects"} element={ <Projects/> }>
                        <Route path={"add"} element={ <AddProject/> }/>
                        <Route path={"delete"} element={ <DeleteProjects/> }/>
                        <Route path={"open"} element={ <Project/> }>
                            <Route path={""} element={ <ProjectRoot/> }/>
                            <Route path={"messages"} element={ <Index/> }/>
                            <Route path={"files"} element={ <ProjectFiles/> }/>
                        </Route>
                    </Route>
                    <Route path={"templates"} element={ <Index/> }/>

                    <Route path={"employees"} element={ <Employees/> }>
                        <Route path={"add"} element={ <AddEmployee/> }/>
                    </Route>
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
