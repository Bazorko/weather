const express = require("express");
const cookieParser = require("cookie-parser");
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
app.use("/user", userRouter);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));