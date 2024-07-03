import { useState, useEffect } from "react";
export const useAddCityToList = (username, email, city) => {
    const [fetchList, setFetchList] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `http://localhost:3000/users/locations`;
    useEffect(() => {
        const addCityToList = async () => {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    credentials: "include",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, email, city}),
                });
                const json = await response.json();
                setFetchList(json);
                setLoading(false);
            } catch(error) {
                setLoading(false);
                setError(error);
            }
        }
        addCityToList();
    }, []);
    return {fetchList, loading, error}
}