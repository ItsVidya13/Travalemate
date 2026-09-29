/* =========================================
   TRAVELMATE - QUERY ASSISTANT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const queryButton =
        document.getElementById("queryButton");

    const queryPanel =
        document.getElementById("queryPanel");

    const queryClose =
        document.getElementById("queryClose");

    const queryForm =
        document.getElementById("queryForm");

    const queryInput =
        document.getElementById("queryInput");

    const queryMessages =
        document.getElementById("queryMessages");


    /* OPEN */

    if (queryButton && queryPanel) {

        queryButton.addEventListener(
            "click",
            function () {

                queryPanel.classList.toggle("show");

            }
        );

    }


    /* CLOSE */

    if (queryClose) {

        queryClose.addEventListener(
            "click",
            function () {

                queryPanel.classList.remove("show");

            }
        );

    }


    /* =========================================
       QUERY RESPONSE
    ========================================= */

    if (queryForm) {

        queryForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const question =
                    queryInput.value
                        .trim()
                        .toLowerCase();

                if (!question) return;


                addMessage(
                    queryInput.value,
                    "user"
                );


                let response =
                    "You can edit your trip from the Trip Plan section.";


                if (
                    question.includes("hotel")
                ) {

                    response =
                        "Sure! Go to the Hotels page and select another available hotel.";

                }

                else if (
                    question.includes("date")
                ) {

                    response =
                        "You can change your travel dates from the trip planning section.";

                }

                else if (
                    question.includes("remove") ||
                    question.includes("place")
                ) {

                    response =
                        "Open your itinerary and remove the place you no longer want to visit.";

                }

                else if (
                    question.includes("cost") ||
                    question.includes("price")
                ) {

                    response =
                        "Your estimated hotel, travel and activity costs are shown on the Trip Summary page.";

                }

                else if (
                    question.includes("destination")
                ) {

                    response =
                        "You can return to the Destinations page and choose another destination.";

                }

                else if (
                    question.includes("budget")
                ) {

                    response =
                        "You can select a budget and choose hotels according to your preferred price range.";

                }


                setTimeout(function () {

                    addMessage(
                        response,
                        "assistant"
                    );

                }, 300);


                queryInput.value = "";

            }
        );

    }


    /* =========================================
       ADD MESSAGE
    ========================================= */

    function addMessage(message, sender) {

        if (!queryMessages) return;

        const div =
            document.createElement("div");

        div.className =
            "query-message " + sender;

        div.textContent = message;

        queryMessages.appendChild(div);

        queryMessages.scrollTop =
            queryMessages.scrollHeight;

    }

});
