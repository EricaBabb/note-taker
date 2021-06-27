const fs = require("fs");
const path = require("path");
const express = require("express");
const uuidv1 = require("uuid/v1");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Taking the client made text notes from the db.json and parsing them in order to save them
function findNotes() {
  const notes = fs.readFileSync("db/db.json", "utf-8");
  return JSON.parse(notes);
}

//stringify the saved parsed notes 
function writeNotes(notes) {
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
}

const deleteNote = (id) => {
  try {
    const notes = findNotes();
    const updatedNotes = notes.filter((note) => note.id !== id);
    writeNotes(updatedNotes);
    return "";
  } catch (error) {
    return error;
  }
};

//create a new note function
const createNewNote = (note) => {
    //get previous notes
  const notes = findNotes();
  //a note contains title and text
  const { title, text } = note;
  //uuidv1 will create the id for new note
  const newNote = { title, text, id: uuidv1() };
  //...expands new notes and allows addition for new note
  const updatedNotes = [...notes, newNote];
  writeNotes(updatedNotes);
};
//receives call from client accessing notes.html page and finds existing notes from the saved json file
app.get("/api/notes", (req, res) => {
  const notes = findNotes();
  if (notes) {
    res.json(notes);
  } else {
    res.send(404);
  }
});

//post request to save any new notes
app.post("/api/notes", (req, res) => {
  if (!req.body) {
    res.status(400).send("");
  } else {
    const note = createNewNote(req.body);
    res.json(note);
  }
});

//request to delete note
app.delete("/api/notes/:id", (req, res) => {
  const result = deleteNote(req.params.id);
  if (result === "") {
    res.json({ ok: true });
  } else {
    res.status(500).json(result);
  }
});

//receives request and sends note page to client side; also calls for previous notes to be loaded
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//recieves request to load index page and sends it to the client side to load the page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
