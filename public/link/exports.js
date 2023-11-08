const Link = require("../../linkSchema");
var url = require("url");
const { TryError } = require("../../util");

const get = (req, res) => {
    try {
        const id = req.params.id;
        const link = Link.findOne({ id });

        if (!link) return res.status(404);
        let redirect = link.path;

        return res.status(200).redirect(redirect);
    } catch (err) {
        throw new TryError(res, error);
    }
};

module.exports = { get };
