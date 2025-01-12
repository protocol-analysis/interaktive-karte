// Karte initialisieren und auf Aachen zentrieren
var map = L.map('map').setView([50.7753, 6.0839], 13); // Aachen Koordinaten und Zoom-Level

// OpenStreetMap Layer hinzufügen
L.tileLayer('https://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://stamen.com">Stamen Design</a> &amp; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Funktion: Marker speichern
function saveMarkers() {
    var markers = [];
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            markers.push(layer.getLatLng()); // Marker-Positionen speichern
        }
    });
    localStorage.setItem('markers', JSON.stringify(markers)); // Marker im LocalStorage speichern
    console.log("Markers gespeichert:", markers); // Debug: Speichern überprüfen
}

// Funktion: Marker laden
function loadMarkers() {
    var markers = JSON.parse(localStorage.getItem('markers'));
    console.log("Markers geladen:", markers); // Debug: Laden überprüfen
    if (markers) {
        markers.forEach(function (position) {
            var marker = L.marker(position).addTo(map);

            // Popup mit Entfernen-Button hinzufügen
            marker.bindPopup("Marker bei " + position.toString() + "<br><button class='remove-marker'>Entfernen</button>").openPopup();

            // Event für Entfernen-Button
            marker.on('popupopen', function () {
                document.querySelector('.remove-marker').onclick = function () {
                    map.removeLayer(marker); // Marker entfernen
                    saveMarkers(); // Nach dem Entfernen die Daten im LocalStorage aktualisieren
                };
            });
        });
    }
}

// Klick-Event: Marker hinzufügen
map.on('click', function (e) {
    var marker = L.marker(e.latlng).addTo(map);

    // Popup mit Entfernen-Button hinzufügen
    marker.bindPopup("Marker bei " + e.latlng.toString() + "<br><button class='remove-marker'>Entfernen</button>").openPopup();

    // Event für Entfernen-Button
    marker.on('popupopen', function () {
        document.querySelector('.remove-marker').onclick = function () {
            map.removeLayer(marker); // Marker entfernen
            saveMarkers(); // Nach dem Entfernen die Daten im LocalStorage aktualisieren
        };
    });

    saveMarkers(); // Marker speichern
});

// Marker aus LocalStorage laden
loadMarkers();

