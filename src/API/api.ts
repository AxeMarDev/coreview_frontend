import Cookies from "js-cookie";

const rVersion:string = "/web/v1"
const rAdmin:string = rVersion + "/a"

const GET = async <type>( route:string, params:Record<string, string> ) =>{


    let value : { resp : type } = {resp: <type>[]}

    const cookie = JSON.parse( Cookies.get("id") || "{}")

    const queryParams = new URLSearchParams(params);

    const url = `${import.meta.env.VITE_BACKEND_URL}${route}?${queryParams}`;
    console.log(cookie.jwt)
    await fetch(url, ( cookie === "" ? {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }: {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.jwt}`  // Add this line
        },
    }))
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

const POST = async <type> ( route:string, params:Record<string, string>, data:BodyInit | FormData, defaultReturn?:type ) =>{

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
export type tFile = {image_id?:string, project_id?:string, file_name:string, mime_type:string, size?:string }

const  register = async (param:tRegister) =>{
    return POST<{id:string, type:"regular", company_name:string, jwt:string, error:boolean}>( rVersion+"/register",{}, JSON.stringify(param), {id:"",type:"regular", company_name:"", jwt:"", error: true} )
}

const  adminRegister = async (params:tAdmin) =>{
    return POST<{id:string, type:"admin", company_name:string, jwt:string, error:boolean}>( rVersion+"/admin-register",{}, JSON.stringify(params), {id:"",type:"admin", company_name:"", jwt:"", error: true} )
}

const  clientlogin = async (param:tLogin) =>{
    return POST<{id:string, company_name:string, jwt:string, error:boolean }>( rVersion+"/client-auth",{}, JSON.stringify(param), {id:"", company_name:"", jwt:"", error: true})
}
const  employeelogin = async (param:tLogin) =>{
    return POST<{id:string, company_name:string, jwt:string, error:boolean }>( rVersion+"/employee-auth",{}, JSON.stringify(param), {id:"", company_name:"", jwt:"", error: true})
}

const adminlogin = async (param:tLoginAdmin)=>{
    return POST<{id:string, type:"admin", company_name:string, jwt:string, error:boolean}>(rVersion+"/admin-auth", {}, JSON.stringify(param), {id:"", type:"admin", company_name:"", jwt:"", error: true})
}

const getClients = async()=>{
    return GET<tClient[]> (rAdmin+"/client", {})
}

const addClient = async(param:tClient)=>{
    return POST<tClient>(rAdmin+"/client",{}, JSON.stringify(param), )
}

const addBlog = async(param:tBlog)=>{
    return POST("/blog",{}, JSON.stringify(param), )
}

const getProjects = async()=>{
    return GET<tProject[]> (rAdmin+"/project", {})
}

const addProjects = async(param:tProject)=>{
    return POST<tProject>(rAdmin+"/project",{}, JSON.stringify(param))
}

const addFile = async( params:tFile ,file:string, projectId:string)=>{
    return POST<tFile>(rAdmin+`/project/${projectId}/files`,{}, JSON.stringify({...params, file:file}))
}

const getFiles = async( projectId:string)=>{
    return GET<tFile[]>(rAdmin+`/project/${projectId}/files`,{} )
}

const getFile = async( projectId:string, fileId:string, param:{mime_type:string})=>{
    return GET<{file:string}>(rAdmin+`/project/${projectId}/files/${fileId}`,param )
}

const deleteClient = async( param:{id:string}) =>{
    return DELETE( rAdmin+"/client", param, "")
}

const deleteProject = async( param:{id:string}) =>{
    return DELETE( rAdmin+"/project", param, "")
}

const deleteBlog = async( id:string) =>{
    return DELETE( rVersion+`/blog/${id}`, {}, "")
}

const deleteEmployeeFromProject = async( projectId:string, employeeId:string ) =>{
    return DELETE( rAdmin+`/project/${projectId}/employee/${employeeId}`,{},"")
}

const deleteClientFromProject = async( projectId:string, clientId:string ) =>{
    return DELETE( rAdmin+`/project/${projectId}/client/${clientId}`,{},"")
}

const getEmployees = async() =>{
    return GET<tEmployee[]>( rAdmin+"/employees", {} )
}

const addEmployee = async(param:tEmployee)=>{
    return POST<tEmployee>(rAdmin+"/employees",{}, JSON.stringify(param))
}

const getProject = async( projectId:string ) =>{
    return GET<tProject>(rAdmin+`/project/${projectId}`,{})
}

const getBlogs = async(  ) =>{
    return GET<tBlog[]>(rVersion+`/blog`,{})
}

const getClient = async( clientId:string ) =>{
    return GET<tClient>(rAdmin+`/client/${clientId}`,{})
}


const putClientToProject = async (projectId:string, clientId:string)=>{
    return PUT( rAdmin+`/project/${projectId}/client/${clientId}`,{},"")
}

const getProjectClients = async( projectId:string ) =>{
    return GET<tClient[]>(rAdmin+`/project/${projectId}/client`,{})
}

const putEmployeeToProject = async (projectId:string, employeeId:string)=>{
    return PUT( rAdmin+`/project/${projectId}/employee/${employeeId}`,{},"")
}

const getProjectEmployees = async( projectId:string ) =>{
    return GET<tEmployee[]>(rAdmin+`/project/${projectId}/employee`,{})
}

const updateProjectName = async( projectId:string, newName:string ) =>{
    return PATCH(rAdmin + `/project/${projectId}/name`,{},JSON.stringify({"newName":newName}))
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

    static addFile(params:tFile, file:string,projectId:string){
        return addFile( params, file, projectId)
    }

    static getFiles( projectId:string){
        return getFiles( projectId)
    }

    static getFile( projectId:string, fileId:string, param:{mime_type:string}){
        return getFile(projectId,fileId, param )
    }
}


