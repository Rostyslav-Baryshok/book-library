const books = [
  {
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
];

const BOOKS = "books";
if (!localStorage.getItem(BOOKS)) {
  localStorage.setItem(BOOKS, JSON.stringify(books));
}

const divEl = document.querySelector("#root");

const divLeft = document.createElement("div");
const divRight = document.createElement("div");

divEl.prepend(divLeft, divRight);

divLeft.classList.add("left-container");
divRight.classList.add("right-container");

const titleEl = document.createElement("h1");
titleEl.textContent = "Library";

const ulEl = document.createElement("ul");
const btnEl = document.createElement("button");
btnEl.textContent = "Add";

divLeft.prepend(titleEl, ulEl, btnEl);

titleEl.classList.add("title");
ulEl.classList.add("ul");
btnEl.classList.add("btn-add");

function createList() {
  // ulEl.innerHTML = "";
  const books = JSON.parse(localStorage.getItem(BOOKS));
  const markup = books
    .map(
      (book) =>
        `<li id="${book.id}" class="list"><p class="text">${book.title}</p><button class="edit-btn">Edit</button><button class="del-btn">Delete</button></li>`
    )
    .join("");

  ulEl.insertAdjacentHTML("afterbegin", markup);

  const pEl = document.querySelectorAll(".text");
  pEl.forEach((el) => el.addEventListener("click", showPreview));

  const editBtnEl = document.querySelectorAll(".edit-btn");
  editBtnEl.forEach((el) => el.addEventListener("click", editBook));

  const deleteBtnEl = document.querySelectorAll(".del-btn");
  deleteBtnEl.forEach((el) => el.addEventListener("click", deleteBook));
}

const addBookEl = document.querySelector(".btn-add");
addBookEl.addEventListener("click", addBookFunc);

createList();

function showPreview(event) {
  const books = JSON.parse(localStorage.getItem(BOOKS));
  const book = books.find((book) => event.target.textContent === book.title);
  renderPreview(book);
}

function renderPreview(book) {
  divRight.innerHTML = "";
  divRight.insertAdjacentHTML("afterbegin", createPreviewMarkup(book));
}

function createPreviewMarkup(obj) {
  return `<div class="preview" id="${obj.id}"><h2>${obj.title}</h2><p>${obj.author}</p><img src="${obj.img}"><p class="text-description">${obj.plot}</p></div>`;
}
// event
function editBook() {
  const books = JSON.parse(localStorage.getItem(BOOKS));
  const book = books.find((book) => event.target.parentNode.id === book.id);
  divRight.innerHTML = "";
  divRight.insertAdjacentHTML("afterbegin", createFormMurkup(book));
  fillObject(book);
  const saveBtn = document.querySelector(".save-btn");
  saveBtn.addEventListener("click", onBtnSave);

  function onBtnSave() {
    for (let i = 0; i < books.length; i += 1) {
      if (books[i] === books.indexOf(book)) {
        books.splice(books[i], 1, book);
      }
    }
    localStorage.setItem(BOOKS, JSON.stringify(books));
    ulEl.innerHTML = "";
    createList();
    renderPreview(book);
    setTimeout(() => alert("Book edit"), 500);
  }
}

function deleteBook() {
  const books = JSON.parse(localStorage.getItem(BOOKS));
  const book = books.filter((book) => event.target.parentNode.id !== book.id);
  localStorage.setItem(BOOKS, JSON.stringify(book));
  ulEl.innerHTML = "";
  createList();
  if (divRight.innerHTML !== "") {
    const divRightEl = document.querySelector(".preview");

    if (divRightEl.id === event.target.parentNode.id) {
      divRight.innerHTML = "";
    }
  }
}
function addBookFunc() {
  const newBook = {
    id: `${Date.now()}`,
    author: "",
    title: "",
    image: "",
    plot: "",
  };
  divRight.innerHTML = "";
  divRight.insertAdjacentHTML("afterbegin", createFormMurkup(newBook));

  fillObject(newBook);
  const saveBtnEl = document.querySelector(".save-btn");
  saveBtnEl.addEventListener("click", saveBook);

  function saveBook() {
    const books = JSON.parse(localStorage.getItem(BOOKS));
    books.push(newBook);
    localStorage.setItem(BOOKS, JSON.stringify(books));
    ulEl.innerHTML = "";
    createList();
    renderPreview(newBook);
    setTimeout(() => alert("Book add"), 500);
  }
}

const createFormMurkup = (book) => {
  return `<form class ='add-book'>
  <label class="label">Author<input class="input" name="author" value="${book.author}" type ='text'></label>
  <label class="label">Title<input class="input" name="title" value="${book.title}" type ='text'></label>
  <label class="label">Image<input class="input" name="image" value="${book.image}" type ='text'></label>
  <label class="label">Plot<input class="input" name="plot" value="${book.plot}"></input></label>
  <button class="save-btn" type="button">Save</button>
  </form>`;
};

function fillObject(book) {
  const inputAll = document.querySelectorAll("input");
  inputAll.forEach((el) => {
    el.addEventListener("input", addValue);
  });
  function addValue(event) {
    book[event.target.name] = event.target.value;
  }
}
