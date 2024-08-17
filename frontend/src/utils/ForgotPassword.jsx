import { useState } from "react";

const ForgotPassword = (props) => {
    const [email, setEmail] = useState("");
    const username = localStorage.getItem("username");
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if(password){
            if(newPassword === newPasswordAgain){
                const response = await fetch(`http://localhost:3000/user/forgot-password`, {
                    method: "POST",
                    credentials: "include",
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({password, newPassword, username}),
                });
                const json = await response.json();
                setMessage(json);
            }
        }
    }
    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    }
    return(<>
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
    </>);
}
export default ForgotPassword;