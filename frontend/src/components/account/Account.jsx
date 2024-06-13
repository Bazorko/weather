import { useState } from "react";
import Modal from "../../utils/Modal.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
const Account = (props) => {
    const [isSignInOpen, setIsSignInOpen] = useState(true);
    const openSignIn = () => {
        setIsSignInOpen(true);
    }
    const closeSignIn = () => {
        setIsSignInOpen(false);
    }
    return(<>
        <Modal handleClick={props.handleClick}>
            <section className="flex flex-col justify-center items-center">
                <section className="w-full pb-6 flex justify-end">
                    <p onClick={props.handleClick} className="text-2xl">&times;</p>
                </section>
                {isSignInOpen ? <SignIn handleClick={closeSignIn}/> : <SignUp handleClick={openSignIn}/>}
            </section>
        </Modal>
    </>);
}
export default Account;