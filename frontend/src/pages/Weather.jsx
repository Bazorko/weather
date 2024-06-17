import Container from "../utils/Container.jsx";
import AccountModal from "../components/account/AccountModal.jsx";
import City from "../components/weather/City.jsx";
import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useFetchWeather } from "../hooks/useFetchWeather.js";
const Weather = () => {
    const [inputValue, setInputValue] = useState("");
    const location = useLocation();
    let { city } = useParams();
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    const { stateFull } = location.state;
    const { stateAbbr } = location.state;

    const { data, error, loading } = useFetchWeather(city, stateAbbr);

    console.log(data);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    return(<>
        {isModalOpen ? <AccountModal isModalOpen={isModalOpen} handleClick={closeModal}/> : null}
        <section className="h-screen bg-slate-50">
            <nav className="w-full bg-blue-500 p-6 flex flex-row content-between">
                <section className="flex-1 self-center">
                    <Link to="/">
                        <h1 className="text-slate-50 text-3xl">Weather</h1>
                    </Link>
                </section>
                <section className="flex-1 flex justify-end">
                    <button onClick={openModal} className="text-slate-50 px-4 py-2 border-2 rounded-lg">Log In or Sign Up</button>
                </section>
            </nav>
            <Container>
                <form action="" className="flex flex-col md:flex-row gap-y-2 md:gap-x-4 md:justify-center mt-8">
                    <input type="text" placeholder="Enter a city" name="city" value={inputValue} onChange={handleInputChange} className="py-2 pl-1 border-2 rounded-lg border-neutral-600 w-full md:w-96"/>
                    <Link className="md:w-40 p-1 py-2 bg-blue-500 border-2 border-blue-500 text-slate-50 rounded-lg text-center" to={`../../weather/${inputValue}`} state={{stateAbbr: "NY", stateFull: "New York"}}>Search</Link>
                </form>
                <City city={city} state={stateFull}/>
            </Container>
        </section>
    </>);
}
export default Weather;