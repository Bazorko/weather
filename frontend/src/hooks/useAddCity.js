import capitalizeFirstLetter from "../utils/capitalizeFirstLetter"; 
import { useState } from "react";
export const useAddCity = async ({username, city}) => {
    const url = `http://localhost:3000/user/locations`;
    const newCity = capitalizeFirstLetter(city);
    try {
        await fetch(url, {
            method: "POST",
            credentials: "include",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, newCity}),
        });
    } catch(error) {
        console.log(error);
    }
};