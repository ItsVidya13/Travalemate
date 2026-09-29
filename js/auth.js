document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    function showMessage(message, type) {

        if (!loginMessage) return;

        loginMessage.textContent = message;
        loginMessage.className = "form-message " + type;
    }


    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value.trim();

            const remember =
                document.getElementById("rememberMe")?.checked;


            if (!email || !password) {

                showMessage(
                    "Please enter username and password.",
                    "error"
                );

                return;
            }


            if (
                (email === "demo" ||
                 email === "demo@example.com") &&
                password === "123456"
            ) {

                const user = {
                    name: "Demo User",
                    email: "demo@example.com",
                    phone: "+91 9876543210"
                };

                localStorage.setItem(
                    "travelmateLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "travelmateUser",
                    JSON.stringify(user)
                );

                if (remember) {

                    localStorage.setItem(
                        "travelmateRemember",
                        "true"
                    );

                } else {

                    localStorage.removeItem(
                        "travelmateRemember"
                    );
                }


                showMessage(
                    "Login successful! Redirecting...",
                    "success"
                );


                setTimeout(function () {

                    window.location.href =
                        "dashboard.html";

                }, 700);

            } else {

                showMessage(
                    "Invalid login. Use demo / 123456.",
                    "error"
                );
            }

        });
    }


    const forgotPassword =
        document.getElementById("forgotPassword");

    if (forgotPassword) {

        forgotPassword.addEventListener("click", function (event) {

            event.preventDefault();

            alert(
                "Demo password is: 123456"
            );

        });
    }


    const createAccount =
        document.getElementById("createAccount");

    if (createAccount) {

        createAccount.addEventListener("click", function (event) {

            event.preventDefault();

            alert(
                "Registration is not connected to a backend yet. Use demo / 123456."
            );

        });
    }

});
