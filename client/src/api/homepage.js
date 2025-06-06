import React from "react";

export const getHomePage = async () => {
    try{

        const request = await fetch("http://localhost:5000/api/cricscore/", {method: "GET"});
        return await request.json();

    }
    catch(error){
        throw new Error(error);
    }
};

