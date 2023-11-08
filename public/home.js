import { validateSessionFriendly } from "./_auth/isSignedIn.js";
import { TryError } from "../util.js";

async function render(req, res) {
    const signedIn = await validateSessionFriendly(req);
    res.render("home", {
        signedIn: signedIn.output,
        userId: signedIn.userId,
    });
}

export const get = async (req, res) => {
    try {
        await render(req, res);
    } catch (error) {
        throw new TryError(res, error);
    }
};
