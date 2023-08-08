import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import userRoute from "./routes/user.js";
import colors from "colors";
import db from "./config/mongoose.js";
import expressLayout from "express-ejs-layouts";

const app = express();

//configure Env
dotenv.config();

//database connection
db();

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", "./views");

// app.get("/", (req, res) => {
//   return res.json("This is my running server");
// });
app.use(expressLayout);

app.use("/", routes);
app.use("/user", userRoute);

const port = process.env.PORT || 6000;

//Starting a server
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in Running server ${err}`);
  }
  console.log(`Server is running on port ${port}`.bgCyan.white);
});
