// Karte initialisieren
var map = L.map('map').setView([51.505, -0.09], 13); // Startpunkt (Breiten- und Längengrad)

// OpenStreetMap Layer hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Klick-Event: Marker hinzufügen
map.on('click', function(e) {
    L.marker(e.latlng).addTo(map)
        .bindPopup("Marker bei " + e.latlng.toString())
        .openPopup();
});
