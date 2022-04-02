// Imports
const express = require("express");
const songValidate = require("./middleware/song-validation");
const songLogger = require("./middleware/song-logger")
const repoContext = require("./repository/repository-wrapper");
const cors = require("cors")
const app = express()



// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());


// http://localhost:5000 (BASE URL)
// http://localhost:5000/api/songs

// Starting a Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running!: On PORT: ${PORT}`);
});

// Endpoints


// GET all songs
app.get("/api/songs", (req, res) => {
    const songs = repoContext.songs.findAllSongs();
    return res.send(songs);
});



// GET song by id
// http://localhost:5000/api/songs/:id
app.get("/api/songs/:id", (req, res) => {
    const id = req.params.id;
    const song = repoContext.songs.findSongById(id);
    return res.send(song);
});

// POST new song
app.post("/api/songs", [songLogger,songValidate],  (req, res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    return res.status(201).send(addedSong);
});

// PUT existing song
app.put("/api/songs/:id", [songValidate], (req, res) => {
    const id = parseInt(req.params.id);
    const songPropertiesToModify = req.body;
    const songToUpdate = repoContext.songs.updateSong(id, songPropertiesToModify);
    return res.send(songToUpdate);
});

// Delete song
app.delete("/api/songs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deletedSong = repoContext.songs.deleteSong(id);
    return res.status(201).send(deletedSong);
})

