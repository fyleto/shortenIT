import * as RealPath from "path";
import { Link } from "../../linkSchema.js";
import { User } from "../../userSchema.js";
import { linkAndId, TryError } from "../../util.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const get = (req, res) => {
    return res.status(200).sendFile(RealPath.join(__dirname + "/page.html"));
};

// Route to handle the form submission and create a new post
export const post = async (req, res) => {
    try {
        const longLink = req.body.link;
        let userCookie = JSON.parse(req.cookies.user)["_doc"];
        var user = await User.findOne({ id: userCookie.id });

        const [id, path, https] = linkAndId(longLink);

        const link = new Link({
            id,
            authorId: userCookie._id,
            path,
            https,
        });

        user.links.amountUsed++;
        user.links.ids.push(id);

        await link.save();
        await user.save();

        await res.redirect(RealPath.join(`../`));
    } catch (error) {
        throw new TryError(res, error);
    }
};
