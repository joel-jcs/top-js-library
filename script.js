const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead}`
    };
}

const addBookToLibrary = () => {
    //take user’s input and store the new book objects into an array
}

const showLibrary = () => {
    // loop through the myLibrary array and display each book on the page
    //can be shown on a "table" eah book can be a "card"
}

// add functionality for user to click a "NEW BOOK" button and show a form where they can input the details for each book
//remember to use event.preventDefault() to prevent the button from submitting the form.


//each book added should have a button to remove book from the library

//each book should have a button to set whether it's been read or not (hasRead = !hasRead).