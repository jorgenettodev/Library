const myLibrary = [];

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

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// create some books to test it.
function testBooks() {
    let book1 = new Book('O Cavaleiro preso na armadura','Robert Fisher', 62, 'reading');
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