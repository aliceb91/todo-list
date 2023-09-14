class NotesView {
  constructor(model, client) {
    this.mainContainerEl = document.querySelector('#main-container');
    this.model = model;
    this.client = client;

    document.querySelector('#add-note-btn').addEventListener('click', () => {
      const newNote = document.querySelector('#add-note-input').value;
      this.addNewNote(newNote);
      document.querySelector('#add-note-input').value = "";
    });
  }

  addNewNote(newNote) {
    this.model.addNote(newNote);
    this.client.createNote(newNote, () => {
      this.displayNotes();
    }, (error) => {
      this.displayError(error);
    });
  }

  displayNotes() {
    const divArr = this.mainContainerEl.querySelectorAll('div');
    divArr.forEach((div) => div.remove());
    const notesArr = this.model.getNotes();
    notesArr.forEach((note) => {
      const div = document.createElement('div');
      div.append(note);
      div.classList.add('note');
      this.mainContainerEl.append(div);
    });
    return;
  }

  displayNotesFromApi(callback) {
    this.client.loadNotes((apiNotes) => {
      this.model.setNotes(apiNotes);
      this.displayNotes();
      callback();
    }, (error) => {
      this.displayError(error);
    })
  }

  displayError(error) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.append(error);
    this.mainContainerEl.append(errorDiv);
  }
}

module.exports = NotesView;