'use strict';

let collectionBooks = document.querySelectorAll('.book');

collectionBooks[0].before(collectionBooks[1]);
collectionBooks[3].before(collectionBooks[4]);
collectionBooks[5].after(collectionBooks[2]);

let promoBlock = document.querySelector('.adv');
promoBlock.remove();

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

let link = collectionBooks[4].querySelector('a');
link.innerHTML = link.innerHTML.replace('Пропопипы', 'Прототипы');

let bookList = collectionBooks[0].querySelectorAll('li');

// Book - 2

bookList[3].after(bookList[6]);
bookList[6].after(bookList[8]);
bookList[9].after(bookList[2]);


// Book - 5

let bookListAsinc = collectionBooks[5].querySelectorAll('li');

bookListAsinc[2].before(bookListAsinc[9]);
bookListAsinc[4].after(bookListAsinc[2]);
bookListAsinc[7].after(bookListAsinc[5]);

let bookListEs6 = collectionBooks[2].querySelectorAll('li');
let newListElement = document.createElement('li');
newListElement.innerHTML = 'Глава 8: За пределами ES6';

bookListEs6[8].after(newListElement);

// console.log(bookListEs6);
