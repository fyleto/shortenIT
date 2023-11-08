const bcrypt = require("bcrypt");

// Function to generate a salt and hash the password
async function encryptPassword(password) {
    const saltRounds = 10; // Number of salt rounds for bcrypt to use
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return { encrypted: hash, salt: salt };
}

// Function to compare a password with its encrypted counterpart
async function comparePassword(password, encryptedPassword) {
    return await bcrypt.compare(password, encryptedPassword);
}

function verifySessionToken(cookieSessionToken, databaseSessionToken) {
    return databaseSessionToken.getTime() !==
        new Date(parseInt(cookieSessionToken)).getTime()
        ? false
        : true;
}

function generateToken() {
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

class TryError {
    constructor(res, err) {
        console.log(err);
        return res.status(500).send("An Internal server Error ocurred!");
    }
}

const maxLinks = 20;

module.exports = {
    verifySessionToken,
    TryError,
    generateToken,
    encryptPassword,
    comparePassword,
    maxLinks,
};
