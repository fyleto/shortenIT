const path = require("path");
const Link = require("../../linkSchema");
const { linkAndId, TryError } = require("../../util");

const get = (req, res) => {
    return res.status(200).sendFile(path.join(__dirname + "/page.html"));
};

// Route to handle the form submission and create a new post
const post = async (req, res) => {
    try {
        const longLink = req.body.link;
        const user = JSON.parse(req.cookies.user)["_doc"];

        const [id, path, https] = linkAndId(longLink);

        const link = new Link({
            id,
            authorId: user.id,
            path,
            https,
        });

        await link.save();

        await res.redirect(path.join(`../`));
    } catch (error) {
        throw new TryError(res, error);
    }
};

module.exports = { get, post };
