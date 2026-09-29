document.addEventListener(
    "DOMContentLoaded",
    function () {

        const container =
            document.getElementById(
                "itineraryContainer"
            );

        const subtitle =
            document.getElementById(
                "itinerarySubtitle"
            );


        const trip =
            JSON.parse(
                localStorage.getItem(
                    "travelmateTrip"
                )
            );


        if (!trip || !trip.destination) {

            container.innerHTML = `

                <div class="empty-state">

                    <div class="empty-state-icon">
                        🗺️
                    </div>

                    <h3>
                        No trip found
                    </h3>

                    <p>
                        Please create a trip first.
                    </p>

                    <a
                        href="dashboard.html"
                        class="btn btn-primary">

                        Create Trip

                    </a>

                </div>
            `;

            return;
        }


        subtitle.textContent =
            `${trip.destination} • ${trip.travelStyle || "Travel"} trip`;


        const plans = {

            Ooty: [
                ["Ooty Lake", "Morning sightseeing"],
                ["Botanical Garden", "Explore the gardens"],
                ["Doddabetta Peak", "Sunset viewpoint"]
            ],

            Coorg: [
                ["Abbey Falls", "Waterfall visit"],
                ["Coffee Plantation", "Coffee plantation tour"],
                ["Raja's Seat", "Sunset viewpoint"]
            ],

            Munnar: [
                ["Tea Gardens", "Explore tea plantations"],
                ["Mattupetty Dam", "Scenic mountain views"],
                ["Echo Point", "Nature and photography"]
            ],

            Goa: [
                ["Baga Beach", "Beach activities"],
                ["Fort Aguada", "Historical sightseeing"],
                ["Calangute Beach", "Relax and enjoy the coast"]
            ]

        };


        const activities =
            plans[trip.destination] ||
            plans["Ooty"];


        let html = "";


        activities.forEach(
            function (activity, index) {

                html += `

                    <div class="itinerary-day">

                        <div class="day-header">

                            <h2>
                                Day ${index + 1}
                            </h2>

                            <span class="day-badge">
                                ${trip.destination}
                            </span>

                        </div>

                        <div class="place-list">

                            <div class="place-item">

                                <div class="place-item-content">

                                    <h3>
                                        ${activity[0]}
                                    </h3>

                                    <p>
                                        ${activity[1]}
                                    </p>

                                    <div class="place-meta">

                                        <span>
                                            📍 ${trip.destination}
                                        </span>

                                        <span>
                                            🕘 ${index === 0 ? "09:00 AM" : "10:00 AM"}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                `;

            }
        );


        container.innerHTML = html;

    }
);
