import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../utils/Container.jsx";
import SearchForCity from "../components/weather/SearchForCity.jsx";
import AccountModal from "../components/account/AccountModal.jsx";
const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    useEffect(() => {
        if(username){
            return navigate("/user/dashboard");   
        }
    });
    return(<>
        <section className="h-screen bg-blue-500">
            <Container>
                {isModalOpen ? <AccountModal handleClick={closeModal}/> : 
                <article className="h-screen flex flex-col gap-y-6 justify-center items-center">
                    <section>
                        <h1 className="text-slate-50 text-5xl">Weather</h1>
                    </section>
                    <section className="w-full sm:w-10/12">
                        <SearchForCity />
                    </section>
                    <section>
                        <p onClick={openModal} className="text-slate-50 underline cursor-pointer">Log In or Sign Up</p>
                    </section>
                </article>}
            </Container>
        </section>
    </>);
  }
  export default Home;