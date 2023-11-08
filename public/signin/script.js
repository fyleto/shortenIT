function passwordError(input) {
    document.getElementById("passwordError").innerText = input;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const password = document.getElementById("password").value;
        const username = document.getElementById("username").value;
        const cpResponse = await fetch("/api/correctPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
        });

        const cpData = await cpResponse.json();
        if (!cpResponse.ok) return passwordError("user does not exist?");

        if (!cpData.correct) {
            return passwordError("Incorrect password, noob");
        }

        form.submit();
    });
});
