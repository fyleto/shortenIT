import { User } from "./userSchema.js";
import { comparePassword } from "./util.js";

export const userExists = async (req, res) => {
    try {
        const username = req.body.username;
        const query = { username };
        let user = await User.findOne(query);
        let response;
        response = { exists: !user ? false : true };

        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const correctPassword = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const query = { username };
        let user = await User.findOne(query);

        if (!user) { console.log("does not exist."); return res.status(404).send({ error: "user not found." }); }

        let status = await comparePassword(password, user.password.encrypted);
        let response;
        response = { correct: !status ? false : true };

        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
