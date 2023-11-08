const User = require("../../userSchema");
const { generateToken, TryError } = require("../../util");
const path = require("path");

const get = (req, res) => {
    res.sendFile(path.join(__dirname + "/page.html"));
};

const post = async (req, res) => {
    try {
        const username = req.body.username;
        const sessiontoken = generateToken();

        // Find the user by their username
        let user = await User.findOne({ username: username });

        user.sessionToken = sessiontoken;
        user.save();

        // Successful authentication
        let { sessionToken, ...userData } = user;
        res.cookie("user", JSON.stringify(userData));
        res.cookie("sessionToken", sessiontoken.toString());

        res.redirect(path.join(`/`));
    } catch (error) {
        throw new TryError(res, error);
    }
};

module.exports = { get, post };
