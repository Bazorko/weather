import { useState } from "react";

const ForgotPassword = (props) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:3000/user/forgot-password`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        });
        const json = await response.json();
        setMessage(json);
    }
    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    }
    return(<>
        <section>
            <p className="text-3xl">Forgot Password?</p>
        </section>
        {message.message ? <section className="pt-6 w-full">
            <p className="text-green-500 bg-green-100 border-green-500 border-2 rounded-lg p-2">{message.message}</p>
        </section> : null}
        {message.error ? <section className="pt-6 w-full">
            <p className="text-red-500 bg-red-100 border-red-500 border-2 rounded-lg p-2">{message.error}</p>
        </section> : null}
        <section className="pt-6 w-full">
            <form onSubmit={handleFormSubmit} className="flex flex-col w-full gap-2">
                <input type="email" name="email" value={email} onChange={handleEmailInput} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your email address"/>
                <button type="submit" className="py-2 border-2 rounded-lg bg-blue-500 text-slate-50">Forgot Password?</button>
            </form>
        </section>
        <section className="m-6">
            <p className="cursor-pointer hover:underline" onClick={() => {
                props.handleForgotPassword(false);
            }}>Remembered Password?</p>
        </section>
    </>);
}
export default ForgotPassword;