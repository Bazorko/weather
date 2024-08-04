import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/UserAuth";
import { useNavigate } from "react-router-dom";
const SignIn = (props) => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if(!email && !password){
            setMessage("Enter your email and password.");
            return;
        }
        if(!email){
            setMessage("Enter an email address.");
            return;
        }
        if(!password){
            setMessage("Enter a password.");
            return;
        }
        const response = await fetch("http://localhost:3000/user/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({email, password}),
        })
        const json = await response.json();
        if(json.message){
            setMessage(json.message);
            return;
        }
        else if(!json.message){
            const username = json.username;
            login({username, email});
            navigate("../../../../user/dashboard");
        }
    }
    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    }
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
    const handleForgotPassword = (status) => {
        setForgotPasswordModal(status);
    }
    return(<>
        {forgotPasswordModal ? <> 
            <section>
                <p className="text-3xl">Forgot Password?</p>
            </section>
            <section className="pt-6 w-full">
                <form onSubmit={handleFormSubmit} className="flex flex-col w-full gap-2">
                    <input type="email" name="email" value={email} onChange={handleEmailInput} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your email address"/>
                    <button type="submit" className="py-2 border-2 rounded-lg bg-blue-500 text-slate-50">Forgot Password?</button>
                </form>
            </section>
            <section className="m-6">
                <p className="cursor-pointer hover:underline" onClick={() => {
                    handleForgotPassword(false);
                }}>Remembered Password?</p>
            </section>
        </> :
        <> 
            <section>
                <p className="text-3xl">Sign In.</p>
            </section>
            {message ? <section className="pt-6 w-full">
                <p className="text-red-500 bg-red-100 border-red-500 border-2 rounded-lg p-2">{message}</p>
            </section> : null}
            <section className="pt-6 w-full">
                <form onSubmit={handleFormSubmit} className="flex flex-col w-full gap-2">
                    <input type="email" name="email" value={email} onChange={handleEmailInput} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your email address"/>
                    <input type="password" name="password" value={password} onChange={handlePasswordInput} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your password"/>
                    <button type="submit" className="py-2 border-2 rounded-lg bg-blue-500 text-slate-50">Sign In</button>
                </form>
            </section>
            <section className="mt-6">
                <p onClick={() => {
                    handleForgotPassword(true);
                }} className="cursor-pointer hover:underline">Forgot Password?</p>
            </section>
            <section className="m-6">
                <p onClick={props.handleClick} className="cursor-pointer hover:underline">Don't have an account?</p>
            </section>
        </>
        }
    </>);
}
export default SignIn;