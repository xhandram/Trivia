const game = document.getElementById("game");
const score = document.getElementById("score");
const levels = ["easy", "medium", "hard"];
const categories = [
  {
    name: "Film",
    number: 11,
  },
  {
    name: "Animals",
    number: 27,
  },
  {
    name: "Cartoons",
    number: 32,
  },
];

generateGame();

function addCategory(catName, catNumber) {
  const column = document.createElement("div");
  column.classList.add("category-column");
  column.innerHTML = catName;

  levels.forEach((level) => {
    const card = document.createElement("div");

    if (level == "easy") {
      card.innerHTML = 100;
    }
    if (level == "medium") {
      card.innerHTML = 200;
    }
    if (level == "hard") {
      card.innerHTML = 300;
    }
    card.classList.add("card");
    column.append(card);
    fetch(
      `https://opentdb.com/api.php?amount=3&category=${catNumber}&difficulty=${level}&type=boolean`
    )
      .then((response) => response.json())
      .then((data) => {
        card.setAttribute("data-question", data.results[0].question);
        card.setAttribute("data-answer", data.results[0].correct_answer);
        card.setAttribute("data-value", card.innerHTML);
      })
      .then((data) => game.append(column));
    card.addEventListener("click", flipCard);
  });
}

function flipCard() {
  const btnTrue = document.createElement("button");
  const btnFalse = document.createElement("button");
  const btnWrapper = document.createElement("div");
  const question = document.createElement("div");
  const correctAnswer = this.getAttribute("data-answer");
  console.log("Inside first function");

  btnTrue.classList.add("btn");
  btnFalse.classList.add("btn");

  btnTrue.innerHTML = "True";
  btnFalse.innerHTML = "False";
  question.innerHTML = this.getAttribute("data-question");

  btnTrue.addEventListener("click", checkAnswer);
  btnFalse.addEventListener("click", checkAnswer);

  btnWrapper.append(question, btnTrue, btnFalse);
  this.append(btnWrapper);
  // Eliminate all click event on the other cards
  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function generateGame() {
  categories.forEach((cat) => {
    addCategory(cat.name, cat.number);
  });
}

function checkAnswer() {
  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.addEventListener("click", flipCard));

  const card = this.parentElement.parentElement;
  const result = document.createElement("div");
  const currentScore = parseInt(score.innerHTML);

  if (card.getAttribute("data-answer") === this.innerHTML) {
    result.innerHTML = "Correct!";
    score.innerHTML = currentScore + parseInt(card.getAttribute("data-value"));
    card.classList.add("correct");
  } else {
    result.innerHTML = "Wrong!";
    card.classList.add("wrong");
  }

  this.parentElement.appendChild(result);

  card.removeEventListener("click", flipCard);
  const btns = Array.from(document.querySelectorAll(".btn"));
  btns.forEach((btn) => (btn.disabled = true));

  //const allBtns = document.querySelectorAll(".btn");
  // allBtns.forEach((btn) => btn.setAttribute("disabled", true));
}
