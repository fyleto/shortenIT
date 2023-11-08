import { User } from "../../userSchema.js";
import { verifySessionToken } from "../../util.js";

/**
 * validates if signed in when accessing a part of the site that needs it.
 */
export async function validateSession(req, res, next) {
    const sessionToken = req.cookies.sessionToken;
    const userCookie = req.cookies.user;
    const parsedUserCookie =
        userCookie !== undefined ? JSON.parse(userCookie) : undefined;

    if (!parsedUserCookie) {
        // no cookie is saved.
        return res.redirect("/signin");
    }

    let query = { id: parsedUserCookie["_doc"].id };
    const user = await User.findOne(query);

    if (!user) {
        // user doesnt ecxist in db
        return res
            .status(404)
            .send(
                "Account not found? Are you logged into a deleted account? If so how the hell"
            );
    }

    if (
        user.password.encrypted !== parsedUserCookie["_doc"].password.encrypted
    ) {
        // password has been changed, so clear cookies and redirect to /signin.
        // Either the password has been changed or the cookie has been tampered with.
        const cookies = req.cookies;

        for (const cookieName in cookies) {
            res.clearCookie(cookieName);
        }
        return res.redirect("/signin");
    }

    if (!sessionToken || !verifySessionToken(sessionToken, user.sessionToken)) {
        // sessionToken validation
        return res.redirect("/signin");
    }

    if (new Date(parseInt(sessionToken)) < Date.now()) {
        // check if session is valid
        return res.redirect("/signin");
    }

    next();
}

/**
 * Friendlier version to add/remove sign in/up buttons in ejs
 */
export async function validateSessionFriendly(req) {
    try {
        const userCookies = req.cookies.user;
        return {
            output: !userCookies ? false : true,
            userId: !userCookies
                ? undefined
                : JSON.parse(userCookies)["_doc"].id,
            username: !userCookies
                ? undefined
                : JSON.parse(userCookies)["_doc"].username,
        };
    } catch (error) {
        console.log(error);
    }
}

/**
 * Check if user is author in user path
 */
export async function isAuthor(req, id) {
    try {
        const { userId } = await validateSessionFriendly(req);
        if (!userId) {
            return false;
        } else {
            return userId == id ? true : false;
        }
    } catch (error) {
        console.log(error);
    }
}
