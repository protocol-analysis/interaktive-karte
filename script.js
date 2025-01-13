const serverUrl = "https://marker-server.onrender.com"; // Deine Server-URL

// Marker vom Server laden
async function loadMarkers() {
    const response = await fetch(`${serverUrl}/api/markers`);
    const markers = await response.json();
    markers.forEach(position => {
        const marker = L.marker([position.lat, position.lng]).addTo(map);

        // Popup mit Entfernen-Button
        marker.bindPopup("Marker bei " + position.lat + ", " + position.lng + "<br><button id='remove-marker'>Entfernen</button>");

        // Entfernen-Button
        marker.on('popupopen', function () {
            document.getElementById('remove-marker').onclick = async function () {
                await fetch(`${serverUrl}/api/markers`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(position)
                });
                map.removeLayer(marker); // Marker von der Karte entfernen
            };
        });
    });
}

// Marker zum Server hinzufügen
async function saveMarker(position) {
    await fetch(`${serverUrl}/api/markers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(position)
    });
}

// Marker hinzufügen beim Klick auf die Karte
map.on('click', function (e) {
    const position = { lat: e.latlng.lat, lng: e.latlng.lng };
    const marker = L.marker([position.lat, position.lng]).addTo(map);
    marker.bindPopup("Marker bei " + position.lat + ", " + position.lng + "<br><button id='remove-marker'>Entfernen</button>").openPopup();

    marker.on('popupopen', function () {
        document.getElementById('remove-marker').onclick = async function () {
            await fetch(`${serverUrl}/api/markers`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(position)
            });
            map.removeLayer(marker); // Marker entfernen
        };
    });

    saveMarker(position); // Marker auf dem Server speichern
});

// Marker vom Server laden beim Start
loadMarkers();


