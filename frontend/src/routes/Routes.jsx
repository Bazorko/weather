import App from "../App.jsx";
import Weather from "../pages/Weather.jsx";
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
];
export default routes;