let currentLat = 0;
let currentLng = 0;

// Create platform for the map
const platform = new H.service.Platform({
    apikey: "nEszsNd4L0Iut8_Xus2aQ6pcih4OCxCKQjGNQK_gxFg"
});

const defaultLayers = platform.createDefaultLayers();

// Create map
const map = new H.Map(document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map, {
    zoom: 14,
    pixelRatio: window.devicePixelRatio || 1
});

// Set position of the map on the current cordinates
function setPosition(position) {
    currentLat = position.coords.latitude;
    currentLng = position.coords.longitude;
    map.setCenter({ lat: currentLat, lng: currentLng });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    }
}

window.onload = getLocation();

// Add listener which adds markers when map is clicked
function setUpClickListener(map) {
    map.addEventListener('tap', function (evt) {
        const coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);

        const svgMarkup = '<svg width="24" height="24" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
            'height="22" /><text x="12" y="18" font-size="12pt" ' +
            'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
            'fill="white">H</text></svg>';

        const icon = new H.map.Icon(svgMarkup),
            coords = { lat: coord.lat, lng: coord.lng },
            marker = new H.map.Marker(coords, { icon: icon });

        map.removeObjects(map.getObjects())
        map.addObject(marker);
        map.setCenter(coords);

        // Keeps information for current marker
        // When button is clicked a query to beckend is sent
        document.getElementById('submit-button').hidden = false;
        document.getElementById('lat').value = coord.lat;
        document.getElementById('lng').value = coord.lng;
    });
}

//Make map resizable
window.addEventListener('resize', () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
setUpClickListener(map);