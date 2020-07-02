// Send a query to beckend for hotels in marked area

document.getElementById('submit-button').addEventListener('click', () => {
    const data = {
        Latitude: +document.getElementById('lat').value,
        Longtitude: +document.getElementById('lng').value,
    };

    document.getElementById('loading-image').hidden = false;
    $.ajax({
        url: '/api/Properties/FindProperties',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (data, status) {

            document.getElementById('loading-image').hidden = true;
            const hotel = data[0];
            //Create element for hotel and add hotel information in it
            document.getElementById('found-hotel').innerHTML = `
    <div class="col-md-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${hotel.media.images.items[0].value}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${hotel.name}</h5>
                <p class="card-text">Address: ${hotel.location.address.text}</p>
                <p class="card-text" id=${hotel.placeId}><strong>Bookings: ${hotel.bookings}</strong></p>
                <a id="add-booking" onclick="addBooking('${hotel.placeId}')" class="btn btn-primary">Add Booking</a>
            </div>
        </div>
    </div>`
        },
        error: function (error) {
            document.getElementById('loading-image').hidden = true;
            console.error(error);
        }
    });
});