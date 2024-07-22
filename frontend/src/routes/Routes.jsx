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
        errorElement: <Error />
    },
    {
        path: "user/dashboard",
        element: <Dashboard />,
        errorElement: <Error />
    },
];
export default routes;