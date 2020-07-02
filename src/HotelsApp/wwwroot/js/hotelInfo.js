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
            hotel = data[0];

            //Create element for hotel and add hotel information in it
            document.getElementById('found-hotel').innerHTML = '';
            map.removeObjects(map.getObjects())
            for (let hotel of data) {
                addPropertiesPins(hotel.location.position[0], hotel.location.position[1], hotel.placeId);

                document.getElementById('found-hotel').innerHTML += `
        <div class="card" style="width: 18rem;" id=${hotel.placeId}>
            <img class="hotel-image" src="${hotel.media.images.items[0].value}" alt="Card image cap">
            <div class="card-body">
                <h5 class="hotel-title">${hotel.name}</h5>
                <p class="hotel-description">Address: ${hotel.location.address.text}</p>
                <p class="${hotel.placeId}sth"><strong>Bookings: ${hotel.bookings}</strong></p>
                <button id="add-booking" onclick="addBooking('${hotel.placeId}')">Add Booking</button>
            </div>
        </div>`;
            }



        },
        error: function (error) {
            document.getElementById('loading-image').hidden = true;
            console.error(error);
        }
    });
});
