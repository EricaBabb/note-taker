const fs = require("fs");
const uuidv1 = require("uuid/v1");


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

  module.exports = {
    findNotes,
    writeNotes,
    deleteNote,
    createNewNote
  };