import Container from "../utils/Container.jsx";
const Home = () => {
    return(<>
        <main className="h-screen bg-blue-500">
            <Container>
                <section className="h-screen flex flex-col gap-y-6 items-center">
                    <section className="mt-48">
                        <h1 className="text-slate-50 text-5xl">Weather</h1>
                    </section>
                    <section className="w-9/12">
                        <form action="" className="flex flex-col gap-y-4">
                            <input type="text" placeholder="Enter a city" name="city" className="py-1 pl-1 border-2 rounded-lg border-slate-50"/>
                            <button className="p-1 border-2 border-slate-50 text-slate-50 rounded-lg" type="submit">Search</button>
                        </form>
                    </section>
                    <section>
                        <p className="text-slate-50 underline cursor-pointer">Log In or Sign Up</p>
                    </section>
                </section>
            </Container>
        </main>
    </>);
  }
  export default Home;