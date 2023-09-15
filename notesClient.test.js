const NotesClient = require('./notesClient');
require('jest-fetch-mock').enableMocks();

describe('NotesClient', () => {

  describe('loadNotes', () => {

    it('gets all current notes from the API', () => {
      const client = new NotesClient();
      fetch.mockResponseOnce(JSON.stringify(
        ["This note is coming from the server"]
      ));
      client.loadNotes((returnedDataFromApi) => {
        expect(returnedDataFromApi).toEqual(["This note is coming from the server"]);
      });
    });
  });

  describe('createNote', () => {
    
    it('creates a POST request with the provided data', () => {
      const client = new NotesClient();
      data = "This note is being sent to the server";
      fetch.mockResponseOnce(JSON.stringify(["This note is coming from the server", "This note is being sent to the server"]));
      client.createNote(data, (returnedDataFromApi) => {
        expect(returnedDataFromApi).toEqual(["This note is coming from the server", "This note is being sent to the server"]);
      });
    });
  });

  describe('reset', () => {

    it('removes all current notes from the API', () => {
      expect.assertions(1);
      const client = new NotesClient();
      const testCallback = jest.fn(() => {expect(testCallback).toHaveBeenCalled();}) 
      fetch.mockResponseOnce("")
      client.reset(testCallback);
    });
  });
});