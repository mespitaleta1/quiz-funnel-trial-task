import { state } from "./state.js";
import { questions } from "./questions.js";

//console.log('%cQUIZ FUNNEL', 'background-color: blue; color: white; font-style: italic; border-radius: 5px;padding: 2px', state);

//Templates:
function renderQuestion () {
    const currentQuestion = questions[state.currentStep];
    const currentAnswers = currentQuestion.options.map(option => `<li>${option}</li>`).join("");
    return `
        <h2>${currentQuestion.title}</h2>
        <ul>${currentAnswers}</ul>
    `;
}

function renderWelcome (){
    return `
    <div class="start-quiz-section">
        <h1>Discover which is your Ledisa product!</h1>
        <p>This quiz will takes less than 5 minutes</p>
        <button class="start-quiz" type="button"> Start Quiz Now </button>
    </div>
    `;
}

function renderProgressBar() {
    const progress = ((state.currentStep + 1) / questions.length) * 100;

    return `
        <div class="progress">
            <div
                class="progress-fill"
                style="width:${progress}%">
            </div>
        </div>
    `;
}

function renderQuiz() {
    return `
    <div class="quiz">
        ${renderProgressBar()}
        <p>Question ${state.currentStep + 1} of ${ questions.length }</p>
        ${renderQuestion()}
        <div class="quiz-navigation">
            <button class="prev-quiz-question" type="button" ${state.currentStep === 0 ? 'disabled': ''}> Back </button>
            <button class="next-quiz-question" type="button"> Next </button>
        </div>
    </div>`;
}

function renderContactForm() {
    return `
     <h2> Great! One last step. </h2>
     <p> Complete your details and we'll send your personalized recommendation. </p>

     <div>
        <form method="post" class="">
            <label for="name"> First name </label>
            <input id="name" type="text" name="name" required>

            <label for="email"> Email </label>
            <input type="email" id="email" size="30" required placeholder="email@gmail.com">

            <label for="phone"> Phone number </label>
            <input type="tel" id="phone" placeholder="+57 300 123 4567" required >

            <button class="submit-contact" type="submit"> Get my Recommendation </button>
        </form>
    </div>
    `
}

//Template events:
function startQuiz() {
    state.screen = "quiz";
    render();
}

function previousQuestion() {
    if (state.currentStep === 0) return;
    state.currentStep--;
    render();
}

function nextQuestion() {
    if (state.currentStep === questions.length - 1) {
        state.screen = "contact";
        render();
        return;
    }
    state.currentStep++;
    render();
}

function submitForm(event) {
    event.preventDefault();
    console.log("GTM");
    console.log("Enviar a Klaviyo");
    window.location.href = "https://ledisa.com/products/glp-1";

}

function attachEvents(root) {
    const startQuizBtn = root.querySelector(".start-quiz");
    const prevQuestionBtn = root.querySelector(".prev-quiz-question");
    const nextQuestionBtn = root.querySelector(".next-quiz-question");
    const form = root.querySelector("form");

    startQuizBtn?.addEventListener("click", startQuiz);
    prevQuestionBtn?.addEventListener("click", previousQuestion);
    nextQuestionBtn?.addEventListener("click", nextQuestion);
    form?.addEventListener("submit", submitForm());
}

export function render() {
    const root = document.querySelector("#root");
    let content = "";

    switch (state.screen) {
        case "welcome":
        content = renderWelcome();
        break;

        case "quiz":
        content = renderQuiz();
        break;

        case "contact":
        content = renderContactForm();
        break;
    }

    root.innerHTML = `
        <main>
        ${content}
        </main>
    `;

    attachEvents(root);
}