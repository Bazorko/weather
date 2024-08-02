import { useState, useEffect } from "react";
export const useFetchWeather = (city, stateAbbr) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `http://localhost:3000/weather/${city}/${stateAbbr}`;
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch(error) {
                setLoading(false);
                setError(error);
            }
        }
        fetchWeatherData();
    }, [url]);
    return {data, loading, error};
}