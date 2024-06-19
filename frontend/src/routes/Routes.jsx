import App from "../App.jsx";
import Weather from "../pages/Weather.jsx";
const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "weather/:city/:stateAbbr/:stateFull",
        element: <Weather />,
    },
];
export default routes;