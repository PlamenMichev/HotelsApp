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
        evt.stopPropagation();
        const coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);
        document.getElementById('current-hotel').innerHTML = '';
        document.getElementById('found-hotel').innerHTML = '';

        const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" width="32" height="32">
<circle fill="#e8a746" cx="16" cy="16" r="16" />
<circle fill="#bbc2b9" cx="16" cy="16" r="16" />
<g clip-path="url(&quot;#clip0&quot;)">
<path fill="white" d="M 20.6695 15.4973 L 19.3637 14.1915 C 19.354 14.1818 19.3464 14.1703 19.3411 14.1577 C 19.3359 14.145 19.3332 14.1314 19.3333 14.1178 V 11.6253 C 19.3333 11.5147 19.2894 11.4088 19.2113 11.3306 C 19.1331 11.2525 19.0271 11.2086 18.9166 11.2086 H 17.6666 C 17.5561 11.2086 17.4501 11.2525 17.372 11.3306 C 17.2939 11.4088 17.25 11.5147 17.25 11.6253 V 11.8261 C 17.25 11.8467 17.2439 11.8669 17.2325 11.8841 C 17.221 11.9012 17.2047 11.9146 17.1857 11.9225 C 17.1666 11.9304 17.1457 11.9325 17.1254 11.9284 C 17.1052 11.9244 17.0866 11.9144 17.072 11.8998 L 16.0862 10.914 C 16.0081 10.8359 15.9021 10.792 15.7916 10.792 C 15.6811 10.792 15.5752 10.8359 15.497 10.914 L 10.9137 15.4973 C 10.8555 15.5556 10.8158 15.6298 10.7997 15.7107 C 10.7836 15.7915 10.7919 15.8752 10.8234 15.9514 C 10.855 16.0275 10.9084 16.0926 10.9769 16.1383 C 11.0454 16.1841 11.1259 16.2086 11.2083 16.2086 H 11.7291 C 11.7568 16.2086 11.7833 16.2196 11.8028 16.2391 C 11.8223 16.2586 11.8333 16.2851 11.8333 16.3128 V 20.3753 C 11.8333 20.4858 11.8772 20.5917 11.9553 20.6699 C 12.0335 20.748 12.1395 20.7919 12.25 20.7919 H 14.6458 C 14.6734 20.7919 14.6999 20.7809 14.7195 20.7614 C 14.739 20.7419 14.75 20.7154 14.75 20.6878 V 18.7086 C 14.75 18.4323 14.8597 18.1674 15.0551 17.972 C 15.2504 17.7767 15.5154 17.6669 15.7916 17.6669 C 16.0679 17.6669 16.3328 17.7767 16.5282 17.972 C 16.7235 18.1674 16.8333 18.4323 16.8333 18.7086 V 20.6878 C 16.8333 20.7154 16.8443 20.7419 16.8638 20.7614 C 16.8833 20.7809 16.9098 20.7919 16.9375 20.7919 H 19.3333 C 19.4438 20.7919 19.5498 20.748 19.6279 20.6699 C 19.7061 20.5917 19.75 20.4858 19.75 20.3753 V 16.3128 C 19.75 16.2851 19.7609 16.2586 19.7805 16.2391 C 19.8 16.2196 19.8265 16.2086 19.8541 16.2086 H 20.375 C 20.4574 16.2086 20.5379 16.1841 20.6064 16.1383 C 20.6749 16.0926 20.7283 16.0275 20.7598 15.9514 C 20.7914 15.8752 20.7996 15.7915 20.7835 15.7107 C 20.7675 15.6298 20.7278 15.5556 20.6695 15.4973 Z" />
</g>
<defs>
<clipPath id="clip0">
<rect fill="white" x="11" y="11" width="10" height="10" />
</clipPath>
</defs>
</svg>`;

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
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
setUpClickListener(map);


function addPropertiesPins(lat, lng, hotelId) {

    const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" width="32" height="32">
<circle fill="#e8a746" cx="16" cy="16" r="16" />
<circle fill="#bbc2b9" cx="16" cy="16" r="16" />
<g clip-path="url(&quot;#clip0&quot;)">
<path fill="white" d="M 20.6695 15.4973 L 19.3637 14.1915 C 19.354 14.1818 19.3464 14.1703 19.3411 14.1577 C 19.3359 14.145 19.3332 14.1314 19.3333 14.1178 V 11.6253 C 19.3333 11.5147 19.2894 11.4088 19.2113 11.3306 C 19.1331 11.2525 19.0271 11.2086 18.9166 11.2086 H 17.6666 C 17.5561 11.2086 17.4501 11.2525 17.372 11.3306 C 17.2939 11.4088 17.25 11.5147 17.25 11.6253 V 11.8261 C 17.25 11.8467 17.2439 11.8669 17.2325 11.8841 C 17.221 11.9012 17.2047 11.9146 17.1857 11.9225 C 17.1666 11.9304 17.1457 11.9325 17.1254 11.9284 C 17.1052 11.9244 17.0866 11.9144 17.072 11.8998 L 16.0862 10.914 C 16.0081 10.8359 15.9021 10.792 15.7916 10.792 C 15.6811 10.792 15.5752 10.8359 15.497 10.914 L 10.9137 15.4973 C 10.8555 15.5556 10.8158 15.6298 10.7997 15.7107 C 10.7836 15.7915 10.7919 15.8752 10.8234 15.9514 C 10.855 16.0275 10.9084 16.0926 10.9769 16.1383 C 11.0454 16.1841 11.1259 16.2086 11.2083 16.2086 H 11.7291 C 11.7568 16.2086 11.7833 16.2196 11.8028 16.2391 C 11.8223 16.2586 11.8333 16.2851 11.8333 16.3128 V 20.3753 C 11.8333 20.4858 11.8772 20.5917 11.9553 20.6699 C 12.0335 20.748 12.1395 20.7919 12.25 20.7919 H 14.6458 C 14.6734 20.7919 14.6999 20.7809 14.7195 20.7614 C 14.739 20.7419 14.75 20.7154 14.75 20.6878 V 18.7086 C 14.75 18.4323 14.8597 18.1674 15.0551 17.972 C 15.2504 17.7767 15.5154 17.6669 15.7916 17.6669 C 16.0679 17.6669 16.3328 17.7767 16.5282 17.972 C 16.7235 18.1674 16.8333 18.4323 16.8333 18.7086 V 20.6878 C 16.8333 20.7154 16.8443 20.7419 16.8638 20.7614 C 16.8833 20.7809 16.9098 20.7919 16.9375 20.7919 H 19.3333 C 19.4438 20.7919 19.5498 20.748 19.6279 20.6699 C 19.7061 20.5917 19.75 20.4858 19.75 20.3753 V 16.3128 C 19.75 16.2851 19.7609 16.2586 19.7805 16.2391 C 19.8 16.2196 19.8265 16.2086 19.8541 16.2086 H 20.375 C 20.4574 16.2086 20.5379 16.1841 20.6064 16.1383 C 20.6749 16.0926 20.7283 16.0275 20.7598 15.9514 C 20.7914 15.8752 20.7996 15.7915 20.7835 15.7107 C 20.7675 15.6298 20.7278 15.5556 20.6695 15.4973 Z" />
</g>
<defs>
<clipPath id="clip0">
<rect fill="white" x="11" y="11" width="10" height="10" />
</clipPath>
</defs>
</svg>`;

    const icon = new H.map.Icon(svgMarkup),
        coords = { lat: lat, lng: lng },
        marker = new H.map.Marker(coords, { icon: icon });
        marker.hotelId = hotelId;

    marker.addEventListener('tap', function (ev) {
        ev.stopPropagation();
        const newSvgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
<circle cx="24" cy="24" r="24" fill="#E8A746"/>
<circle cx="24" cy="24" r="24" fill="#111111"/>
<g clip-path="url(#clip0)">
<path d="M30.5372 23.2958L28.7091 21.4677C28.6955 21.4541 28.6848 21.438 28.6775 21.4203C28.6702 21.4026 28.6664 21.3836 28.6665 21.3644V17.8749C28.6665 17.7202 28.605 17.5718 28.4956 17.4624C28.3862 17.353 28.2379 17.2916 28.0832 17.2916H26.3332C26.1784 17.2916 26.0301 17.353 25.9207 17.4624C25.8113 17.5718 25.7498 17.7202 25.7498 17.8749V18.1561C25.7499 18.185 25.7414 18.2132 25.7253 18.2372C25.7093 18.2613 25.6865 18.28 25.6598 18.2911C25.6332 18.3021 25.6038 18.305 25.5755 18.2994C25.5471 18.2937 25.5211 18.2798 25.5007 18.2593L24.1206 16.8792C24.0112 16.7698 23.8628 16.7084 23.7082 16.7084C23.5535 16.7084 23.4051 16.7698 23.2957 16.8792L16.8791 23.2958C16.7975 23.3774 16.742 23.4813 16.7195 23.5945C16.697 23.7076 16.7085 23.8249 16.7527 23.9315C16.7968 24.038 16.8716 24.1291 16.9675 24.1932C17.0634 24.2573 17.1761 24.2916 17.2915 24.2916H18.0207C18.0593 24.2916 18.0964 24.3069 18.1238 24.3343C18.1511 24.3616 18.1665 24.3987 18.1665 24.4374V30.1249C18.1665 30.2796 18.2279 30.428 18.3373 30.5374C18.4467 30.6468 18.5951 30.7082 18.7498 30.7082H22.104C22.1427 30.7082 22.1798 30.6929 22.2071 30.6655C22.2345 30.6382 22.2498 30.6011 22.2498 30.5624V27.7916C22.2498 27.4048 22.4035 27.0339 22.677 26.7604C22.9505 26.4869 23.3214 26.3332 23.7082 26.3332C24.0949 26.3332 24.4659 26.4869 24.7394 26.7604C25.0128 27.0339 25.1665 27.4048 25.1665 27.7916V30.5624C25.1665 30.6011 25.1819 30.6382 25.2092 30.6655C25.2366 30.6929 25.2736 30.7082 25.3123 30.7082H28.6665C28.8212 30.7082 28.9696 30.6468 29.079 30.5374C29.1884 30.428 29.2498 30.2796 29.2498 30.1249V24.4374C29.2498 24.3987 29.2652 24.3616 29.2925 24.3343C29.3199 24.3069 29.357 24.2916 29.3957 24.2916H30.1248C30.2402 24.2916 30.3529 24.2573 30.4488 24.1932C30.5447 24.1291 30.6195 24.038 30.6636 23.9315C30.7078 23.8249 30.7193 23.7076 30.6968 23.5945C30.6743 23.4813 30.6188 23.3774 30.5372 23.2958Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0">
<rect x="17" y="17" width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>`;

        map.removeObject(this);
        const activeObject = map.getObjects().find(x => x.active == true);
        if (activeObject) {
            addPropertiesPins(activeObject.b.lat, activeObject.b.lng, activeObject.hotelId);
            map.removeObject(activeObject);
        }
        const newIcon = new H.map.Icon(newSvgMarkup),
            coords = { lat: this.b.lat, lng: this.b.lng },
            newMarker = new H.map.Marker(coords, { icon: newIcon });
        newMarker.hotelId = this.hotelId;
        newMarker.active = true;
        map.addObject(newMarker);

        document.getElementById('current-hotel').innerHTML = document.getElementById(newMarker.hotelId).innerHTML;
    });

    map.addObject(marker);
}