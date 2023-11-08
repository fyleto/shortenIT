// Code below is code for checking if valid username and password (DONT EDIT)

function hasSpecialCharacters(input) {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return specialCharacters.test(input);
}

function hasNumbers(input) {
    const numbers = /[0-9]+/;
    return numbers.test(input);
}

function hasUppercaseLetters(input) {
    const uppercaseLetters = /[A-Z]+/;
    return uppercaseLetters.test(input);
}

function hasLowercaseLetters(input) {
    const lowercaseLetters = /[a-z]+/;
    return lowercaseLetters.test(input);
}

function passwordError(input) {
    document.getElementById("passwordError").innerText = input;
}

function usernameError(input) {
    document.getElementById("usernameError").innerText = input;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const password = document.getElementById("password").value;
        const username = document.getElementById("username").value;

        const userExistsResponse = await fetch("/api/userExists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        });

        const userExistsData = await userExistsResponse.json();

        if (userExistsData.exists) {
            return usernameError("User with username already exists!");
        }
        if (hasSpecialCharacters(username))
            return usernameError("Username cannot contain special characters.");
        if (username.length < 4) return usernameError("Username is too short.");

        if (!hasNumbers(password))
            return passwordError("Password does not contain numbers!");
        if (!hasLowercaseLetters(password))
            return passwordError(
                "Password does not contain lowercase letters!"
            );
        if (!hasUppercaseLetters(password))
            return passwordError(
                "Password does not contain uppercase letters!"
            );
        if (!hasSpecialCharacters(password))
            return passwordError(
                "Password does not contain special characters!"
            );
        if (password.length < 8)
            return passwordError(
                "Password is too short! (Minimum 8 characters long)"
            );

        form.submit();
    });
});
