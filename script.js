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

    if (inReadStatus.checked) {
        btnReadStatus.classList.add('read');
    } else {
        btnReadStatus.classList.add('notRead');
    }


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
// testBooks();

// Save books on local Storage

// transform the array in a string using JSON.stringify(array);
// const myLibraryString = JSON.stringify(myLibrary);
// localStorage.setItem('myLibrary', myLibraryString);

// get the books saved on local Storage and store them in another array called storeBooks
// let storedBooks = localStorage.getItem('myLibrary');
// storedBooks = JSON.parse(storedBooks);


// Load the books saved on the localStorage when the page is loaded.

function loadBooksOnThePage() {
    window.addEventListener('load', (e) => {
        console.log('carregou a página.')

        let storedBooks = JSON.parse(localStorage.getItem('myLibrary')) || [];

        for (const book of storedBooks) {
            appendBookToGrid(book);
            console.log(`upou um livro na página chamado ${book.title}`)
        }

        // update myLibrary with storedBooks
        myLibrary.push(...storedBooks);
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


// get the inputs
const inTitle = document.querySelector("#title");
const inAuthor = document.querySelector("#author");
const inPages = document.querySelector("#pages");
const inReadStatus = document.querySelector("#inputReadStatus");

function clearInputs() {
    inTitle.value = "";
    inAuthor.value = "";
    inPages.value = "";
    // inReadStatus.checked = false;
}

function createTemporaryBook() {
    // get the inputs
    // const inTitle = document.querySelector("#title");
    // const inAuthor = document.querySelector("#author");
    // const inPages = document.querySelector("#pages");
    // const inReadStatus = document.querySelector("#inputReadStatus");

    const tempBookTitle = inTitle.value;
    const tempBookAuthor = inAuthor.value;
    const tempBookPages = inPages.value;
    const tempBookReadStatus = (inReadStatus.checked) ? "read" : "not read";


    let temporaryBook = new Book(tempBookTitle, tempBookAuthor, tempBookPages, tempBookReadStatus);

    clearInputs()
    return temporaryBook;
}


// Create a new book book, then push to myLibrary array, and then update localStorage.
btnConfirmNewBook.addEventListener('click', () => {
    let temporaryBook = createTemporaryBook();
    console.log(temporaryBook);
    appendBookToGrid(temporaryBook);

    myLibrary.push(temporaryBook); // add the new book to myLibrary array.
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary)); // update the localStorage with the new book on the myLibrary array.

    let tempReadStatus = document.querySelector('#inputReadStatus');
    tempReadStatus.checked = false;
    modal.close();

})

// FEATURE: REMOVE BOOKS FROM GRID;

booksGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn__delete')) {
        console.log(e.target);
        // find the current book
        const bookCard = e.target.parentNode;
        // get the book title
        let bookCardTitle = bookCard.querySelector('.book__title')
        .innerText;
        // bookCard.remove();
        console.log(bookCardTitle);
        
        // Remove the book from the myLibrary array;

        for (const book of myLibrary) {
            if (book.title == bookCardTitle) {
                console.log(`Este console log mostra qual o livro no array myLibrary: ${book.title}`);

                // find the index of the book to remove
                let indexOfBookToRemove = myLibrary.findIndex(book => book.title === bookCardTitle);
                console.log(indexOfBookToRemove);

                // remove the book from the myLibrary array and update the localStorage;
                if (indexOfBookToRemove !== -1) {
                    myLibrary.splice(indexOfBookToRemove, 1);
                    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
                    bookCard.remove();
                }

            }
        }
    }
});

// change read status of each book individually
booksGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn__readStatus')) {
        let actualReadStatus = e.target;
        // console.log(actualReadStatus);
    
        const read = "read";
        const notRead = "not read";

        if (actualReadStatus.innerText == read) {
            actualReadStatus.innerText = notRead;
            actualReadStatus.classList.toggle('notRead');
            actualReadStatus.classList.toggle('read');

        } else {
            actualReadStatus.innerText = read;
            actualReadStatus.classList.toggle('read');
            actualReadStatus.classList.toggle('notRead');
        }
    }
});