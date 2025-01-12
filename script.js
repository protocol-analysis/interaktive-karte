// Karte initialisieren
var map = L.map('map').setView([51.505, -0.09], 13); // Startpunkt (Breiten- und Längengrad)

// OpenStreetMap Layer hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Klick-Event: Marker hinzufügen
map.on('click', function (e) {
    var marker = L.marker(e.latlng).addTo(map); // Marker hinzufügen

    // Popup hinzufügen
    marker.bindPopup("Marker bei " + e.latlng.toString() + "<br><button id='remove-marker'>Entfernen</button>").openPopup();

    // Klick-Event für das Entfernen des Markers
    marker.on('popupopen', function () {
        // Button im Popup finden und ein Event hinzufügen
        document.getElementById('remove-marker').onclick = function () {
            map.removeLayer(marker); // Marker entfernen
        };
    });
});
