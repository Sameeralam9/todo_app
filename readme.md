## Simple Note-Taking App

- [Description]  
  A simple web-based note-taking application that allows users to create, view, edit, and delete notes. Notes are stored in the browser's local storage, ensuring they persist even after the page is refreshed.

## Features

- Add new notes with a title and content
- View all saved notes
- Edit existing notes
- Delete notes
- Display up to four recent notes prominently
- Data persistence using local storage

## How to Use

- Open the link (https://note-app-alpha-indol.vercel.app/) app in a web browser.
- Enter a title and the note content in the provided input fields.
- Click the "Add Note" button to save the note.
- The most recent notes (up to four) will be displayed below the input fields.
- To view all notes, click the "View All Notes" button.
- In the all notes view, each note has edit and delete buttons:
- Edit: Click the edit button (pencil icon) to modify a note. A popup will appear where you can update the title and content, then click "Update Note" to save changes.
- Delete: Click the delete button (trash icon) to remove a note.
- Notes are saved in local storage, so they will persist across page reloads.
- Note: Input fields cannot be empty when adding or updating a note, or an alert will prompt you to fill them in.

## Technologies Used

- HTML: Provides the structure of the app.
- CSS: Handles the styling (defined in styles.css).
- JavaScript: Manages the app’s functionality (defined in script.js).
- Local Storage API: Stores notes persistently in the browser.
