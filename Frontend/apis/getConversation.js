const getConversation = async(data)=>{
    try{
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/conversation/get`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data),
            credentials:"include"
        });
        const result = await response.json();
        if(response.ok){
            return {data:result,status:response.status};
        }
        return {data:null,status:response.status};
    }catch(err){
        console.log("Error while calling getConversation api",err);
        return {data:null,status:404};
    }
}
export default getConversation;