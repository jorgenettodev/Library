const myLibrary = [];

let Book = function(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages`;
    };
};

let book1 = new Book('O Cavaleiro preso na armadura','Robert Fisher', 62, 'Reading currently');

console.log(book1.info());