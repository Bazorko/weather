import { useContext } from "react";
import { AuthContext } from "../contexts/UserAuth";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const { user, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user);
    console.log(login);
    console.log(logout);
    const handleLogOutClick = () => {
        logout();
        navigate("/");
    }
    return(<>
        <p>Dashboard</p>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <button onClick={handleLogOutClick}>Logout</button>
    </>);
}
export default Dashboard;