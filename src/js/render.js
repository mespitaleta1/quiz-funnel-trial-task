import { state } from "./state.js";
import { questions } from "./questions.js";
import { validateForm } from "./validations.js"
import { saveState, clearState } from "./storage.js"
import { STARS_ICON, GOLD_STARS_ICON, RIGHT_CHEVRON, LEFT_CHEVRON } from "../assets/icon.js"

//console.log('%cQUIZ FUNNEL', 'background-color: blue; color: white; font-style: italic; border-radius: 5px;padding: 2px', state);

//Templates:
function renderQuestion () {
    const currentQuestion = questions[state.currentStep];
    const selectedAnswer = state.answers[currentQuestion.id];
    const currentAnswers = currentQuestion.options
        .map(option => `
            <li class="quiz-option ${option.value === selectedAnswer ? "selected" : ""}" data-answer="${option.value}">
                ${option.label}
            </li>
        `)
        .join("");

    return `
        <h2>${currentQuestion.title}</h2>
        <ul>${currentAnswers}</ul>
    `;
}

function renderWelcome (){
    return `
    <div class="start-quiz-section">
        <h1>Discover which is your Ledisa product!</h1>
        <p class="start-quiz-description">This quiz will takes less than 5 minutes.</p>
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
            ${progress === 100 ? GOLD_STARS_ICON : STARS_ICON}
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
            <button class="prev-quiz-question" type="button" ${state.currentStep === 0 ? 'disabled': ''}> ${LEFT_CHEVRON}  </button>
            <button class="next-quiz-question" type="button"> ${RIGHT_CHEVRON} </button>
        </div>
    </div>`;
}

function renderContactForm() {
    return `
     <h2> Great! One last step. </h2>
     <p> Complete your details and we'll send your personalized recommendation. </p>

     <div>
        <form id="contact-form" novalidate>
            <div>
                <label for="name"> First name </label>
                <input type="text" id="name" name="firstName" required minlength="2" maxlength="50" placeholder="e.g. John Doe">
                <span id="name-error" class="error-msg"></span>
            </div>

            <div>
                <label for="email"> Email </label>
                <input type="email" id="email" name="email" size="30" required placeholder="email@gmail.com">
                <span id="email-error" class="error-msg"></span>
            </div>

            <div>
                <label for="phone"> Phone number </label>
                <input type="tel" id="phone" name="phone" placeholder="+57 300 123 4567" required >
                <span id="phone-error" class="error-msg"></span>
            </div>

            <button class="submit-contact" type="submit"> Get my Recommendation </button>
        </form>
    </div>
    `
}

//Template events:
function startQuiz() {
    state.screen = "quiz";
    saveState(state);;
    render();
}

function selectAnswer(event) {
    const answer = event.currentTarget.dataset.answer;
    const question = questions[state.currentStep];
    state.answers[question.id] = answer;
    saveState(state);
    nextQuestion();
}

function previousQuestion() {
    if (state.currentStep === 0) return;
    state.currentStep--;
    saveState(state);
    render();
}

function nextQuestion() {
    if (state.currentStep === questions.length - 1) {
        state.screen = "contact";
        render();
        return;
    }
    state.currentStep++;
    saveState(state);
    render();
}

function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        firstName: formData.get("firstName").trim(),
        email: formData.get("email").trim(),
        phone: formData.get("phone").trim(),
    };

    const isValid = validateForm(data);
    if (!isValid) return;

    state.contact = data;
    saveState(state);
    console.log('%cQUIZ FUNNEL', 'background-color: blue; color: white; font-style: italic; border-radius: 5px;padding: 2px', state);
    clearState();
    //window.location.href = "https://ledisa.com/products/glp-1";

}

function attachEvents(root) {
    const startQuizBtn = root.querySelector(".start-quiz");
    const options = root.querySelectorAll(".quiz-option");
    const prevQuestionBtn = root.querySelector(".prev-quiz-question");
    const nextQuestionBtn = root.querySelector(".next-quiz-question");
    const form = root.querySelector("form");

    startQuizBtn?.addEventListener("click", startQuiz);
    options.forEach(option => { option.addEventListener("click", selectAnswer) });
    prevQuestionBtn?.addEventListener("click", previousQuestion);
    nextQuestionBtn?.addEventListener("click", nextQuestion);
    form?.addEventListener("submit", (e) => submitForm(e));
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