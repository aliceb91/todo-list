class NotesView {
  constructor(model) {
    this.mainContainerEl = document.querySelector('#main-container');
    this.model = model;
  }

  displayNotes() {
    const notesArr = this.model.getNotes();
    notesArr.forEach((note) => {
      const div = document.createElement('div');
      div.append(note);
      div.classList.add('note');
      this.mainContainerEl.append(div);
    });
    return;
  }
}

module.exports = NotesView;