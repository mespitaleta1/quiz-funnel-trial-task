import { state } from "./state.js";
import { questions } from "../data/questions.js";
import { STARS_ICON, GOLD_STARS_ICON, RIGHT_CHEVRON, LEFT_CHEVRON } from "../assets/icon.js"

export function renderWelcome (){
    return `
    <div class="start-quiz-section">
        <h1>Discover which is your ideal product!</h1>
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

export function renderQuestion () {
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
        <span id="answer-error" class="answer-error-msg"></span>
        <ul>${currentAnswers}</ul>
    `;
}

export function renderQuiz() {
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

export function renderContactForm() {
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