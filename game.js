const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [   {question: "Jak se jmenuje hrdina ze hry Heroes of Might and Magic V, zastupující rasu lidí, silný především díky své specializaci na válečné stroje?", 
                    choice1: "Irina", 
                    choice2: "Vittorio", 
                    choice3: "Klaus", 
                    choice4: "Ossir",
                    answer: 2},
                    {question: "Na území Slovenska nelezneme nádrž. Její hráz je vysoká 53 m, maximální hloubka nádrže je 45 m, vodní plocha má rozlohu 2 700 ha. S objemem vody 360 mil. m kubických, tvoří největší nádrž na území státu. Jak se tato nádrž jmenuje?", 
                    choice1: "Lipno", 
                    choice2: "Orlík", 
                    choice3: "Orava", 
                    choice4: "Liptovská mara",
                    answer: 4}, 
                    {question: "Na území dnešního Polska leží rozestavěná elektrárna, jenž měla být první jadernou elektrárnou v Polsku. Projekt byl však zrušen 4. září 1990, první reaktor byl hotový z 40 %, a téměř polovina rozpočtu byla již investována, ale i přes tyto skutečnosti většina lidí v referendu hlasovala proti dokončení. Jak se tento objekt, jehož část dnes slouží jako elektrárna vodní jmenuje?", 
                    choice1: "Żarnowiec", 
                    choice2: "Porąbka-Żar", 
                    choice3: "Cisowo", 
                    choice4: "Bełchatów",
                    answer: 1},
                    {question: "V séri knih o Harry Potterovi, nalezneme objekt, rostlinu, jež chrání vchod do Chroptící chýše. Kdykoli se k stromu někdo přiblíží a nedotkne se správného místa na jejím kmeni, začne sebou tetno strom házet na všechny strany. Jak se daný strom jmenoval?", 
                    choice1: "Vrba mlátička", 
                    choice2: "Mandragora Obecná", 
                    choice3: "Strom života", 
                    choice4: "Kůromlat",
                    answer: 1},
                    {question: "V obci Drahotuše byl skupinou mladých sportovců na počátku 21. století vynalezen sport. Pravidla byla prostá, hřiště bylo vytyčeno trampolínou a úkolem každého z hráčů bylo následně dostat míč do branky soupeře. Jak se tento sport jmenoval?", 
                    choice1: "Bas-hok-bal", 
                    choice2: "A jdeš!", 
                    choice3: "Hop", 
                    choice4: "Ball",
                    answer: 4},
                    {question: "V roce 2003 proběhly celkem 3 volby na prezidenta České republiky, v nichž se nakonec stal vítězem Václav Klaus, jak se jmenuje neuspěšný kandidát který zastupoval stranu ČSSD a taky se voleb zúčastníl.", 
                    choice1: "Mirek Topolánek", 
                    choice2: "Andrej Babiš", 
                    choice3: "Miloš Zeman", 
                    choice4: "Petr Pithart",
                    answer: 3},
                    {question: "Kolik dní má měsíc květen?", 
                    choice1: "365", 
                    choice2: "31", 
                    choice3: "29", 
                    choice4: "30",
                    answer: 2},
                    {question: "Jakou výšku měl nejvyšší vrchol jaký v historii závodu museli zdolat jezdci Tour de France? Do programu Tour byl tento kopec s názvem Col de la Bonette zařazen poprvé v roce 1993 a naposledy v roce 2008.", 
                    choice1: "1966 m.n.m.", 
                    choice2: "2021 m.n.m.", 
                    choice3: "2451 m.n.m.", 
                    choice4: "2802 m.n.m.",
                    answer: 4},
                    {question: "Jaké hodnoty nabývá k 3.1.2021 světový rekord v maratonu, zaběhlý v Berlíně dne 16.9.2018 Kěnanem Eliudem Kipchogem?", 
                    choice1: "2:01:39", 
                    choice2: "2:18:08", 
                    choice3: "2:05:11", 
                    choice4: "1:59:09",
                    answer: 1}, 
                    {question: "Říká se že k mračení potřebujete zapojit 42 obličejových svalů, kolik jich potřebujete k úsměvu?", 
                    choice1: "10", 
                    choice2: "17", 
                    choice3: "42", 
                    choice4: "60",
                    answer: 2}];


const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0; 
    availableQuestions = [...questions];
    getNewQuestion();    
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);        
        return window.location.assign('end.html');
    }
    
    questionCounter++;
    progressText.innerText = `Otázka ${questionCounter} ze ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    
    availableQuestions.splice(questionsIndex, 1);
    
    acceptingAnswers = true;    
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
                
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1500)
    })
})

incrementScore = num => {
    score += num 
    scoreText.innerText = score
}

startGame();



/**

var target = document.querySelector(".button");
target.addEventListener("mouseover", mOver, false);
target.addEventListener("mouseout", mOut, false);

function mOver() {
   target.setAttribute("style", "background-color:blue;")
}

function mOut() {  
   target.setAttribute("style", "background-color:green;")
}

**/
    