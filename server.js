const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // JSON-Daten verarbeiten

let markers = []; // Markerdaten im Speicher

app.get("/api/markers", (req, res) => {
    res.json(markers); // Marker abrufen
});

app.post("/api/markers", (req, res) => {
    const { lat, lng } = req.body;
    markers.push({ lat, lng }); // Marker speichern
    res.status(201).json({ lat, lng });
});

app.delete("/api/markers", (req, res) => {
    const { lat, lng } = req.body;
    markers = markers.filter(m => m.lat !== lat || m.lng !== lng); // Marker löschen
    res.status(200).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
