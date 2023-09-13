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
    const view = new NotesView(mockModel);
    const input = document.querySelector('#add-note-input');
    input.value = 'Test note';
    const button = document.querySelector('#add-note-btn');
    button.click();
    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual("Test note");
    expect(mockModel.addNote).toHaveBeenCalledWith("Test note");
  });

  it('clears the current notes before displaying the updated notes list', () => {
    const mockModel = {
      getNotes: jest.fn(() => ["Test note"]),
      addNote: jest.fn()
    }
    const view = new NotesView(mockModel);
    const input = document.querySelector('#add-note-input');
    input.value = "Test note";
    const button = document.querySelector('#add-note-btn');
    button.click();
    mockModel.getNotes = jest.fn(() => ["Test note", "Test note"]);
    button.click();
    mockModel.getNotes = jest.fn(() => ["Test note", "Test note", "Test note"]);
    button.click();
    expect(document.querySelectorAll('div.note').length).toEqual(3);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual("Test note");
    expect(mockModel.addNote).toHaveBeenCalledWith("Test note");
  });

  it('clears the text entry value when a new note is added', () => {
    const mockModel = {
      getNotes: jest.fn(() => ["Test note"]),
      addNote: jest.fn()
    }
    const view = new NotesView(mockModel);
    const input = document.querySelector('#add-note-input');
    input.value = "Test note";
    const button = document.querySelector('#add-note-btn');
    button.click();
    expect(input.value).toBe("");
  })

  describe('displayNotes', () => {
    
    it('shows all current notes pulled from the notes model', () => {
      mockModel = {
        getNotes: () => ['Test note 1', 'Test note 2']
      }
      const view = new NotesView(mockModel);
      view.displayNotes();
      expect(view.mainContainerEl.querySelectorAll('div').length).toBe(2);
    });

    it('creates new divs with a note class', () => {
      mockModel = {
        getNotes: () => ['Test note 1']
      }
      const view = new NotesView(mockModel);
      view.displayNotes();
      expect(view.mainContainerEl.querySelector('div').classList.contains('note')).toBe(true);
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
});