import './App.css'
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {useEffect} from "react";
import Root from "./components/root.tsx";
import Navbar from "./components/navbar.tsx";
import Index from "./pages";



function AppRouter(){
    const location = useLocation()

    useEffect(() => {
        console.log(location.pathname)
    }, []);

    return(
        <Root classname={"text-white"} >
            <Navbar />
            <Routes>
                <Route path={"/"} element={ <Index/> }/>
                <Route path={"/login"} element={ <Index/> }/>
                <Route path={"/coreview"} element={ <Index/> }>
                    <Route path={""} element={ <Index/> }/>
                    <Route path={"clients"} element={ <Index/> }/>
                    <Route path={"projects"} element={ <Index/> }/>
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
