const myLibrary = [];

// function to create a new book
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages. Reading status: ${this.readStatus}.`;
    };

    this.status = function() {
        return `Reading status: ${readStatus}`;
    }
};

// take a book as argument and push it to the myLibrary array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// create some books to test it.
function testBooks() {
    let book1 = new Book('O Cavaleiro preso na armadura','Robert Fisher', 62, 'already read');
    // add book1 to library
    addBookToLibrary(book1);

    let book2 = new Book('The war of the worlds', 'H. G. Wells', 450, 'reading')
    addBookToLibrary(book2);


}

// show all books in the myLibrary array.
function showAllBooks() {
    // loop through the array and console.log all books
    for (const key in myLibrary) {
        console.log(`Book name: ${myLibrary[key].info()}`);
    }
}


// books__grid
const booksGrid = document.querySelector('.books__grid');



// Receives a book as parameter, create a card and appends to the books__grid
function appendBookToGrid(book) {
    // Creates a book card and give classes for each book element, like title, author, pages.
    let newBook = document.createElement('div');
    newBook.classList.add('book__card');

    const bookTitle = document.createElement('h2')
    bookTitle.classList.add('book__title');
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement('p')
    bookAuthor.classList.add('book__author');
    bookAuthor.innerText = book.author;

    const bookPages = document.createElement('p')
    bookPages.classList.add('book__pages');
    bookPages.innerText = `${book.pages} pages`;

    

    // book buttons

    // create the buttons for the book card.
    const btnReadStatus = document.createElement('button');
    btnReadStatus.innerText = book.readStatus;
    btnReadStatus.classList.add('btn__readStatus');
    btnReadStatus.classList.add('btn');


    const btnDeleteBook = document.createElement('button');
    btnDeleteBook.classList.add('btn');
    btnDeleteBook.classList.add('btn__delete');
    btnDeleteBook.innerText = 'delete';

    // appends each new element to the book card.
    newBook.appendChild(bookTitle);
    newBook.appendChild(bookAuthor);
    newBook.appendChild(bookPages);
    newBook.appendChild(btnReadStatus);
    newBook.appendChild(btnDeleteBook);

    // appends the newbook to the book grid.
    booksGrid.appendChild(newBook);
}

// Create example books and adds to myLibrary array
testBooks();

// Takes the example books, create cards and appends to the books__grid.



// Save books on local Storage

// transform the array in a string using JSON.stringify(array);
const myLibraryString = JSON.stringify(myLibrary);
localStorage.setItem('myLibrary', myLibraryString);

// get the books saved on local Storage and store them in another array called storeBooks
let storedBooks = localStorage.getItem('myLibrary');
storedBooks = JSON.parse(storedBooks);


// Load the books saved on the localStorage when the page is loaded.

function loadBooksOnThePage() {
    window.addEventListener('load', (e) => {
        console.log('carregou a página.')
        for (book in storedBooks) {
            appendBookToGrid(storedBooks[book]);
            console.log(`upou um livro na página chamado ${storedBooks[book].title}`)
        }
    })
};

// Load the books when the page is loaded;
loadBooksOnThePage();


// modal

const modal = document.querySelector("dialog");
const btnOpenModal = document.querySelector("#btnOpenModal");

btnOpenModal.addEventListener("click", () => {
  modal.showModal();
});

// close modal
const btnCloseModal = document.querySelector("#btnCancelModal");

btnCloseModal.addEventListener("click", (e) => {
    modal.close();
});

// button for confirming the new book and closing the modal;
const btnConfirmNewBook = document.querySelector("#btnConfirmNewBook");


function createTemporaryBook() {
    // get the inputs
    const inTitle = document.querySelector("#title");
    const inAuthor = document.querySelector("#author");
    const inPages = document.querySelector("#pages");
    const inReadStatus = document.querySelector("#inputReadStatus");

    const tempBookTitle = inTitle.value;
    const tempBookAuthor = inAuthor.value;
    const tempBookPages = inPages.value;
    const tempBookReadStatus = inReadStatus.value;


    let temporaryBook = new Book(tempBookTitle, tempBookAuthor, tempBookPages, tempBookReadStatus);


    return temporaryBook;
}


btnConfirmNewBook.addEventListener('click', () => {
    let temporaryBook = createTemporaryBook();
    console.log(temporaryBook);
    appendBookToGrid(temporaryBook);
    modal.close();

})