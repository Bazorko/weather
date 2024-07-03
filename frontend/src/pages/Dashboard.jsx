import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/UserAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "../utils/Container";
import AccountModal from "../utils/AccountModal";
import CityListItem from "../components/weather/CityListItem";
import { useAddCityToList } from "../hooks/useAddCityToList";
const Dashboard = () => {
    const capitalizeFirstLetter = (str) => {
        return str[0].toUpperCase()+str.slice(1).toLowerCase();
    }
    const displayCities = [
        {key: 1, city: "Adams", state: "New York", temp: "75", temp_min: "50", temp_max: "100"},
        {key: 2, city: "Schuylerville", state: "New York", temp: "75", temp_min: "50", temp_max: "100"},
        {key: 3, city: "New York", state: "New York", temp: "75", temp_min: "50", temp_max: "100"},
    ];

    const { user } = useContext(AuthContext);
    console.log(user);
    const { username, email } = user;

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const openAccountModal = (event) => {
        event.stopPropagation();
        setIsAccountModalOpen(true);
    }
    const closeAccountModal = (event) => {
        event.stopPropagation();
        setIsAccountModalOpen(false);
    }

    const addCityToList = async (event) => {
        event.preventDefault();
        const url = `http://localhost:3000/user/locations`;
        const newCity = capitalizeFirstLetter(inputValue);
        try {
            await fetch(url, {
                method: "POST",
                credentials: "include",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, newCity}),
            });
        } catch(error) {
            console.log(error);
        }
        //const {fetchList, loading, error} = useAddCityToList(username, email, newCity);
    };

    if(!user){
        useEffect(() => {
            return navigate("/");
        }, []);
    }
    if(user){
        const usernameCapitalized = username[0].toUpperCase()+username.slice(1).toLowerCase();
        const emailLowercase = email.toLowerCase();
        return(<>
            <section className="h-screen bg-slate-50" onClick={closeAccountModal}>
                <nav className="w-full h-fit bg-blue-500 p-5 px-8 lg:px-32 flex flex-row items-center relative">
                    <section className="w-2/4">
                        <Link to="/">
                            <h1 className="text-slate-50 text-3xl">Weather</h1>
                        </Link>
                    </section>
                    <section className="w-2/4 flex flex-col">
                        <div className="ml-auto">
                            {isAccountModalOpen ? <AccountModal username={usernameCapitalized} email={emailLowercase} /> : <div className="w-12 h-12 bg-slate-50 rounded-full cursor-pointer" onClick={openAccountModal}></div>}
                        </div>
                    </section>
                </nav>
                <Container>
                    <form className="flex items-center justify-center gap-x-4 mt-4">
                        <input type="text" placeholder="Enter a city"className="rounded-lg border-2 border-neutral-400 py-2 pl-1 pr-8" value={inputValue} onChange={handleInputChange}/>
                        <button className="rounded-lg border-2 border-neutral-400 px-8 py-2" onClick={addCityToList}>Search</button>
                    </form>
                    <section className="flex flex-col items-center gap-y-4">
                        <h1 className="text-2xl pt-4">{usernameCapitalized}'s Saved Cities</h1>
                        {displayCities.map(city => {
                            return (
                                <CityListItem key={city.key} city={city}/>
                            );
                        })}
                    </section>
                </Container>
            </section>
        </>);   
    }
}
export default Dashboard;

//<button onClick={handleLogoutClick} className="text-slate-50 px-4 py-2 border-2 rounded-lg">Log Out</button>