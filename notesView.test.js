/**
 * @jest-environment jsdom
 */

const NotesView = require('./notesView');
const fs = require('fs');

describe('NotesView', () => {

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it('creates an instance of NotesView that contains the main container', () => {
    mockModel = {};
    const view = new NotesView(mockModel);
    expect(view.mainContainerEl.querySelectorAll('div').length).toBe(0);
  });

  it('creates an instance of NotesView that contains an instance of notesModel', () => {
    const mockModel = {
      notes: [],
      addNote: (note) => {
        this.notes.push(note)
      }
    }
    const view = new NotesView(mockModel);
    expect(view.model.notes).toEqual([]);
  });

  it('adds a new note when the button is clicked', () => {
    const mockModel = {
      getNotes: jest.fn(() => ['Test note']),
      addNote: jest.fn()
    }
    const mockClient = {
      createNote: jest.fn((newNote, callback) => callback(["Test note"])),
      emojifyNotes: jest.fn(() => ['Test note'])
    }
    const view = new NotesView(mockModel, mockClient);
    const input = document.querySelector('#add-note-input');
    input.value = 'Test note';
    const button = document.querySelector('#add-note-btn');
    button.click();
    view.displayNotes(() => {
      expect(document.querySelectorAll('div.note').length).toEqual(1);
      expect(document.querySelectorAll('div.note')[0].textContent).toEqual("Test note");
      expect(mockModel.addNote).toHaveBeenCalledWith("Test note");
    });
  });

  it('clears the current notes before displaying the updated notes list', () => {
    const mockModel = {
      getNotes: jest.fn(() => ["Test note"]),
      addNote: jest.fn()
    }
    const mockClient = {
      createNote: jest.fn((newNote, callback) => callback(["Test note"])),
      emojifyNotes: jest.fn(() => ['Test note'])
    }
    const view = new NotesView(mockModel, mockClient);
    const input = document.querySelector('#add-note-input');
    input.value = "Test note";
    const button = document.querySelector('#add-note-btn');
    button.click();
    mockModel.getNotes = jest.fn(() => ["Test note", "Test note"]);
    button.click();
    mockModel.getNotes = jest.fn(() => ["Test note", "Test note", "Test note"]);
    button.click();
    view.displayNotes(() => {
      expect(document.querySelectorAll('div.note').length).toEqual(3);
      expect(document.querySelectorAll('div.note')[0].textContent).toEqual("Test note");
      expect(mockModel.addNote).toHaveBeenCalledWith("Test note");
    });
  });

  it('clears the text entry value when a new note is added', () => {
    const mockModel = {
      getNotes: jest.fn(() => ["Test note"]),
      addNote: jest.fn()
    }
    const mockClient = {
      createNote: jest.fn((newNote, callback) => callback(["Test note"])),
      emojifyNotes: () => ['Test note']
    }
    const view = new NotesView(mockModel, mockClient);
    const input = document.querySelector('#add-note-input');
    input.value = "Test note";
    const button = document.querySelector('#add-note-btn');
    button.click();
    expect(input.value).toBe("");
  });

  it('saves a new note to the API when a note is added', () => {
    const mockModel = {
      addNote: jest.fn(),
      getNotes: jest.fn(() => ["Test note"])
    }
    const mockClient = {
      createNote: jest.fn((newNote, callback, failCallback) => callback(["Test note"])),
      emojifyNotes: () => ['Test note']
    }
    const view = new NotesView(mockModel, mockClient);
    const input = document.querySelector('#add-note-input');
    input.value = "Test note";
    const button = document.querySelector("#add-note-btn");
    button.click();
    expect(view.client.createNote).toHaveBeenCalledWith("Test note", expect.anything(), expect.anything());
  });

  it('removes all notes when the reset button is clicked', () => {
    const mockClient = {
      reset: jest.fn(),
      loadNotes: jest.fn((callback) => {callback()})
    }
    const mockModel = {
      notes: [],
      setNotes: jest.fn(() => {}),
      getNotes: jest.fn(() => [])
    }
    const view = new NotesView(mockModel, mockClient);
    const testDiv = document.createElement('div');
    testDiv.classList.add('note');
    view.mainContainerEl.append(testDiv);
    expect(document.querySelectorAll('div.note').length).toBe(1);
    const button = document.querySelector('#reset-notes-btn');
    button.click();
    view.displayNotes(() => {
      expect(document.querySelectorAll('div.note').length).toBe(0);
    });
  });

  describe('displayNotes', () => {
    
    it('shows all current notes pulled from the notes model', () => {
      mockModel = {
        getNotes: () => ['Test note 1', 'Test note 2']
      }
      mockClient = {
        emojifyNotes: () => ['Test note 1', 'Test note 2']
      }
      const view = new NotesView(mockModel, mockClient);
      view.displayNotes(() => {
        expect(view.mainContainerEl.querySelectorAll('div').length).toBe(2);
      });
    });

    it('creates new divs with a note class', () => {
      mockModel = {
        getNotes: () => ['Test note 1']
      }
      mockClient = {
       emojifyNotes: () => ['Test note 1'] 
      }
      const view = new NotesView(mockModel, mockClient);
      view.displayNotes(() => {
        expect(view.mainContainerEl.querySelector('div').classList.contains('note')).toBe(true);
      });
    });
  });

  describe('displayNotesFromApi', () => {

    it('sets the notes response from the api in the model class before displaying the notes', () => {
      const mockModel = {
        setNotes: jest.fn(() => {}),
        getNotes: jest.fn(() => ["This note is coming from the server"])
      }
      const mockClient = {
        loadNotes: jest.fn(() => ["This note is coming from the server"])
      }
      const view = new NotesView(mockModel, mockClient);
      view.displayNotesFromApi(() => {
        expect(mockModel.setNotes).toHaveBeenCalledWith(["This note is coming from the server"]);
        expect(view.mainContainerEl.querySelectorAll('div').length).toBe(1);
        expect(view.mainContainerEl.querySelectorAll('div')).toEqual(["This note is coming from the server"]);
      });
    });
  });

  describe('displayError', () => {
    it('displays the error message received when an error occurs', () => {
      const mockModel = {};
      const mockClient = {};
      const view = new NotesView(mockModel, mockClient);
      error = "Oops, something went wrong!"
      view.displayError(error);
      expect(view.mainContainerEl.querySelector('div.error').textContent).toBe("Oops, something went wrong!");
    });
  });
});