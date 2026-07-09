import { state } from "./state.js";
import { render } from "./render.js";
import { questions } from "./questions.js";
import { validateForm } from "./validations.js"
import { saveState, clearState } from "./storage.js"
import { trackQuizStep, trackLead } from "./tracking.js"
import { subscribeToKlaviyo } from "./klaviyo.js"

export const REDIRECT_URL = "https://ledisa.com/products/glp-1";

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
    trackQuizStep(
        state.currentStep + 1,
        question.id,
        answer
    );
    nextQuestion();
}

function previousQuestion() {
    if (state.currentStep === 0) return;
    state.currentStep--;
    saveState(state);
    render();
}

function nextQuestion() {
    const question = questions[state.currentStep];
    const answerErrorEl = document.getElementById("answer-error");

    if (!state.answers[question.id]) {
        answerErrorEl.textContent = "Please select an answer to continue.";
        return;
    }

    answerErrorEl.textContent = "";

    if (state.currentStep === questions.length - 1) {
        state.screen = "contact";
        render();
        return;
    }
    state.currentStep++;
    saveState(state);
    render();
}

async function submitForm(event) {
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

    try {
        state.contact = data;
        saveState(state);
        trackLead(state.contact,state.answers);
        await subscribeToKlaviyo(state.contact,state.answers);

        clearState();
        window.location.href = REDIRECT_URL;
    } catch(error) {
        console.error("Submission failed:", error);
    }
}

export function attachEvents(root) {
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