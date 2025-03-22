const uploadFile = async (formData)=>{
    try{
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/file/upload`,{
            method:"POST",
            body:formData,
            credentials:"include"
        });
        const result = response.json();
        return result;
    }catch(err){
        console.log("Error while sending file to server",err);
        return null;
    }
}

export default uploadFile;