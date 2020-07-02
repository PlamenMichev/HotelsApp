// Send request to beckend to add booking for a particular property

function addBooking(propertyId) {
    console.log('Property id', propertyId);
    const data = {
        HotelId: propertyId,
    }
    $.ajax({
        url: '/api/Properties/AddBookingToProperty',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (data) {
            //Change booking count
            document.getElementById(propertyId).innerHTML = `<strong>Bookings: ${data}</strong>`
        },
        error: function (error) {
            document.getElementById('loading-image').hidden = true;
            console.error(error);
        }
    });
}