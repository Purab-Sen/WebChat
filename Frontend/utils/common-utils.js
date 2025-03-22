export const formatDate = (date)=>{
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours<10 ? '0' + hours:hours}:${minutes<10?'0'+minutes:minutes}`
}

export const downloadMedia = async (e,url) => {
    e.preventDefault();
    try{
        const response = await fetch(url,{
            method:"GET",
            credentials:"include"
        });
        const blob = await response.blob();
        const newurl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = "none";
        a.href = newurl;
        a.target="_blank";

        const namesplit = url.split("/");
        const name = namesplit.pop();

        a.download = "" + name + "";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }catch(err){
        console.log("Error while downloading the image",err.message);
    }
}