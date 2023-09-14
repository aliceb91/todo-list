class NotesClient {
  constructor() {}

  loadNotes(callback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => callback(data));
  }

  createNote(data, callback) {
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({content: data})
    })
      .then((response) => response.json())
      .then((data) => callback(data))
  }
}

module.exports = NotesClient;