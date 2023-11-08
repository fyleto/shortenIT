import { User } from "../../userSchema.js";
import path from "path";
import { generateToken, encryptPassword, TryError } from "../../util.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Route to handle the form submission and create a new post
export const post = async (req, res) => {
    try {
        const username = req.body.username;
        const pass = req.body.password;
        const sessiontoken = generateToken();

        const password = await encryptPassword(pass);
        let userObject = {
            username,
            password,
            sessionToken: sessiontoken,
        };
        let user = new User(userObject);

        let { sessionToken, ...userData } = user;
        res.cookie("user", JSON.stringify(userData));
        res.cookie("sessionToken", sessiontoken.toString());

        await user.save();

        // Redirect to the newly created post's page (assuming blog has an "_id" field)
        res.redirect(path.join(`/`));
    } catch (error) {
        throw new TryError(res, error);
    }
};

export const get = (req, res) => {
    res.sendFile(path.join(__dirname + "/page.html"));
};
