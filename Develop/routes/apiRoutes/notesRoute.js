const router = require('express').Router();
const { findNotes,
    writeNotes,
    deleteNote,
    createNewNote } = require('../../lib/notes');

//receives call from client accessing notes.html page and finds existing notes from the saved json file
router.get("/api/notes", (req, res) => {
    const notes = findNotes();
    if (notes) {
      res.json(notes);
    } else {
      res.send(404);
    }
  });
  
  //post request to save any new notes
 router.post("/api/notes", (req, res) => {
    if (!req.body) {
      res.status(400).send("");
    } else {
      const note = createNewNote(req.body);
      res.json(note);
    }
  });
  
  //request to delete note
 router.delete("/api/notes/:id", (req, res) => {
    const result = deleteNote(req.params.id);
    if (result === "") {
      res.json({ ok: true });
    } else {
      res.status(500).json(result);
    }
  });
  
  //receives request and sends note page to client side; also calls for previous notes to be loaded
  router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

module.exports  = router;