import * as bcrypt from "bcrypt";
import { nanoid } from "nanoid";

// Function to generate a salt and hash the password
export async function encryptPassword(password) {
    const saltRounds = 10; // Number of salt rounds for bcrypt to use
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return { encrypted: hash, salt: salt };
}

// Function to compare a password with its encrypted counterpart
export async function comparePassword(password, encryptedPassword) {
    return await bcrypt.compare(password, encryptedPassword);
}

export function verifySessionToken(cookieSessionToken, databaseSessionToken) {
    return databaseSessionToken.getTime() !==
        new Date(parseInt(cookieSessionToken)).getTime()
        ? false
        : true;
}

export function generateToken() {
    // Get the current date in milliseconds
    const currentDate = new Date();
    const currentDateMs = currentDate.getTime();

    // Calculate milliseconds in 40 days
    const daysToAdd = 40;
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const daysInMilliseconds = daysToAdd * millisecondsInADay;

    // Calculate the future date in milliseconds
    const futureDateMs = currentDateMs + daysInMilliseconds;

    // Create a new Date object with the future date
    const futureDate = new Date(futureDateMs);

    return futureDate.setMilliseconds(0);
}

export class TryError {
    constructor(res, err) {
        console.log(err);
        return res.status(500).send("An Internal server Error ocurred!");
    }
}

export const maxLinks = 20;

/**
 *
 * @param {String} link
 */
export function linkAndId(link) {
    const id = nanoid(8);
    const path = link;
    const https = link.includes("https") == true ? true : false;
    return [id, path, https];
}
/*
module.exports = {
    verifySessionToken,
    TryError,
    generateToken,
    encryptPassword,
    comparePassword,
    maxLinks,
    linkAndId,
};
*/
