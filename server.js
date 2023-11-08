import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as mongoose from "mongoose";
import path from "path";
import * as ejs from "ejs";
import cookieParser from "cookie-parser";

const port = 3000;
const app = express();

import { validateSession } from "./public/_auth/isSignedIn.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));

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

import * as home from "./public/home.js";
app.get("/", home.get); // home page

app.get("/user/:id"); // user's posts and profile

import * as create from "./public/new/exports.js";
app.get("/new", validateSession, create.get); // create a post
app.post("/new", create.post); // create a post,  backend

import * as link from "./public/link/exports.js";
app.get("/l/:id", link.get); // view a post
app.post("/l/:id"); // delete a post
app.get("/l/:id/edit"); // edit a post
app.post("/l/:id/edit"); // edit a post, backend

/*
app.get("/tos", tos); // ToS
*/
import * as signup from "./public/signup/exports.js";
app.get("/signup", signup.get); // signup page
app.post("/signup", signup.post); // signup page, backend
import * as signin from "./public/signin/exports.js";
app.get("/signin", signin.get); // signin page
app.post("/signin", signin.post); // signin page, backend
import * as signout from "./public/signout/exports.js";
app.get("/signout", signout.get); // signout page

// API
import * as api from "./api.js";
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
