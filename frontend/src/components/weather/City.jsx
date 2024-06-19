import { useFetchWeather } from "../../hooks/useFetchWeather";
import { useState } from "react";
const City = (props) => {
    const [data, setData] = useState(null);

    const { city, stateAbbr, stateFull } = props.location;

    const getWeather = async () => {
        const {data, loading, error} = await useFetchWeather(city, stateAbbr);
        setData(data);
    }
    getWeather();

        return(<>
            {data &&<section className="flex flex-col items-center mt-16">
                <section className="flex flex-col items-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl pt-3 pb-1.5">{Math.round(data.daily[0].temp.day)}&deg; F</h1>
                    <section className="flex flex-row text-xs gap-x-4">
                        <p>L: {Math.round(data.daily[0].temp.min)}&deg; F</p>
                        <p>H: {Math.round(data.daily[0].temp.max)}&deg; F</p>
                    </section>
                </section>
                <h2 className="text-xl sm:text-2xl md:text-3xl py-3">{city}</h2>
                <h3 className="text-sm sm:text-base md:text-lg">{stateFull}</h3>
            </section>}
        </>);
}
export default City;