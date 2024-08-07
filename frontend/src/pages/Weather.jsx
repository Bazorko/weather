import Container from "../utils/Container.jsx";
import AccountModal from "../components/account/AccountModal.jsx";
import City from "../components/weather/City.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
const Weather = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    return(<>
        {isModalOpen ? <AccountModal handleClick={closeModal}/> : <section className="h-screen bg-slate-50">
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
                <City />
                <section className="flex justify-center mt-10">
                    <Link to="/">
                        <p className="cursor-pointer hover:underline">&larr; Back Home</p>
                    </Link>
                </section>
            </Container>
        </section>}
    </>);
}
export default Weather;