import { Link } from "../../linkSchema.js";
import { TryError } from "../../util.js";

export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const link = await Link.findOne({ id });

        if (!link) return res.status(404);
        let redirect = link.path;

        return res.status(200).redirect(redirect);
    } catch (err) {
        throw new TryError(res, err);
    }
};
