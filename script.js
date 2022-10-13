let myLibrary = [];

const form = document.getElementById("new_book");
const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPages = document.getElementById("pages");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    let information;
    information = `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    return information;
  }
}

function addBookToLibrary(title, author, pages, read) {
  //Add book to library array
  if (read === "on") {
    read = true;
  } else {
    read = false;
  }
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  console.table(myLibrary);

  //create HTML container for book
  let container = document.createElement("div");
  container.classList.add("book-card");
  let text = myLibrary[myLibrary.length - 1].info();

  //Create displayed text for book
  let titlePara = document.createElement("p");
  titlePara.textContent = "Title: " + title;
  let authorPara = document.createElement("p");
  authorPara.textContent = "Author: " + author;
  let pagesPara = document.createElement("p");
  pagesPara.textContent = "Pages: " + pages;
  let readDiv = document.createElement("div");
  if (read === true) {
    readDiv.classList.add("read");
    readDiv.textContent = "Read";
  } else {
    readDiv.classList.add("not-yet");
    readDiv.textContent = "Not Yet Read";
  }

  readDiv.addEventListener("click", () => {
    if (book.read === true) {
      book.read = false;
      readDiv.classList.add("not-yet");
      readDiv.classList.remove("read");
      readDiv.textContent = "Not Yet Read";
    } else {
      book.read = true;
      readDiv.classList.remove("not-yet");
      readDiv.classList.add("read");
      readDiv.textContent = "Read";
    }
  });

  container.appendChild(titlePara);
  container.appendChild(authorPara);
  container.appendChild(pagesPara);
  container.appendChild(readDiv);

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove Book";
  deleteButton.classList.add("delete");
  container.appendChild(deleteButton);
  display.appendChild(container);

  deleteButton.addEventListener("click", () => {
    let index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);
    deleteButton.parentElement.remove();
  });

  form.reset();
  formDivContainer.classList.add("invisible");
}

const display = document.querySelector(".display");

const addButton = document.querySelector(".add");

const submitButton = document.getElementById("submit");

const formDiv = document.getElementById("form");

const formDivContainer = document.getElementById("form-container");

//Make form appear using the add book button
addButton.addEventListener("click", () => {
  formDivContainer.classList.remove("invisible");
});

//Make form disappear by clicking out of the container
formDivContainer.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target === formDivContainer) {
    formDivContainer.classList.add("invisible");
    form.reset();
  }
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    const formData = new FormData(form);
    const values = [...formData.values()];
    addBookToLibrary(...values);
  }
});

formTitle.addEventListener("input", (e) => {
  if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity("Enter a book title");
    formTitle.reportValidity();
  } else {
    formTitle.setCustomValidity("");
  }
})

formAuthor.addEventListener("input", (e) => {
  if (formAuthor.validity.valueMissing) {
    formAuthor.setCustomValidity("Enter an author");
    formAuthor.reportValidity();
  } else {
    formAuthor.setCustomValidity("");
  }
})

formPages.addEventListener("input", (e) => {
  if (formPages.validity.valueMissing) {
    formPages.setCustomValidity("Enter the number of pages");
    formPages.reportValidity();
  } else {
    formPages.setCustomValidity("");
  }
})
