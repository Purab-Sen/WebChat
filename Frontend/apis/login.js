const login = async(data)=>{
    try{
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/login`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:data?JSON.stringify(data):null,
            credentials:"include"
        });
        const result = await response.json();
        if(response.ok){
            return {data:result.data,status:response.status};
        }
        return {data:null,status:response.status};
    }catch(err){
        console.log("Couldn't connect to server",err);
        return {sdata:null,tatus:404};
    }
}
export default login;