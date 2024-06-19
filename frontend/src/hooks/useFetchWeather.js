import { useState, useEffect } from "react";
export const useFetchWeather = (city, stateAbbr) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `http://localhost:3000/weather/${city}/${stateAbbr}`;
    useEffect(() => {
        const testFetch = async () => {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
        }
        testFetch();
    }, [url]);
    return {data, loading, error}
}