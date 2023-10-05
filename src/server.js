import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8069;

// config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connect with db

connection();

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(">>> JWT BACKEND is running on the port=" + PORT);
});
