require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const port = 3000;
const cookieParser = require("cookie-parser");
const app = express();

const { validateSession } = require("./public/_auth/isSignedIn");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));
/*
mongoose
    .connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB Atlas!");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB Atlas:", err);
    });
*/
app.get("/", home.get); // home page

app.get("/user/:id"); // user's posts and profile
app.get("/create", validateSession); // create a post
app.post("/create"); // create a post,  backend

app.get("/l/:id"); // view a post
app.post("/l/:id"); // delete a post
app.get("/l/:id/edit"); // edit a post
app.post("/l/:id/edit"); // edit a post, backend

app.get("/tos", tos); // ToS

const signup = require("./public/signup/exports");
app.get("/signup", signup.get); // signup page
app.post("/signup", signup.post); // signup page, backend
const signin = require("./public/signin/exports");
app.get("/signin", signin.get); // signin page
app.post("/signin", signin.post); // signin page, backend
const signout = require("./public/signout/exports");
app.get("/signout", signout); // signout page

// API
app.post("/api/userExists", api.userExists);
app.post("/api/correctPassword", api.correctPassword);

// 404 redirect for invalids URLS
app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, "/public", "/_404", "/404.html")
    );
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
