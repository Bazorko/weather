import App from "../App.jsx";
import Weather from "../pages/Weather.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Error from "../pages/Error.jsx";
const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <Error />
    },
    {
        path: "weather/:city/:stateAbbr/:stateFull",
        element: <Weather />,
    },
    {
        path: "user/dashboard",
        element: <Dashboard />,
    },
];
export default routes;