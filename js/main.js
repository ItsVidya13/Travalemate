document.addEventListener("DOMContentLoaded", function () {

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const navLinks =
        document.getElementById("navLinks");


    if (mobileMenuBtn && navLinks) {

        mobileMenuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("show");

        });

    }


    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function (event) {

            event.preventDefault();

            localStorage.removeItem(
                "travelmateLoggedIn"
            );

            localStorage.removeItem(
                "travelmateUser"
            );

            window.location.href =
                "login.html";

        });

    }


    const tripForm =
        document.getElementById("tripForm");


    if (tripForm) {

        tripForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const destination =
                    document.getElementById(
                        "destination"
                    ).value;

                const travelers =
                    document.getElementById(
                        "travelers"
                    ).value;

                const startDate =
                    document.getElementById(
                        "startDate"
                    ).value;

                const endDate =
                    document.getElementById(
                        "endDate"
                    ).value;

                const budget =
                    document.getElementById(
                        "budget"
                    ).value;

                const travelStyle =
                    document.getElementById(
                        "travelStyle"
                    ).value;


                if (!destination ||
                    !travelers ||
                    !startDate ||
                    !endDate) {

                    alert(
                        "Please fill all required fields."
                    );

                    return;
                }


                if (
                    new Date(endDate) <
                    new Date(startDate)
                ) {

                    alert(
                        "End date cannot be before start date."
                    );

                    return;
                }


                const trip = {

                    destination,
                    travelers:
                        Number(travelers),

                    startDate,
                    endDate,

                    budget,
                    travelStyle

                };


                localStorage.setItem(
                    "travelmateTrip",
                    JSON.stringify(trip)
                );


                window.location.href =
                    "destinations.html";

            }
        );

    }


    const resetTrip =
        document.getElementById("resetTrip");


    if (resetTrip) {

        resetTrip.addEventListener("click", function () {

            tripForm.reset();

        });

    }

});
