// Importiere Firebase-Funktionen
import { ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { db } from './index.html'; // Importiere die Datenbank-Verbindung

// Karte initialisieren
const map = L.map('map').setView([50.7753, 6.0839], 13); // Auf Aachen zentriert

// OpenStreetMap-Kachel hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Referenz zu Firebase-Markern
const markersRef = ref(db, 'markers');

// Marker aus Firebase laden und auf der Karte anzeigen
onValue(markersRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Alle Marker anzeigen
        Object.keys(data).forEach(key => {
            const marker = data[key];
            const leafletMarker = L.marker([marker.lat, marker.lng])
                .addTo(map)
                .bindPopup(`${marker.title} <button onclick="removeMarker('${key}')">Löschen</button>`);
            leafletMarker.options.markerId = key; // Speichere die ID für die Löschfunktion
        });
    }
});

// Funktion: Marker hinzufügen
map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    const title = prompt("Gib einen Titel für den Marker ein:");

    if (title) {
        push(ref(db, 'markers'), {
            lat: lat,
            lng: lng,
            title: title
        });
    }
});

// Funktion: Marker entfernen
window.removeMarker = (id) => {
    remove(ref(db, `markers/${id}`));
};


