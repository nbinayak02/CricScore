export const getHomePage = async () => {
    try{

        const request = await fetch("http://localhost:5000/", {method: "GET"});
        const data= await request.json();
           console.log("message",data.message);
           console.log("status",data.status);
    }
    catch(error){
        throw new Error(error);
    }
};


