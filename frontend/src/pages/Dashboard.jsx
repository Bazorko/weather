import Container from "../utils/Container";
import AccountModal from "../utils/AccountModal";
import CityList from "../components/weather/CityList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddCity } from "../hooks/useAddCity";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { useFetchCities } from "../hooks/useFetchCities";
const Dashboard = () => {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const { cities, loading, error } = useFetchCities(username);
    const [citiesArray, setCitiesArray] = useState([]);

    useEffect(() => {
        setCitiesArray([...cities]);
    }, [cities]);

    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    //Add city to database
    const addCity = (event) => {
        event.preventDefault();
        console.log(citiesArray.length);
        if(citiesArray.length < 3){
            const city = inputValue;
            useAddCity({username, city});
            setInputValue("");
            location.reload();
        }
        else if(cities.length >= 3){
            return null;
        }

    }

    //Navigates to away from dashboard if no user info is found
    useEffect(() => {
        if(!username){
            return navigate("/");   
        }
    });

    //Control modal.
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const openAccountModal = (event) => {
        event.stopPropagation();
        setIsAccountModalOpen(true);
    }
    const closeAccountModal = (event) => {
        event.stopPropagation();
        setIsAccountModalOpen(false);
    }

    return(<>
        <section className="h-screen bg-slate-50" onClick={closeAccountModal}>
            <nav className="w-full h-fit bg-blue-500 p-5 px-8 lg:px-32 flex flex-row items-center relative">
                <section className="w-2/4">
                    <h1 className="text-slate-50 text-3xl">Weather</h1>
                </section>
                <section className="w-2/4 flex flex-col">
                    <div className="ml-auto">
                        {isAccountModalOpen ? <AccountModal /> : <div className="w-12 h-12 bg-slate-50 rounded-full cursor-pointer" onClick={openAccountModal}></div>}
                    </div>
                </section>
            </nav>
            <Container>
                <form className="flex items-center justify-center gap-x-4 mt-4">
                    <input type="text" placeholder="Enter a city"className="rounded-lg border-2 border-neutral-400 py-2 pl-1 pr-8" value={inputValue} onChange={handleInputChange}/>
                    <button className="rounded-lg border-2 border-neutral-400 px-8 py-2" onClick={addCity}>Search</button>
                </form>
                <section className="flex flex-col items-center gap-y-4">
                    <h1 className="text-2xl pt-4">{`${capitalizeFirstLetter(username)}'s Saved City`}</h1>
                    <CityList citiesArray={citiesArray} setCitiesArray={setCitiesArray} username={username}/>
                </section>
            </Container>
        </section>
    </>);
}
export default Dashboard;