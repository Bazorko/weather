import { useState } from "react";

const ChangePassword = (props) => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");
    const [message, setMessage] = useState("");
    const username = localStorage.getItem("username");
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if(password){
            if(newPassword === newPasswordAgain){
                const response = await fetch(`http://localhost:3000/user/change-password`, {
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
    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    }
    const handleNewPasswordInput = (event) => {
        setNewPassword(event.target.value);
    }
    const handleNewPasswordAgainInput = (event) => {
        setNewPasswordAgain(event.target.value);
    }
    return(<>
        <section className="flex flex-col justify-center items-center">
            <section>
                <h2 className="text-center text-3xl">Change Password</h2>
            </section>
            {message.msg ? <section className="pt-6 w-full">
                <p className="text-green-500 bg-green-100 border-green-500 border-2 rounded-lg p-2">{message.msg}</p>
            </section> : null}
            {message.err ? <section className="pt-6 w-full">
                <p className="text-red-500 bg-red-100 border-red-500 border-2 rounded-lg p-2">{message.err}</p>
            </section> : null}
            <section className="pt-6 w-full">
                <form onSubmit={handleFormSubmit} className="flex flex-col w-full gap-2">
                    <input type="password" name="password" value={password} onChange={handlePasswordInput} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your old password."/>
                    <input type="password" name="newPassword" value={newPassword} onChange={handleNewPasswordInput} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your new password."/>
                    <input type="password" name="newPasswordAgain" value={newPasswordAgain} onChange={handleNewPasswordAgainInput} className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your new password again."/>
                    <button type="submit" className="py-2 border-2 rounded-lg bg-blue-500 text-slate-50">Forgot Password?</button>
                </form>
            </section>
        </section>
    </>);
}
export default ChangePassword;