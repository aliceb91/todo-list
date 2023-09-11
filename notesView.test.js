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
    mockModel = {
      notes: []
    }
    const view = new NotesView(mockModel);
    expect(view.model.notes).toEqual([]);
  });

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
});