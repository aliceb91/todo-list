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
});