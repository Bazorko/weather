import { useEffect, useState } from "react";
import { useFetchWeather } from "./useFetchWeather";

const useFetchCities = (username) => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        const citiesArray = [];
        const url = `http://localhost:3000/user/locations/${username}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });
            const json = await response.json();
            for(let i = 0; i < json.length; i++){
                citiesArray.push(json[i]);
            }
            setCities(citiesArray);
            setLoading(false);
        } catch(error) {
            setError(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    },[]);
    return {cities, loading, error};
};
export default useFetchCities;