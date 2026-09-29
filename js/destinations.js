const destinations = [

    {
        name: "Ooty",
        state: "Tamil Nadu",
        image: "assets/images/ooty.jpg",
        description:
            "A beautiful hill station famous for its cool climate, tea gardens and scenic landscapes.",
        category: "Nature"
    },

    {
        name: "Coorg",
        state: "Karnataka",
        image: "assets/images/coorg.jpg",
        description:
            "Known for coffee plantations, waterfalls, forests and peaceful mountain views.",
        category: "Nature"
    },

    {
        name: "Munnar",
        state: "Kerala",
        image: "assets/images/munnar.jpg",
        description:
            "A scenic hill destination surrounded by tea plantations and green mountains.",
        category: "Nature"
    },

    {
        name: "Goa",
        state: "Goa",
        image: "assets/images/goa.jpg",
        description:
            "A popular coastal destination known for beaches, food, culture and nightlife.",
        category: "Beach"
    }

];


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const grid =
            document.getElementById(
                "destinationGrid"
            );

        const search =
            document.getElementById(
                "destinationSearch"
            );

        const filter =
            document.getElementById(
                "destinationFilter"
            );


        function renderDestinations() {

            const searchText =
                search.value
                    .toLowerCase()
                    .trim();

            const filterValue =
                filter.value;


            const filtered =
                destinations.filter(function (destination) {

                    const matchesSearch =
                        destination.name
                            .toLowerCase()
                            .includes(searchText);

                    const matchesFilter =
                        filterValue === "all" ||
                        destination.state === filterValue;

                    return (
                        matchesSearch &&
                        matchesFilter
                    );

                });


            grid.innerHTML = "";


            if (filtered.length === 0) {

                grid.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">
                            🔍
                        </div>

                        <h3>
                            No destinations found
                        </h3>

                        <p>
                            Try another search.
                        </p>
                    </div>
                `;

                return;
            }


            filtered.forEach(function (destination) {

                const card =
                    document.createElement("div");

                card.className =
                    "destination-card";


                card.innerHTML = `

                    <img
                        src="${destination.image}"
                        alt="${destination.name}">

                    <div class="destination-card-body">

                        <h3>
                            ${destination.name}
                        </h3>

                        <p>
                            ${destination.description}
                        </p>

                        <div class="destination-meta">

                            <span>
                                📍 ${destination.state}
                            </span>

                            <span>
                                🌿 ${destination.category}
                            </span>

                        </div>

                        <button
                            class="btn btn-primary"
                            onclick="selectDestination('${destination.name}')">

                            Select Destination →

                        </button>

                    </div>
                `;


                grid.appendChild(card);

            });

        }


        search.addEventListener(
            "input",
            renderDestinations
        );

        filter.addEventListener(
            "change",
            renderDestinations
        );


        renderDestinations();

    }
);


function selectDestination(name) {

    let trip =
        JSON.parse(
            localStorage.getItem(
                "travelmateTrip"
            )
        ) || {};


    trip.destination = name;


    localStorage.setItem(
        "travelmateTrip",
        JSON.stringify(trip)
    );


    window.location.href =
        "itinerary.html";
}
