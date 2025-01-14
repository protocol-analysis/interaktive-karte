// Importiere Firebase-Funktionen
import { ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { db } from './index.html'; // Importiere die Datenbank-Verbindung

// Karte initialisieren
const map = L.map('map').setView([50.7753, 6.0839], 13); // Auf Aachen zentriert



L.tileLayer('http://b.tilecloudmade.com/e7b61e61295a44a5b319ca0bd3150890/997/256/18/149531/108306.png', {
L.tileLayer('http://{s}.tile.cloudmade.com/e7b61e61295a44a5b319ca0bd3150890/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);
// OpenStreetMap-Kachel hinzufügen




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


