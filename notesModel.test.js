const NotesModel = require('./notesModel');

describe('NotesModel', () => {

  it('creates an empty array for note storage when created', () => {
    model = new NotesModel();
    expect(model.notes).toEqual([]);
  });

  describe('addNote', () => {

  it('adds a note to the notes array stored in the model object', () => {
    model = new NotesModel();
    model.addNote("Test note 1");
    expect(model.notes).toEqual(["Test note 1"]);
  });

  it('adds multiple notes to the notes array', () => {
    model = new NotesModel();
    model.addNote("Test note 1");
    model.addNote("Test note 2");
    expect(model.notes).toEqual(["Test note 1", "Test note 2"]);
  });
});

  describe('getNotes', () => {

    it('pulls all notes as an array when called', () => {
      model = new NotesModel();
      model.addNote("Test note 1");
      model.addNote("Test note 2");
      expect(model.getNotes()).toEqual(["Test note 1", "Test note 2"]);
    });
  });

  describe('setNotes', () => {
    
    it('sets the current values of notes to be those fed in as an argument', () => {
      model = new NotesModel();
      const testData = ["Test note", "Test note"];
      model.setNotes(testData);
      expect(model.getNotes()).toEqual(testData);
    });
  });
});
