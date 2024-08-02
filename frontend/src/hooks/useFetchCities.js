import { useEffect, useState } from "react";

export const useFetchCities = (username) => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:3000/user/locations/${username}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    credentials: "include",
                });
                const json = await response.json();
                setCities(json);
                setLoading(false);
            } catch(error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    },[]);
    /*const fetchData = async () => {
        const citiesArray = [];
        const url = `http://localhost:3000/user/locations/${username}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });
            const json = await response.json();
            setCities(json);
            setLoading(false);
        } catch(error) {
            setError(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    },[]);*/
    return {cities, loading, error};
};