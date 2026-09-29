document.addEventListener("DOMContentLoaded", function () {

const hotelGrid = document.getElementById("hotelGrid");
const hotelSearch = document.getElementById("hotelSearch");
const priceFilter = document.getElementById("priceFilter");
const ratingFilter = document.getElementById("ratingFilter");
const hotelSort = document.getElementById("hotelSort");

const hotelModal = document.getElementById("hotelModal");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalLocation = document.getElementById("modalLocation");
const modalDescription = document.getElementById("modalDescription");
const modalFacilities = document.getElementById("modalFacilities");
const modalPrice = document.getElementById("modalPrice");
const modalSelect = document.getElementById("modalSelect");

const hotelDestination =
    document.getElementById("hotelDestination");


/*
========================================================
HOTEL DATA
========================================================
*/

const hotels = [

    {
        id: 1,
        name: "The Grand Palace",
        location: "Chennai",
        price: 3500,
        rating: 4.6,
        image: "assets/images/hotel11.jpg",
        description:
            "A comfortable premium hotel with modern rooms, excellent service and convenient city access.",
        facilities: [
            "Free WiFi",
            "Breakfast",
            "Swimming Pool",
            "AC",
            "Parking"
        ]
    },

    {
        id: 2,
        name: "Ocean View Resort",
        price: 4800,
        rating: 4.8,
        image: "assets/images/hotel12.jpg",
        description:
            "A relaxing resort with beautiful views, spacious rooms and a peaceful atmosphere.",
        facilities: [
            "Free WiFi",
            "Beach Access",
            "Pool",
            "Restaurant",
            "AC"
        ]
    },

    {
        id: 3,
        name: "Royal Heritage Hotel",
        price: 2900,
        rating: 4.4,
        image: "assets/images/hotel13.jpg",
        description:
            "Experience traditional Indian hospitality with comfortable rooms and heritage-inspired design.",
        facilities: [
            "Free WiFi",
            "Restaurant",
            "Breakfast",
            "AC",
            "Parking"
        ]
    },

    {
        id: 4,
        name: "Mountain Escape",
        price: 3200,
        rating: 4.5,
        image: "assets/images/hotel14.jpg",
        description:
            "A peaceful mountain stay surrounded by beautiful scenery and fresh air.",
        facilities: [
            "Free WiFi",
            "Mountain View",
            "Restaurant",
            "Room Service",
            "Parking"
        ]
    },

    {
        id: 5,
        name: "City Comfort Inn",
        price: 2200,
        rating: 4.2,
        image: "assets/images/hotel15.jpg",
        description:
            "Affordable and comfortable accommodation for travelers looking for a convenient city stay.",
        facilities: [
            "Free WiFi",
            "Breakfast",
            "AC",
            "Parking"
        ]
    },

    {
        id: 6,
        name: "Lakeview Luxury Hotel",
        price: 5500,
        rating: 4.9,
        image: "assets/images/hotel16.jpg",
        description:
            "A luxury hotel offering elegant rooms, scenic lake views and premium hospitality.",
        facilities: [
            "Free WiFi",
            "Lake View",
            "Swimming Pool",
            "Spa",
            "Restaurant"
        ]
    }

];


/*
========================================================
READ TRIP
========================================================
*/

let trip = null;

try {
    trip = JSON.parse(
        localStorage.getItem("travelmateTrip") || "null"
    );
} catch (error) {
    trip = null;
}


if (trip && trip.destination) {

    hotelDestination.textContent =
        "Hotels available for your trip to " +
        trip.destination + ".";

}


/*
========================================================
DISPLAY HOTELS
========================================================
*/

function displayHotels() {

    let filteredHotels = [...hotels];


    // Search

    const search =
        hotelSearch.value
            .trim()
            .toLowerCase();

    if (search) {

        filteredHotels =
            filteredHotels.filter(function (hotel) {

                return (
                    hotel.name.toLowerCase().includes(search) ||
                    hotel.location.toLowerCase().includes(search)
                );

            });

    }


    // Price

    const maxPrice =
        Number(priceFilter.value);

    if (maxPrice > 0) {

        filteredHotels =
            filteredHotels.filter(function (hotel) {

                return hotel.price <= maxPrice;

            });

    }


    // Rating

    const minRating =
        Number(ratingFilter.value);

    if (minRating > 0) {

        filteredHotels =
            filteredHotels.filter(function (hotel) {

                return hotel.rating >= minRating;

            });

    }


    // Sorting

    if (hotelSort.value === "low") {

        filteredHotels.sort(function (a, b) {
            return a.price - b.price;
        });

    }

    else if (hotelSort.value === "high") {

        filteredHotels.sort(function (a, b) {
            return b.price - a.price;
        });

    }

    else if (hotelSort.value === "rating") {

        filteredHotels.sort(function (a, b) {
            return b.rating - a.rating;
        });

    }


    // No results

    if (filteredHotels.length === 0) {

        hotelGrid.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    🏨
                </div>

                <h3>
                    No hotels found
                </h3>

                <p>
                    Try changing your filters.
                </p>

            </div>

        `;

        return;
    }


    // Cards

    hotelGrid.innerHTML =
        filteredHotels.map(function (hotel) {

            return `

                <article class="hotel-card">

                    <img
                        src="${hotel.image}"
                        alt="${hotel.name}"
                        onerror="this.src='assets/images/hero.jpg'"
                    >

                    <div class="hotel-body">

                        <h3>
                            ${hotel.name}
                        </h3>

                        <div class="hotel-location">
                            📍 ${hotel.location}
                        </div>

                        <div class="hotel-rating">

                            <span class="stars">
                                ★★★★★
                            </span>

                            <strong>
                                ${hotel.rating}
                            </strong>

                        </div>

                        <p class="hotel-description">
                            ${hotel.description}
                        </p>

                        <div class="hotel-facilities">

                            ${hotel.facilities.map(function (facility) {

                                return `
                                    <span class="facility">
                                        ${facility}
                                    </span>
                                `;

                            }).join("")}

                        </div>

                        <div class="hotel-price">

                            <strong>
                                ₹${hotel.price.toLocaleString("en-IN")}
                            </strong>

                            <span>
                                / night
                            </span>

                        </div>

                        <div class="hotel-actions">

                            <button
                                class="btn btn-outline"
                                style="
                                    color:var(--primary);
                                    border-color:var(--border);
                                    background:white;
                                "
                                onclick="viewHotel(${hotel.id})">

                                Details

                            </button>

                            <button
                                class="btn btn-primary"
                                onclick="selectHotel(${hotel.id})">

                                Select

                            </button>

                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


/*
========================================================
VIEW HOTEL
========================================================
*/

window.viewHotel = function (id) {

    const hotel =
        hotels.find(function (item) {
            return item.id === id;
        });

    if (!hotel) return;


    modalImage.src = hotel.image;
    modalImage.onerror = function () {
        this.src = "assets/images/hero.jpg";
    };

    modalName.textContent = hotel.name;

    modalLocation.textContent =
        "📍 " + hotel.location +
        " • ⭐ " + hotel.rating;

    modalDescription.textContent =
        hotel.description;

    modalPrice.textContent =
        "₹" + hotel.price.toLocaleString("en-IN");

    modalFacilities.innerHTML =
        hotel.facilities.map(function (facility) {

            return `
                <span class="facility">
                    ${facility}
                </span>
            `;

        }).join("");

    modalSelect.onclick = function () {
        selectHotel(hotel.id);
    };

    hotelModal.classList.add("show");

};


/*
========================================================
SELECT HOTEL
========================================================
*/

window.selectHotel = function (id) {

    const hotel =
        hotels.find(function (item) {
            return item.id === id;
        });

    if (!hotel) return;


    localStorage.setItem(
        "travelmateHotel",
        JSON.stringify(hotel)
    );


    hotelModal.classList.remove("show");


    alert(
        hotel.name +
        " has been selected successfully!"
    );


    window.location.href =
        "booking.html";

};


/*
========================================================
CLOSE MODAL
========================================================
*/

modalClose.addEventListener(
    "click",
    function () {

        hotelModal.classList.remove("show");

    }
);


hotelModal.addEventListener(
    "click",
    function (event) {

        if (event.target === hotelModal) {

            hotelModal.classList.remove("show");

        }

    }
);


/*
========================================================
FILTER EVENTS
========================================================
*/

hotelSearch.addEventListener(
    "input",
    displayHotels
);

priceFilter.addEventListener(
    "input",
    displayHotels
);

ratingFilter.addEventListener(
    "change",
    displayHotels
);

hotelSort.addEventListener(
    "change",
    displayHotels
);


/*
========================================================
INITIAL LOAD
========================================================
*/

displayHotels();


});