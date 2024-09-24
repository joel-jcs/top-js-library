const libraryContainer = document.getElementById("library");
const addBookBtn = document.getElementById("add-book-btn");
const newBookWindow = document.getElementById("book-input-window");
const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const pagesInput = document.getElementById("book-pages");
const submitBookBtn = document.getElementById("submit-book-btn");

const myLibrary = [];

class Book {
  constructor(title, author, pages, hasRead) {
    this.id = null;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }

  addBookToLibrary() {
    myLibrary.push(this);
    clearInputs();
    closeNewBookWindow();
    showLibrary();
  }

  removeBookFromLibrary() {
    const index = myLibrary.indexOf(this);
    if (index !== -1) {
      //quick check to ensure that book exists
      myLibrary.splice(index, 1);
      document.getElementById(`book-${index}`).remove();
      showLibrary();
    }
  }

  changeBookReadState() {
    const index = myLibrary.indexOf(this);
    if (index !== -1) {
      // update the book's hasRead state and set its new value to hasReadValue, to be used in ternary operator that follows
      return (myLibrary[index].hasRead = !myLibrary[index].hasRead);
    }
  }
}

const showLibrary = () => {
  libraryContainer.innerHTML = ``;
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
            <button class="has-read-btn" style="background-color:${hasReadColor}">${hasReadText}</button>
            <button class="remove-btn">Remove</button>
        </div>
        `;
  });

  const hasReadBtns = document.querySelectorAll(".has-read-btn");
  hasReadBtns.forEach((hasReadBtn, index) => {
    hasReadBtn.addEventListener("click", () => {
      let hasRead = myLibrary[index].changeBookReadState();

      // update the hasReadBtn state
      hasReadBtn.textContent = hasRead ? "Already read" : "Haven't read yet";
      hasReadBtn.style.backgroundColor = hasRead ? "#b9efce" : "#e4e2e2";
    });
  });

  // remove respective book from the library
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((removeBtn, index) => {
    removeBtn.addEventListener("click", () => {
      myLibrary[index].removeBookFromLibrary();
    });
  });
};

const displayNewBookWindow = () => {
  if (getComputedStyle(newBookWindow).display === "none") {
    newBookWindow.style.display = "flex";
    libraryContainer.style.filter = "blur(5px)";
  }
};

const clearInputs = () => {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
};

const closeNewBookWindow = (event = null) => {
  if (
    event &&
    event.target &&
    event.target !== addBookBtn &&
    !newBookWindow.contains(event.target)
  ) {
    newBookWindow.style.display = "none";
    libraryContainer.style.filter = "none";
  } else if (!event) {
    newBookWindow.style.display = "none";
    libraryContainer.style.filter = "none";
  }
};

addBookBtn.addEventListener("click", displayNewBookWindow);
submitBookBtn.addEventListener("click", (event) => {
  if (
    titleInput.value === "" ||
    authorInput.value === "" ||
    pagesInput.value === ""
  ) {
    return;
  }
  event.preventDefault();
  let newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    false
  );
  newBook.addBookToLibrary();
});
document.addEventListener("click", closeNewBookWindow);
