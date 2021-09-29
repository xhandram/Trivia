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
        card.addEventListener("click", flipCard);
      });

    game.append(column);
  });
}

function flipCard() {
  const btnTrue = document.createElement("button");
  const btnFalse = document.createElement("button");
  const btnWrapper = document.createElement("div");
  const correctAnswer = this.getAttribute("data-answer");

  // Eliminate all click event on the other cards
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => card.removeEventListener("click", flipCard));

  btnTrue.classList.add("btn");
  btnFalse.classList.add("btn");

  btnTrue.innerHTML = "True";
  btnFalse.innerHTML = "False";

  this.innerHTML = this.getAttribute("data-question");

  btnWrapper.appendChild(btnTrue);
  btnWrapper.appendChild(btnFalse);
  this.appendChild(btnWrapper);

  btnTrue.addEventListener("click", checkAnswer);
  btnFalse.addEventListener("click", checkAnswer);
}

function generateGame() {
  categories.forEach((cat) => {
    addCategory(cat.name, cat.number);
  });
}
generateGame();

function checkAnswer() {
  const card = this.parentElement.parentElement;
  const result = document.createElement("div");
  const currentScore = parseInt(score.innerHTML);
  const allBtns = document.querySelectorAll(".btn");
  allBtns.forEach((btn) => btn.setAttribute("disabled", "disabled"));

  if (card.getAttribute("data-answer") == this.innerHTML) {
    result.innerHTML = "Correct!";
    score.innerHTML = currentScore + parseInt(card.getAttribute("data-value"));
    card.classList.add("correct");
  } else {
    result.innerHTML = "Wrong!";
    card.classList.add("wrong");
  }

  this.parentElement.appendChild(result);
}
