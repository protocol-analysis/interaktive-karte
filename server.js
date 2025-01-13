const express = require('express');
const cors = require('cors');
const app = express();

// Erlaube CORS für alle Anfragen
app.use(cors());
app.use(express.json());

// Simulierter Speicher für Marker
let markers = [];

// API-Endpunkte

// Marker abrufen
app.get('/markers', (req, res) => {
    res.json(markers);
});

// Marker hinzufügen
app.post('/markers', (req, res) => {
    const marker = req.body;
    markers.push(marker);
    res.status(201).json(marker);
});

// Marker löschen
app.delete('/markers', (req, res) => {
    const { lat, lng } = req.body;
    markers = markers.filter(marker => marker.lat !== lat || marker.lng !== lng);
    res.status(200).json({ success: true });
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
