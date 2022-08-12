let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let information;
        information = `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
        return information;
    }
}

function addBookToLibrary(title, author, pages, read) {
    if (read === 'on') {
        read = true;
    } else {
        read = false;
    }
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
}

const display = document.querySelector('.display');

const addButton = document.querySelector('.add');

const submitButton = document.getElementById('submit');

const formDiv = document.getElementById('form');


addButton.addEventListener('click', () => {
    formDiv.classList.remove('invisible');
})

let testBook1 = new Book('The Lion, The Witch, and The Wardrobe', 'CS Lewis', 290, 'read');
let testBook2 = new Book('The Three Little Pigs', 'Robert Munch', 20, 'read');
let testBook3 = new Book('Harry Potter and The Chamber of Secrets', 'JK Rowling', 400, 'read');
let testBook4 = new Book('Atomic Habits', 'James Clear', 280, 'not yet read');

myLibrary.push(testBook1);
myLibrary.push(testBook2);
myLibrary.push(testBook3);
myLibrary.push(testBook4);

for (let b in myLibrary) {
    let newDiv = document.createElement('div');
    newDiv.classList.add('book-card');
    let text = myLibrary[b].info();
    newDiv.textContent = text;
    display.appendChild(newDiv);
}

const form = document.getElementById('new_book');



submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const values = [...formData.values()];
    addBookToLibrary(...values);

    let newDiv = document.createElement('div');
    newDiv.classList.add('book-card');
    let text = myLibrary[myLibrary.length - 1].info();
    newDiv.textContent = text;
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove Book';
    newDiv.appendChild(deleteButton);
    display.appendChild(newDiv);

    deleteButton.addEventListener('click', (e) => {

        deleteButton.parentElement.remove();
    });


    form.reset();
    formDiv.classList.add('invisible');
})