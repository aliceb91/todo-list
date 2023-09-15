class NotesClient {
  constructor() {}

  loadNotes(success, fail) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => success(data))
      .catch((error) => {
        console.log(error)
        fail("Oops, something went wrong!")
      })
  }

  createNote(data, success, fail) {
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({content: data})
    })
      .then((response) => response.json())
      .then((data) => success(data))
      .catch(() => fail("You can't make a new note right now!"))
  }

  emojifyNotes(data, success) {
    fetch("https://makers-emojify.herokuapp.com", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({text: data})
    })
      .then((response) => response.json())
      .then((data) => success(data.emojified_text))
  }

  reset(success) {
    fetch("http://localhost:3000/notes", {method: "DELETE"})
      .then(response => {
        console.log("Notes cleared")
        success();
      });
  }
}

module.exports = NotesClient;