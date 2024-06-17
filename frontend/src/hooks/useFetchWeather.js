import { useState, useEffect } from "react";
export const useFetchWeather = (city, stateAbbr) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = "a2c22c4ef2608da0c4e5de8cb110ab82";
    const coordsAPICall = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateAbbr},${840}&limit=${1}&appid=${apiKey}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(coordsAPICall);
                const coordsJSON = await response.json();
                const { lon, lat } = coordsJSON[0];
                const weatherAPICall = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
                try {
                    const response = await fetch(weatherAPICall);
                    const json = await response.json();
                    setLoading(false);
                    setData(json);
                } catch (error) {
                    setLoading(false);
                    setError(error);
                }
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        }
        fetchData();
    }, [city]);
    return {data, loading, error};
}