const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//const APICall = require("./utilities/apiWeatherCall");
const userRouter = require("./routes/userRoutes");

const app = express();

//Settings
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    if(!req.hasOwnProperty("isAuth")){
        req.isAuth = false;
    }
    next();
});

//Routes
app.get("/weather/:city/:stateAbbr", cors({origin: "http://localhost:5173", method: ["GET"]}), (req, res) => {
    const { city, stateAbbr } = req.params;
    console.log(req.params);
    const fetchWeather = async () => {
        try {
            const coordsAPICall = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateAbbr},${840}&limit=${1}&appid=${process.env.API_KEY}`;
            const response = await fetch(coordsAPICall);
            const coordsJSON = await response.json();
            if(coordsJSON){
                try {
                    const { lat, lon } = coordsJSON[0];
                    const weatherAPICall = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=imperial`;
                    const response = await fetch(weatherAPICall);
                    const weatherJSON = await response.json();
                    res.status(200).json(weatherJSON);
                } catch (error) {
                    console.log(error);
                    res.status(404).json({message: "Error finding weather data for the provided city."});
                }
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({message: "Error geocoding for the provided city."});
        }
    }
    fetchWeather();
});
app.use("/user", cors({origin: "http://localhost:5173", allowedHeaders: "Content-Type", credentials: true, method: ["GET", "POST", "OPTIONS"]}), userRouter);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));