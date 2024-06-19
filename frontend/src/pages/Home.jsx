import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../utils/Container.jsx";
import AccountModal from "../components/account/AccountModal.jsx";
const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const stateAbbr = "NY";
    const stateFull = "New York";
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
        <section className="h-screen bg-blue-500">
            <Container>
                {isModalOpen ? <AccountModal isModalOpen={isModalOpen} handleClick={closeModal}/> : 
                <article className="h-screen flex flex-col gap-y-6 justify-center items-center">
                    <section>
                        <h1 className="text-slate-50 text-5xl">Weather</h1>
                    </section>
                    <section className="w-full sm:w-10/12">
                        <form className="flex flex-col md:flex-row gap-y-2 md:gap-x-4 md:justify-center">
                            <input type="text" placeholder="Enter a city" name="city" value={inputValue} onChange={handleInputChange} className="py-2 pl-1 border-2 rounded-lg border-slate-50 w-full md:w-96"/>
                            <Link className="md:w-40 p-1 py-2 border-2 border-slate-50 text-slate-50 rounded-lg text-center" to={`../weather/${inputValue}/${stateAbbr}/${stateFull}`} type="submit">Search</Link>
                        </form>
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