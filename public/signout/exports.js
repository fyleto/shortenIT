const path = require("path");
const { TryError } = require("../../util");

module.exports = (req, res) => {
    try {
        res.clearCookie("user", { path: "/" });
        res.clearCookie("sessionToken", { path: "/" });

        res.sendFile(path.join(__dirname + "/page.html"));
    } catch (error) {
        throw new TryError(res, error);
    }
};
