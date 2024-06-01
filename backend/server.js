const express = require("express");
const userRouter = require("./routes/userRoutes");

const app = express();

//Settings
app.use(express.json());

//Routes
app.use("/user", userRouter);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));