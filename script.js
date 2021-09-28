const game = document.getElementById("game");
const score = document.getElementById("score");
const apiURL = "https://opentdb.com/api.php?amount=12&difficulty=medium"

const filmCat = 11;
const animalCat = 27;
const animeCat = 32;

const levels = ['easy', 'medium','hard'];
const genres = [
    {
        name: "Film",
        number: 11
    },
    {
        name: "Animals",
        number: 27
    },
    {
        name: "Cartoons",
        number: 32    
    }
]


function addCategory (catName, catNumber){
    const column = document.createElement('div');
    column.classList.add('category-column');   
    column.innerHTML = catName; 

    levels.forEach(level => {
        const card = document.createElement('div');

        if (level == 'easy'){
            card.innerHTML = 100;
        }
        if (level == 'medium'){
            card.innerHTML = 200;
        }
        if (level == 'hard'){
            card.innerHTML = 300;
        }
        card.classList.add('card');
        column.append(card);
        fetch(`https://opentdb.com/api.php?amount=3&category=${catNumber}&difficulty=${level}`)
        .then(response => response.json())
        .then(data => {
            card.setAttribute('data-question', data.results[0].question);
            card.setAttribute('data-answer', data.results[0].correct_answer); 
            card.setAttribute('data-value', card.innerHTML);
            card.addEventListener('click', flipCard);            
            });

        game.append(column);
        })    
};

function flipCard(){
    const btnTrue = document.createElement('button');
    btnTrue.classList.add('btn');
    btnTrue.innerHTML='True'; 
    
    const btnFalse = "<buttom class='btn'>False</button>";
    this.innerHTML = this.getAttribute("data-question");
    this.appendChild(btnTrue);
    
}

function generateGame(){
    genres.forEach(genre => {
        addCategory(genre.name, genre.number);
    })
}
generateGame();
