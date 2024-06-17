import App from "../App.jsx";
import Weather from "../pages/Weather.jsx";
const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "weather/:city",
        element: <Weather />,
    },
];
export default routes;