const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");
const StudentRoutes = require("./routes/StudentRoutes");

const app = express();
dotenv.config();
app.use(bodyparser.json());

//using cors --> accessing the routes from any domain
app.use(cors({ origin: "*" }));

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch((error) => {
    console.log("Error is : ", error);
  });

app.use("/students", StudentRoutes);

app.listen(port, () => {
  console.log(`SERVER STARTED RUNNING ON SERVER ${port}`);
});
