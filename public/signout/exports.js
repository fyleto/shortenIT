import path from "path";
import { TryError } from "../../util.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const get = (req, res) => {
    try {
        res.clearCookie("user", { path: "/" });
        res.clearCookie("sessionToken", { path: "/" });

        res.sendFile(path.join(__dirname + "/page.html"));
    } catch (error) {
        throw new TryError(res, error);
    }
};
