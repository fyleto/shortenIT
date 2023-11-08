const { validateSessionFriendly } = require("./_auth/isSignedIn");
const { TryError } = require("../util");

async function render(req, res) {
    const signedIn = await validateSessionFriendly(req);
    res.render("home", {
        signedIn: signedIn.output,
        userId: signedIn.userId,
    });
}

const get = async (req, res) => {
    try {
        await render(req, res);
    } catch (error) {
        throw new TryError(res, error);
    }
};

module.exports = { get };
