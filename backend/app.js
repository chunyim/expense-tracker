const express = require("express");
const cors = require("cors");
const app = express();
const { dbConnect } = require("./db/db");
require("dotenv").config();
const routes = require("./routes/transactions");
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/", routes);

const startServer = () => {
  dbConnect();
  app.listen(PORT, () => {
    console.log("listening on port: ", PORT);
  });
};

startServer();
