import { useState } from "react";
const SignUp = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setHandleError] = useState("");
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
        console.log(`Account: ${username}, ${email}, ${password}`);
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
            const response = await fetch("http://localhost:3000/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({username, email, password}),
            })
            //You could for example "setData" with the json that the server sent back
            const json = await response.json();
        }
    }
    return(<>
        <section>
            <p className="text-3xl">Sign Up.</p>
        </section>
        <section className="pt-6 w-full">
            <p>{error ?? error}</p>
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