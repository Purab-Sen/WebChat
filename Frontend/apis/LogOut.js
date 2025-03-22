const logOutApi = async()=>{
    try{
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/logout`,{
            method:"GET",
            credentials:"include"
        });
        return {status:response.status};
    }catch(err){
        console.log("Couldn't connect to server",err);
        return {status:404};
    }
}
export default logOutApi;