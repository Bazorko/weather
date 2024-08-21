import Container from "../../utils/Container";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
const ChangeForgottenPassword = () => {
    const {token} = useParams();
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [message, setMessage] = useState("");
    const handlePasswordSubmit = (event) => {
        setPassword(event.target.value);
    }
    const handlePasswordAgainSubmit = (event) => {
        setPasswordAgain(event.target.value);
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        //In the future, refactor code to follow common password standards, like length, complexity, etc.
        if(password === passwordAgain){
            const response = await fetch(`http://localhost:3000/user/forgot-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({password})
            });
            const json = await response.json();
            setMessage(json.message);
        }
    }
    return(<>
        <section className="h-screen bg-slate-50">
            <nav className="w-full h-fit bg-blue-500 p-5 px-8 lg:px-32 flex flex-row items-center relative">
                <section className="w-full">
                    <h1 className="text-slate-50 text-3xl text-center">Weather</h1>
                </section>
            </nav>
            <Container>
                {message ? <section className="flex flex-col items-center pt-6">
                        <p className="text-3xl">{message}</p>
                        <Link className="m-6 hover:underline" to="/">Go Home</Link>
                    </section> 
                    : <section className="pt-6 w-ful flex flex-col items-center">
                        <section>
                            <h2 className="text-3xl">Change Password</h2>
                        </section>
                        <section className="w-6/12 pt-6">
                            <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
                                <input type="password" name="email" value={password} onChange={handlePasswordSubmit} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your password."/>
                                <input type="password" name="password" value={passwordAgain} onChange={handlePasswordAgainSubmit} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your password again."/>
                                <button type="submit" className="py-2 border-2 rounded-lg bg-blue-500 text-slate-50">Sign In</button>
                            </form>
                        </section>
                    </section>}
            </Container>
        </section>
    </>);
  }
  export default ChangeForgottenPassword;