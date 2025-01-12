// Karte initialisieren
var map = L.map('map').setView([51.505, -0.09], 13); // Startpunkt (Breiten- und Längengrad)

// OpenStreetMap Layer hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Funktion: Marker speichern
function saveMarkers() {
    var markers = [];
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            markers.push(layer.getLatLng()); // Marker-Positionen speichern
        }
    });
    localStorage.setItem('markers', JSON.stringify(markers)); // Im LocalStorage speichern
}

// Funktion: Marker laden
function loadMarkers() {
    var markers = JSON.parse(localStorage.getItem('markers'));
    if (markers) {
        markers.forEach(function (position) {
            var marker = L.marker(position).addTo(map);

            // Popup mit Entfernen-Button hinzufügen
            marker.bindPopup("Marker bei " + position.toString() + "<br><button id='remove-marker'>Entfernen</button>").openPopup();

            // Event für Entfernen-Button
            marker.on('popupopen', function () {
                document.getElementById('remove-marker').onclick = function () {
                    map.removeLayer(marker); // Marker entfernen
                    saveMarkers(); // Nach dem Entfernen die Daten aktualisieren
                };
            });
        });
    }
}

// Klick-Event: Marker hinzufügen
map.on('click', function (e) {
    var marker = L.marker(e.latlng).addTo(map);

    // Popup mit Entfernen-Button hinzufügen
    marker.bindPopup("Marker bei " + e.latlng.toString() + "<br><button id='remove-marker'>Entfernen</button>").openPopup();

    // Event für Entfernen-Button
    marker.on('popupopen', function () {
        document.getElementById('remove-marker').onclick = function () {
            map.removeLayer(marker); // Marker entfernen
            saveMarkers(); // Nach dem Entfernen die Daten aktualisieren
        };
    });

    saveMarkers(); // Marker speichern
});

// Marker aus LocalStorage laden
loadMarkers();
