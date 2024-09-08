const libraryContainer = document.getElementById('library');
const addBookBtn = document.getElementById('add-book-btn');
const bookInputWindow = document.getElementById('book-input-window');
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('book-author');
const pagesInput = document.getElementById('book-pages');
const submitBookBtn = document.getElementById('submit-book-btn');

const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.id = null;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead}`
    };
}

const addBookToLibrary = () => {
    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, false);
    newBook.index++;
    myLibrary.push(newBook);
    clearInputs();
    closeBookInputWindow();
    showLibrary();
}

const clearInputs = () => {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
}

const showLibrary = () => {
    libraryContainer.innerHTML=``;
    myLibrary.forEach((book, index) => {
        book.id = index;
        libraryContainer.innerHTML += `
        <div class="book" id="book-${book.id}">
            <span class="book-title">${book.title}</span>
            <span class="book-author">${book.author}</span>
            <span class="book-pages">${book.pages}</span>
            <button class="has-read-btn">Haven't read this</button>
            <button class="remove-btn" value="${book.id}">Remove</button>
        </div>
        `
        });

    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(button => {
        button.addEventListener('click', () => {
            removeBook(button.value);
            showLibrary();
        });
    });
}

const removeBook = (index) => {
    document.getElementById(`book-${index}`).remove();
    myLibrary.splice(index, 1);
}

//each book should have a button to set whether it's been read or not (hasRead = !hasRead).

const showBookInputWindow = () => {
    if (getComputedStyle(bookInputWindow).display === "none") {
        bookInputWindow.style.display = "flex";
        libraryContainer.style.filter = "blur(5px)";
    } else {
        return;
    }
}

const closeBookInputWindow = (event = null) => {
    if (event && event.target && event.target !== addBookBtn && !bookInputWindow.contains(event.target)) {
        bookInputWindow.style.display = "none";
        libraryContainer.style.filter = "none";
    } else if (!event) {
        bookInputWindow.style.display = "none";
        libraryContainer.style.filter = "none";
    }
}

addBookBtn.addEventListener('click', showBookInputWindow);
submitBookBtn.addEventListener('click', event => {
    event.preventDefault();
    addBookToLibrary();
});
document.addEventListener('click', closeBookInputWindow);