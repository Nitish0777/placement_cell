import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import routes from "./routes/index.js";
import userRoute from "./routes/user.js";
import colors from "colors";
import MongoStore from "connect-mongo";
import passport from "passport";
import db from "./config/mongoose.js";
import passportLocal from "./config/passport-local.js";
import expressLayout from "express-ejs-layouts";
import student from "./routes/student.js";
import cookieParser from "cookie-parser";

const app = express();

//configure Env
dotenv.config();

//database connection
db();

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   return res.json("This is my running server");
// });
app.use(
  session({
    name: "auth",
    //to do change the secret before depoyment in production mode
    secret: " blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      autoRemove: "disabled",
    }),
  })
);

app.use(cookieParser());
app.use(expressLayout);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use("/", routes);
app.use("/user", userRoute);
app.use("/student", student);

const port = process.env.PORT || 6000;

//Starting a server
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in Running server ${err}`);
  }
  console.log(`Server is running on port ${port}`.bgCyan.white);
});
