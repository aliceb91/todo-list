const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

console.log("The notes app is running");

const model = new NotesModel();

model.addNote("This is an example note");

const view = new NotesView(model);

view.displayNotes();

console.log(model.notes);