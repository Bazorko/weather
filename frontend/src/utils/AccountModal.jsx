import { useContext, useState } from "react";
import { AuthContext } from "../contexts/UserAuth";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";
import ChangePassword from "../utils/ChangePassword";
const AccountModal = (props) => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const handleLogoutClick = () => {
        logout();
        navigate("/");
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openChangePasswordModal = (event) => {
        event.stopPropagation();
        setIsModalOpen(true);
    }
    const closeChangePasswordModal = () => {
        setIsModalOpen(false);
    }
    return(<>
        {isModalOpen ? <div className="absolute top-0 left-0"><Modal handleClick={closeChangePasswordModal}><ChangePassword/></Modal></div> : 
        <section className="p-2 text-center rounded-lg bg-slate-50">
            <p className="cursor-pointer" onClick={openChangePasswordModal}>Change Password</p>
            <p className="cursor-pointer" onClick={handleLogoutClick}>Logout</p>
        </section>
        }
    </>);
}
export default AccountModal;