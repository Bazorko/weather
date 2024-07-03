import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/UserAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "../utils/Container";
import AccountModal from "../utils/AccountModal";
const Dashboard = () => {
    const cities = [
        {key: 1, city: "Adams", state: "New York", temp: "75", temp_min: "50", temp_max: "100"},
        {key: 2, city: "Schuylerville", state: "New York", temp: "75", temp_min: "50", temp_max: "100"},
        {key: 3, city: "New York", state: "New York", temp: "75", temp_min: "50", temp_max: "100"},
    ];
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const openAccountModal = (event) => {
        event.stopPropagation();
        setIsAccountModalOpen(true);
    }
    const closeAccountModal = (event) => {
        event.stopPropagation();
        setIsAccountModalOpen(false);
    }
    if(!user){
        useEffect(() => {
            return navigate("/");
        }, []);
    }
    if(user){
        const { username, email } = user;
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
                    <section className="flex flex-col items-center">
                        <h1>{usernameCapitalized}'s Saved Cities</h1>
                        {cities.map(city => {
                            return (
                                <>
                                    <section key={city.key} className="flex w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 m-4 justify-center rounded-lg border-2 border-neutral-400 p-4">
                                        <section className="flex-1 text-center">
                                            <h2 className="p-2">{city.city}</h2>
                                            <h3 className="p-2">{city.state}</h3>
                                        </section>
                                        <section className="flex-1 text-center">
                                            <p className="p-2">{city.temp}&deg; F</p>
                                            <section className="flex">
                                                <p className="flex-1 text-right p-2">{city.temp_min}&deg; F</p>
                                                <p className="flex-1 text-left p-2">{city.temp_max}&deg; F</p>
                                            </section>
                                        </section>
                                    </section>
                                </>
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