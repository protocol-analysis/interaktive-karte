const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // JSON-Daten im Body verarbeiten

// Dummy-Datenbank (Marker speichern wir hier)
let markers = [];

// API: Alle Marker abrufen
app.get("/api/markers", (req, res) => {
    res.json(markers);
});

// API: Neuen Marker hinzufügen
app.post("/api/markers", (req, res) => {
    const marker = req.body; // { lat: ..., lng: ... }
    markers.push(marker);
    res.status(201).json(marker);
});

// API: Marker entfernen
app.delete("/api/markers", (req, res) => {
    const { lat, lng } = req.body;
    markers = markers.filter(m => m.lat !== lat || m.lng !== lng);
    res.status(200).send();
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
