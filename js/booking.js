document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // GET SAVED DATA
    // =====================================================

    let trip = null;
    let hotel = null;

    try {
        trip = JSON.parse(
            localStorage.getItem("travelmateTrip") || "null"
        );

        hotel = JSON.parse(
            localStorage.getItem("travelmateHotel") || "null"
        );

    } catch (error) {
        console.error("Could not read saved trip data:", error);
    }


    // =====================================================
    // ELEMENTS
    // =====================================================

    const bookingIdEl =
        document.getElementById("bookingId");

    const bookingDestinationEl =
        document.getElementById("bookingDestination");

    const bookingDaysEl =
        document.getElementById("bookingDays");

    const bookingTravelersEl =
        document.getElementById("bookingTravelers");

    const bookingHotelEl =
        document.getElementById("bookingHotel");

    const bookingPriceEl =
        document.getElementById("bookingPrice");

    const bookingTotalEl =
        document.getElementById("bookingTotal");

    const bookingStartingEl =
        document.getElementById("bookingStarting");

    const bookingDateEl =
        document.getElementById("bookingDate");

    const confirmBookingBtn =
        document.getElementById("confirmBookingBtn");


    // =====================================================
    // CHECK DATA
    // =====================================================

    if (!trip) {

        alert("No trip found. Please plan your trip first.");

        window.location.href = "dashboard.html";

        return;
    }


    if (!hotel) {

        alert("Please select a hotel first.");

        window.location.href = "hotels.html";

        return;
    }


    // =====================================================
    // TRIP VALUES
    // =====================================================

    const days =
        Number(trip.days) > 0
            ? Number(trip.days)
            : 1;

    const travelers =
        Number(trip.travelers) > 0
            ? Number(trip.travelers)
            : 1;

    const hotelPrice =
        Number(hotel.price) > 0
            ? Number(hotel.price)
            : 0;


    // =====================================================
    // TOTAL CALCULATION
    // =====================================================
    //
    // Hotel price = price per night
    //
    // Total hotel cost:
    //
    // price × nights
    //
    // We are NOT multiplying by travelers because
    // the hotel price is treated as the room price.
    //
    // =====================================================

    const nights = Math.max(days - 1, 1);

    const hotelTotal =
        hotelPrice * nights;


    // Example:
    //
    // ₹3500/night
    // 3 days
    //
    // 2 nights × ₹3500
    // = ₹7000


    // =====================================================
    // GENERATE BOOKING ID
    // =====================================================

    let booking =
        JSON.parse(
            localStorage.getItem("travelmateBooking") || "null"
        );


    if (!booking) {

        booking = {

            id:
                "TM-" +
                Date.now().toString().slice(-8),

            destination:
                trip.destination,

            days:
                days,

            travelers:
                travelers,

            startingLocation:
                trip.startingLocation || "Not specified",

            hotel:
                hotel.name,

            hotelPrice:
                hotelPrice,

            nights:
                nights,

            total:
                hotelTotal,

            status:
                "Confirmed",

            date:
                new Date().toLocaleDateString("en-IN")

        };


        localStorage.setItem(
            "travelmateBooking",
            JSON.stringify(booking)
        );

    }


    // =====================================================
    // DISPLAY BOOKING INFORMATION
    // =====================================================

    if (bookingIdEl) {

        bookingIdEl.textContent =
            booking.id;

    }


    if (bookingDestinationEl) {

        bookingDestinationEl.textContent =
            trip.destination;

    }


    if (bookingDaysEl) {

        bookingDaysEl.textContent =
            days + (days === 1 ? " Day" : " Days");

    }


    if (bookingTravelersEl) {

        bookingTravelersEl.textContent =
            travelers +
            (travelers === 1 ? " Traveler" : " Travelers");

    }


    if (bookingHotelEl) {

        bookingHotelEl.textContent =
            hotel.name;

    }


    if (bookingPriceEl) {

        bookingPriceEl.textContent =
            "₹" +
            hotelPrice.toLocaleString("en-IN") +
            " / night";

    }


    if (bookingTotalEl) {

        bookingTotalEl.textContent =
            "₹" +
            hotelTotal.toLocaleString("en-IN");

    }


    if (bookingStartingEl) {

        bookingStartingEl.textContent =
            trip.startingLocation || "Not specified";

    }


    if (bookingDateEl) {

        bookingDateEl.textContent =
            booking.date;

    }


    // =====================================================
    // CONFIRM BUTTON
    // =====================================================

    if (confirmBookingBtn) {

        confirmBookingBtn.addEventListener(
            "click",
            function () {

                booking.status = "Confirmed";

                localStorage.setItem(
                    "travelmateBooking",
                    JSON.stringify(booking)
                );


                alert(
                    "Booking confirmed successfully!"
                );


                window.location.href =
                    "booking.html";

            }
        );

    }

});