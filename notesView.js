class NotesView {
  constructor(model, client) {
    this.mainContainerEl = document.querySelector('#main-container');
    this.model = model;
    this.client = client;

    document.querySelector('#add-note-btn').addEventListener('click', () => {
      const newNote = document.querySelector('#add-note-input').value;
      document.querySelector('#add-note-input').value = "";
      this.addNewNote(newNote);
    });

    document.querySelector('#reset-notes-btn').addEventListener('click', () => {
      this.client.reset(() => {
        this.displayNotesFromApi(() => {})
      });
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

  displayNotes(callback) {
    const divArr = this.mainContainerEl.querySelectorAll('div');
    divArr.forEach((div) => div.remove());
    const notesArr = this.model.getNotes();
    notesArr.forEach((note, index) => {
      this.client.emojifyNotes(note, (emojified) => {
        const div = document.createElement('div');
        div.append(emojified);
        div.classList.add('note');
        this.mainContainerEl.append(div);
        if (index === notesArr.length - 1) {
          callback();
        }
      })
    })
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