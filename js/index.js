const books =[
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
]
// console.log(books)

const divEl = document.querySelector("#root")

const divLeft = document.createElement("div")
const divRight = document.createElement("div")

divEl.prepend(divLeft, divRight)

divLeft.classList.add("left-container")
divRight.classList.add("right-container")

const titleEl = document.createElement("h1")
titleEl.textContent = "Library"

const ulEl = document.createElement("ul")
const btnEl = document.createElement("button")
btnEl.textContent = "ADD"

divLeft.prepend(titleEl, ulEl, btnEl)

titleEl.classList.add("title")
ulEl.classList.add("ul")
btnEl.classList.add("btn-add")

function createList() {
  const markup = books.map((book) => `<li class="list"><p class="text">${book.title}</p><button class="edit-btn">Edit</button><button class="del-btn">Delete</button></li>`).join("");

  ulEl.insertAdjacentHTML("afterbegin", markup);
}