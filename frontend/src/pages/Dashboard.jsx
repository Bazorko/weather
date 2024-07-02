import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/UserAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "../utils/Container";
import AccountModal from "../utils/AccountModal";
const Dashboard = () => {
    const cities = [
        {city: "Adams", state: "New York", temp: "75", temp_min: "50", temp_max: "100"},
        {city: "Schuylerville", state: "New York", temp: "75", temp_min: "50", temp_max: "100"},
        {city: "New York", state: "New York", temp: "75", temp_min: "50", temp_max: "100"},
    ];
    const { user, login, logout } = useContext(AuthContext);
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
    const handleLogoutClick = () => {
        logout();
        navigate("/");
    }
    if(!user){
        useEffect(() => {
            return navigate("/");
        }, []);
    }
    if(user){
        const { username, email } = user;
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
                            {isAccountModalOpen ? <AccountModal username={username} email={email} /> : <div className="w-12 h-12 bg-slate-50 rounded-full cursor-pointer" onClick={openAccountModal}></div>}
                        </div>
                    </section>
                </nav>
                <Container>
                    <section>
                        {cities.map(city => {
                            return (
                            <section></section>
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