const getMessages = async(id)=>{
    try{
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/message/get/${id}`,{
            method:"GET",
            credentials:"include"
        });
        const result = await response.json();
        if(response.ok){
            return {data:result.data,status:response.status};
        }
        return {data:[],status:response.status};
    }catch(err){
        console.log("Error while calling getMessage api",err);
        return {data:[],status:404};
    }
}
export default getMessages;