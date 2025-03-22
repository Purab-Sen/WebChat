const setConversation = async(data)=>{
    try{
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/conversation/add`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data),
            credentials:"include"
        });
        const result = await response.json();
        if(response.ok){
            return result.data;
        }
    }catch(err){
        console.log("Error while calling setConversation api",err);
    }
} 

export default setConversation;