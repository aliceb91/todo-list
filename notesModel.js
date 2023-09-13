class NotesModel {
  constructor() {
    this.notes = [];
  }

  addNote(note) {
    this.notes.push(note);
  }

  getNotes() {
    return this.notes;
  }

  setNotes(data) {
    this.notes = data;
  }
}

module.exports = NotesModel;