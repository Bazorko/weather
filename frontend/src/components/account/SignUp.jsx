import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/UserAuth";
import { useNavigate } from "react-router-dom";
const SignUp = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setHandleError] = useState("");

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleError = (errorMessage) => {
        setHandleError("");
        setHandleError(errorMessage);
    }
    const handleUsernameInput = (event) => {
        setUsername(event.target.value);
    }
    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    }
    const handleVerifyPasswordInput = (event) => {
        setVerifyPassword(event.target.value);
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (password !== verifyPassword){
            handleError("Your passwords do not match.");
        }
        else if (password.length < 8 && verifyPassword.length < 8){
            handleError("Your password must be longer than 8 characters.");
        }
        else if (username < 3){
            handleError("Your username must be longer than 3 characters.");
        }
        else if(password === verifyPassword){
            await fetch("http://localhost:3000/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({username, email, password}),
            })
            login({username, email});
            navigate("../../../../user/dashboard");
        }
    }
    return(<>
        <section>
            <p className="text-3xl">Sign Up.</p>
        </section>
        <section className="pt-6 w-full">
           {error ? <section>
                <p className="text-red-500 bg-red-100 border-red-500 border-2 rounded-lg p-2">{error}</p><br/>
            </section> : null}
            <form onSubmit={handleFormSubmit} className="flex flex-col w-full gap-2">
                <input type="text" required value={username} onChange={handleUsernameInput} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter a username"/>
                <input type="email" required value={email} onChange={handleEmailInput} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your email address"/>
                <div className="flex flex-col md:flex-row gap-2">
                    <input type="password" required value={password} onChange={handlePasswordInput} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg w-full md:w-3/6 text-sm" placeholder="Enter a password."/>
                    <input type="password" required value={verifyPassword} onChange={handleVerifyPasswordInput} className="text-sm py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg w-full md:w-3/6" placeholder="Re-enter your password"/>
                </div>
                <button type="submit" className="py-2 border-2 rounded-lg bg-blue-500 text-slate-50">Sign Up</button>
            </form>
        </section>
        <section className="p-6 cursor-pointer">
            <p onClick={props.handleClick} className="text-center">Already have an account?</p>
        </section>
    </>);
}
export default SignUp;