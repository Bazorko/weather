import { useState } from "react";
import Container from "../utils/Container.jsx";
import Account from "../components/account/Account.jsx";
const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    return(<>
        <main className="h-screen bg-blue-500">
            <Container>
                {isModalOpen ? <Account isModalOpen={isModalOpen} handleClick={closeModal}/> : 
                <article className="h-screen flex flex-col gap-y-6 justify-center items-center">
                    <section>
                        <h1 className="text-slate-50 text-5xl">Weather</h1>
                    </section>
                    <section className="w-full sm:w-10/12">
                        <form action="" className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 md:justify-center">
                            <input type="text" placeholder="Enter a city" name="city" className="py-2 pl-1 border-2 rounded-lg border-slate-50 w-full md:w-96"/>
                            <button className="md:w-40 p-1 py-2 border-2 border-slate-50 text-slate-50 rounded-lg" type="submit">Search</button>
                        </form>
                    </section>
                    <section>
                        <p onClick={openModal} className="text-slate-50 underline cursor-pointer">Log In or Sign Up</p>
                    </section>
                </article>}
            </Container>
        </main>
    </>);
  }
  export default Home;