import Cookies from "js-cookie";



export type tMessage = {id:string, email:string, name:string, location:string, message:string,read:boolean, company_id:string}
export type tMessages = [tMessage] | []
export type tCompany = {id:string, company_name:string}


const GET = async <type>( route:string, params:Record<string, string> ) =>{


    let value : { resp : type } = {resp: <type>[]}

    const cookie = JSON.parse( Cookies.get("id") || "")

    const queryParams = new URLSearchParams(params);

    const url = `${import.meta.env.VITE_BACKEND_URL}${route}?${queryParams}`;
    console.log(cookie.jwt)
    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.jwt}`  // Add this line
        },
    })
        .then((response)=> response.json() )
        .then((data) => {
            if ( data.error){
                console.log(data.error)

                value = { resp: <type>[] }
            } else{
                console.log(data)
                value = { resp: data }
            }

        })
        .catch((error) => {
            console.error(error);
            value = { resp: <type>[] }
        });


    return value
}

const POST = async <type> ( route:string, params:Record<string, string>, data:BodyInit, defaultReturn?:type ) =>{

    let value : { resp : type } = {resp: defaultReturn || <type>[]}

    const queryParams = new URLSearchParams(params);
    const cookie = JSON.parse( Cookies.get("id") || "{}")


    const url = `${import.meta.env.VITE_BACKEND_URL}${route}?${queryParams}`;

    console.log(url)



    await fetch(url, ( cookie === "" ? {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }: {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.jwt}`  // Add this line
        },
        body: data
    }))
        .then((response)=> response.json() )
        .then((data) => {
            console.log(data)
            console.log(data.error)
            if ( data.error){
                value = { resp: defaultReturn || <type>[]}
            } else{
                data.error = false
                value = { resp: data }
            }

        })
        .catch((error) => {
            console.error(error);
            value = { resp: defaultReturn || <type>[]}
        });


    return value
}

const DELETE = async <type> ( route:string, params:Record<string, string>, data:BodyInit) =>{

    const cookie = JSON.parse( Cookies.get("id") || "")
    let value : { resp : type } = {resp:<type>[]}

    const queryParams = new URLSearchParams(params)

    const url = `${import.meta.env.VITE_BACKEND_URL}${route}?${queryParams}`;

    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.jwt}`  // Add this line
        },
        body: data
    })
        .then((response)=> response.json() )
        .then((data) => {
            console.log(data)
            value = { resp: data }
        })
        .catch((error) => {
            console.error(error);
        });


    return value
}

const PUT = async <type> ( route:string, params:Record<string, string>, data:BodyInit) =>{

    const cookie = JSON.parse( Cookies.get("id") || "")
    let value : { resp : type } = {resp:<type>[]}

    const queryParams = new URLSearchParams(params)

    const url = `${import.meta.env.VITE_BACKEND_URL}${route}?${queryParams}`;

    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.jwt}`  // Add this line
        },
        body: data
    })
        .then((response)=> response.json() )
        .then((data) => {
            console.log(data)
            value = { resp: data }
        })
        .catch((error) => {
            console.error(error);
        });


    return value
}


const PATCH = async <type> ( route:string, params:Record<string, string>, data:BodyInit) =>{

    const cookie = JSON.parse( Cookies.get("id") || "")
    let value : { resp : type } = {resp:<type>[]}

    const queryParams = new URLSearchParams(params)

    const url = `${import.meta.env.VITE_BACKEND_URL}${route}?${queryParams}`;

    await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.jwt}`  // Add this line
        },
        body: data
    })
        .then((response)=> response.json() )
        .then((data) => {
            console.log(data)
            value = { resp: data }
        })
        .catch((error) => {
            console.error(error);
        });


    return value
}



export type tRegister = { company_name:string, company_code:string, email:string, username:string, phone:string, password:string}
export type tLogin = {  company_code:string,  username:string, password:string}
export type tLoginAdmin = { username:string, hash_password:string}

export type tClient = { id:string, name:string, username:string, email:string, hash_password:string, phone:string, company_id:number}
export type tProject ={ id:string, name:string , company_id:number}
export type tEmployee = {id:string, name:string, username:string, email:string, hash_password:string, phone:string, company_id:number}
export type tAdmin = {id?:string, name:string, username:string, email:string, hash_password:string}
export type tBlog = {id?:string, title:string, subtitle:string, author_id:number, date_posted:number, imageurl:string}

const  register = async (param:tRegister) =>{
    return POST<{id:string, type:"regular", company_name:string, jwt:string, error:boolean}>( "/register",{}, JSON.stringify(param), {id:"",type:"regular", company_name:"", jwt:"", error: true} )
}

const  adminRegister = async (params:tAdmin) =>{
    return POST<{id:string, type:"admin", company_name:string, jwt:string, error:boolean}>( "/admin-register",{}, JSON.stringify(params), {id:"",type:"admin", company_name:"", jwt:"", error: true} )
}

const  clientlogin = async (param:tLogin) =>{
    return POST<{id:string, company_name:string, jwt:string, error:boolean }>( "/client-auth",{}, JSON.stringify(param), {id:"", company_name:"", jwt:"", error: true})
}
const  employeelogin = async (param:tLogin) =>{
    return POST<{id:string, company_name:string, jwt:string, error:boolean }>( "/employee-auth",{}, JSON.stringify(param), {id:"", company_name:"", jwt:"", error: true})
}

const adminlogin = async (param:tLoginAdmin)=>{
    return POST<{id:string, type:"admin", company_name:string, jwt:string, error:boolean}>("/admin-auth", {}, JSON.stringify(param), {id:"", type:"admin", company_name:"", jwt:"", error: true})
}

const getClients = async()=>{
    return GET<tClient[]> ("/a/client", {})
}

const addClient = async(param:tClient)=>{
    return POST<tClient>("/a/client",{}, JSON.stringify(param), )
}

const addBlog = async(param:tBlog)=>{
    return POST("/blog",{}, JSON.stringify(param), )
}

const getProjects = async()=>{
    return GET<tProject[]> ("/a/project", {})
}

const addProjects = async(param:tProject)=>{
    return POST<tProject>("/a/project",{}, JSON.stringify(param))
}

const deleteClient = async( param:{id:string}) =>{
    return DELETE( "/a/client", param, "")
}

const deleteProject = async( param:{id:string}) =>{
    return DELETE( "/a/project", param, "")
}

const deleteBlog = async( id:string) =>{
    return DELETE( `/blog/${id}`, {}, "")
}

const deleteEmployeeFromProject = async( projectId:string, employeeId:string ) =>{
    return DELETE( `/a/project/${projectId}/employee/${employeeId}`,{},"")
}

const deleteClientFromProject = async( projectId:string, clientId:string ) =>{
    return DELETE( `/a/project/${projectId}/client/${clientId}`,{},"")
}

const getEmployees = async() =>{
    return GET<tEmployee[]>( "/a/employees", {} )
}

const addEmployee = async(param:tEmployee)=>{
    return POST<tEmployee>("/a/employees",{}, JSON.stringify(param))
}

const getProject = async( projectId:string ) =>{
    return GET<tProject>(`/a/project/${projectId}`,{})
}

const getBlogs = async(  ) =>{
    return GET<tBlog[]>(`/blog`,{})
}

const getClient = async( clientId:string ) =>{
    return GET<tClient>(`/a/client/${clientId}`,{})
}


const putClientToProject = async (projectId:string, clientId:string)=>{
    return PUT( `/a/project/${projectId}/client/${clientId}`,{},"")
}

const getProjectClients = async( projectId:string ) =>{
    return GET<tClient[]>(`/a/project/${projectId}/client`,{})
}

const putEmployeeToProject = async (projectId:string, employeeId:string)=>{
    return PUT( `/a/project/${projectId}/employee/${employeeId}`,{},"")
}

const getProjectEmployees = async( projectId:string ) =>{
    return GET<tEmployee[]>(`/a/project/${projectId}/employee`,{})
}

const updateProjectName = async( projectId:string, newName:string ) =>{
    return PATCH(`/a/project/${projectId}/name`,{},JSON.stringify({"newName":newName}))
}




export {register,getClients, addClient, getProjects}


export default class API{

    static register( param:tRegister ){
        return register( param )
    }

    static employeelogin(param:tLogin){
        return employeelogin(param)
    }

    static clientlogin(param:tLogin){
        return clientlogin(param)
    }

    static adminlogin(param:tLoginAdmin){
        return adminlogin(param)
    }


    static getClients(){
        return getClients()
    }
    static addClient(param:tClient) {
        return addClient(param)
    }

    static getProjects(){
        return getProjects()
    }

    static addProjects(param:tProject){
        return addProjects(param)
    }

    static deleteClient(param:{id:string}){
        return deleteClient(param)
    }

    static deleteProject(param:{id:string}){
        return deleteProject(param)
    }

    static getEmployees(){
        return getEmployees()
    }
    static addEmployee(param:tEmployee){
        return addEmployee(param)
    }

    static getProject( projectId :string){
        return getProject(projectId)
    }

    static putClientToProject( projectId:string, clientId:string){
        return putClientToProject(projectId,clientId)
    }

    static getProjectClients( projectId :string) {
        return getProjectClients(projectId)
    }

    static putEmployeeToProject( projectId:string, employeeId:string){
        return putEmployeeToProject(projectId,employeeId)
    }

    static deleteEmployeeFromProject( projectId:string, employeeId:string){
        return deleteEmployeeFromProject(projectId,employeeId)
    }

    static deleteClientFromProject( projectId:string, clientId:string){
        return deleteClientFromProject(projectId,clientId)
    }


    static getProjectEmployees( projectId :string) {
        return getProjectEmployees(projectId)
    }

    static updateProjectName(projectId :string, newName:string){
        return updateProjectName(projectId, newName)
    }

    static getClient(clientId :string){
        return getClient(clientId)
    }

    static adminRegister (params:tAdmin){
        return adminRegister(params)
    }

    static getBlogs (){
        return getBlogs()
    }

    static addBlog(param:tBlog){
        return addBlog(param)
    }

    static deleteBlog(id:string){
        return deleteBlog(id)
    }
}


