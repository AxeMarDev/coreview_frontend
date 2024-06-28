import Cookies from "js-cookie";



export type tMessage = {id:string, email:string, name:string, location:string, message:string,read:boolean, company_id:string}
export type tMessages = [tMessage] | []
export type tCompany = {id:string, company_name:string}


const GET = async <type>( route:string, params:Record<string, string> ) =>{


    let value : { resp : type } = {resp: <type>[]}

    const cookie = JSON.parse( Cookies.get("id") || "")

    const queryParams = new URLSearchParams(params);

    const url = `http://localhost:8080${route}?${queryParams}`;
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


    const url = `http://localhost:8080${route}?${queryParams}`;

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

    const url = `http://localhost:8080${route}?${queryParams}`;

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
//
// const PATCH = async ( route:string, params:Record<string, string>, data:BodyInit) =>{
//
//     let value : { resp : tProjects } = {resp: []}
//
//     const queryParams = new URLSearchParams(params)
//
//     const url = `http://localhost:8080${route}?${queryParams}`;
//
//     await fetch(url, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: data
//     })
//         .then((response)=> response.json() )
//         .then((data) => {
//             console.log(data)
//             value = { resp: data }
//         })
//         .catch((error) => {
//             console.error(error);
//         });
//
//
//     return value
// }

// const deleteProject = async (id:string) =>{
//     return DELETE( "/projects",{id: id}, "")
// }
// const   getProjects = async (params:{id:string}) =>{
//
//     return GET<tProjects>( "/projects",params)
//
// }
//
// const   addProjects = async (param:tProject) =>{
//
//     return POST( "/projects",{}, JSON.stringify(param))
//
// }
//
// const updateProject = async( param:tProject) =>{
//     return PATCH("/projects", {id:param.id}, JSON.stringify(param))
// }


export type tRegister = { company_name:string, company_code:string, email:string, username:string, phone:string, password:string}
export type tLogin = {  company_code:string,  username:string, password:string}
export type tClient = { id:string, name:string, username:string, email:string, hash_password:string, phone:string, company_id:number}
export type tProject ={ id:string, name:string , company_id:number}
export type tEmployee = {id:string, name:string, username:string, email:string, hash_password:string, phone:string, company_id:number}


const  register = async (param:tRegister) =>{
    console.log(JSON.stringify(param))
    return POST<{id:string, company_name:string, jwt:string, error:boolean}>( "/register",{}, JSON.stringify(param), {id:"", company_name:"", jwt:"", error: true} )
}

const  login = async (param:tLogin) =>{
    return POST<{id:string, company_name:string, jwt:string, error:boolean }>( "/auth",{}, JSON.stringify(param), {id:"", company_name:"", jwt:"", error: true})
}

const getClients = async()=>{
    return GET<tClient[]> ("/client", {})
}

const addClient = async(param:tClient)=>{
    return POST<tClient>("/client",{}, JSON.stringify(param), )
}

const getProjects = async()=>{
    return GET<tProject[]> ("/project", {})
}

const addProjects = async(param:tProject)=>{
    return POST<tProject>("/project",{}, JSON.stringify(param))
}

const deleteClient = async( param:{id:string}) =>{
    return DELETE( "/client", param, "")
}

const getEmployees = async() =>{
    return GET<tEmployee[]>( "/employees", {} )
}

const addEmployee = async(param:tEmployee)=>{
    return POST<tEmployee>("/employees",{}, JSON.stringify(param))
}

export {register,getClients, addClient, getProjects}


export default class API{

    static register( param:tRegister ){
        return register( param )
    }

    static login(param:tLogin){
        return login(param)
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

    static getEmployees(){
        return getEmployees()
    }
    static addEmployee(param:tEmployee){
        return addEmployee(param)
    }

}
