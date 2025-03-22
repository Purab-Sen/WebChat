const getUsers = async()=>{
    try{
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/contacts`,{
            method:"GET",
            credentials:"include"
        });
        const result = await response.json();
        if(response.ok){
            return {data:result.data,status:response.status};
        }
        return {data:[],status:response.status};
    }catch(err){
        console.log("Couldn't connect to server",err);
        return {data:[],status:404};
    }
}   

export default getUsers;