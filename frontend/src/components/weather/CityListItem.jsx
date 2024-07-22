import { useFetchWeather } from "../../hooks/useFetchWeather";
import { useEffect, useState } from "react";

const CityListItem = (props) => {
            const {data, loading, error} = useFetchWeather(props.city, props.stateAbbr);
            console.log(data);
    return(<>
        {data &&
            <section className="flex w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 justify-center rounded-lg border-2 border-neutral-400 p-4">
                <section className="flex-1 text-center">
                    <h2 className="p-2">{props.city}</h2>
                    <h3 className="p-2">{props.stateAbbr}</h3>
                </section>
                <section className="flex-1">
                    <section className="flex">
                        <p className="flex-1 text-right p-2">{Math.round(data.current.temp)}&deg; F</p>
                        <p className="flex-1 text-left p-2">{data.current.weather[0].main}</p>
                    </section>
                    <section className="flex">
                        <p className="flex-1 text-right p-2">L: {Math.round(data.daily[0].temp.min)}&deg; F</p>
                        <p className="flex-1 text-left p-2">H: {Math.round(data.daily[0].temp.max)}&deg; F</p>
                    </section>
                </section>
            </section>
        }
    </>);
}
export default CityListItem;