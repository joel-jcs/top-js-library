const libraryContainer = document.getElementById('library');
const addBookBtn = document.getElementById('add-book-btn');
const newBookWindow = document.getElementById('book-input-window');
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
}

const addBookToLibrary = () => {
    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, false);
    myLibrary.push(newBook);
    clearInputs();
    closeNewBookWindow();
    showLibrary();
}

const clearInputs = () => {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
}

const showLibrary = () => {
    libraryContainer.innerHTML=``;
    // loop through books and show them in the library container
    myLibrary.forEach((book, index) => {
        book.id = index;
        let hasReadText = book.hasRead ? "Already read" : "Haven't read yet";
        let hasReadColor = book.hasRead ? "#b9efce" : "#e4e2e2";
        libraryContainer.innerHTML += `
        <div class="book" id="book-${book.id}">
            <span class="book-title">${book.title}</span>
            <span class="book-author">${book.author}</span>
            <span class="book-pages">${book.pages}</span>
            <button class="has-read-btn" value="${book.id}" style="background-color:${hasReadColor}">${hasReadText}</button>
            <button class="remove-btn" value="${book.id}">Remove</button>
        </div>
        `
    });

    const hasReadBtns = document.querySelectorAll('.has-read-btn');
    hasReadBtns.forEach(button => {
        button.addEventListener('click', () => {
            // update the book's hasRead state
            myLibrary[button.value].hasRead = !myLibrary[button.value].hasRead;
            let hasRead = myLibrary[button.value].hasRead;

            // update the button state
            button.textContent = hasRead ? "Already read" : "Haven't read yet";
            button.style.backgroundColor = hasRead ? "#b9efce" : "#e4e2e2";
        });
    });

    // remove respective book from the library
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.value;
            document.getElementById(`book-${index}`).remove();
            myLibrary.splice(index, 1);
            showLibrary();
        });
    });
}

const displayNewBookWindow = () => {
    if (getComputedStyle(newBookWindow).display === "none") {
        newBookWindow.style.display = "flex";
        libraryContainer.style.filter = "blur(5px)";
    } else {
        return;
    }
}

const closeNewBookWindow = (event = null) => {
    if (event && event.target && event.target !== addBookBtn && !newBookWindow.contains(event.target)) {
        newBookWindow.style.display = "none";
        libraryContainer.style.filter = "none";
    } else if (!event) {
        newBookWindow.style.display = "none";
        libraryContainer.style.filter = "none";
    }
}

addBookBtn.addEventListener('click', displayNewBookWindow);
submitBookBtn.addEventListener('click', event => {
    if (titleInput.value === "" || authorInput.value === "" || pagesInput.value === "") {
        return;
    }
    event.preventDefault();
    addBookToLibrary();
});
document.addEventListener('click', closeNewBookWindow);
