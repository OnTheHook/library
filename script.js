let myLibrary = []

const form = document.getElementById('new_book');

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
    //Add book to library array
    if (read === 'on') {
        read = true;
    } else {
        read = false;
    }
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    console.table(myLibrary);

    //create HTML container for book
    let container = document.createElement('div');
    container.classList.add('book-card');
    let text = myLibrary[myLibrary.length - 1].info();

    //Create displayed text for book
    let titlePara = document.createElement('p');
    titlePara.textContent = 'Title: ' + title;
    let authorPara = document.createElement('p');
    authorPara.textContent = 'Author: ' + author;
    let pagesPara = document.createElement('p');
    pagesPara.textContent = 'Pages: ' + pages;
    let readDiv = document.createElement('div');
    if (read === true) {
        readDiv.classList.add('read');
        readDiv.textContent = 'Read';
    } else {
        readDiv.classList.add('not-yet');
        readDiv.textContent = 'Not Yet Read';
    }

    readDiv.addEventListener('click', () => {
        if (book.read === true) {
            book.read = false
            readDiv.classList.add('not-yet');
            readDiv.classList.remove('read');
            readDiv.textContent = 'Not Yet Read';
        } else {
            book.read = true
            readDiv.classList.remove('not-yet');
            readDiv.classList.add('read');
            readDiv.textContent = 'Read';
        }
    })
    


    container.appendChild(titlePara);
    container.appendChild(authorPara);
    container.appendChild(pagesPara);
    container.appendChild(readDiv);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove Book';
    deleteButton.classList.add('delete');
    container.appendChild(deleteButton);
    display.appendChild(container);

    deleteButton.addEventListener('click', () => {
        let index = myLibrary.indexOf(book);
        myLibrary.splice(index, 1)
        deleteButton.parentElement.remove();
    });


    form.reset();
    formDivContainer.classList.add('invisible');
}

const display = document.querySelector('.display');

const addButton = document.querySelector('.add');

const submitButton = document.getElementById('submit');

const formDiv = document.getElementById('form');

const formDivContainer = document.getElementById('form-container');

//Make form appear using the add book button
addButton.addEventListener('click', () => {
    formDivContainer.classList.remove('invisible');
})

//Make form disappear by clicking out of the container
formDivContainer.addEventListener('click', (e) => {
    console.log(e);
    e.stopPropagation();
    if (e.target === formDivContainer) {
        formDivContainer.classList.add('invisible');
        form.reset();
    }
})

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const values = [...formData.values()];
    addBookToLibrary(...values)

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





