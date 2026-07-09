import { state } from "./state.js";
import { attachEvents } from "./quizEvents.js"
import { renderWelcome, renderQuiz, renderContactForm } from "./templates.js"

export function render() {
    const root = document.querySelector("#root");
    const screens = {
        welcome: renderWelcome,
        quiz: renderQuiz,
        contact: renderContactForm,
    };

    const content = screens[state.screen]();

    root.innerHTML = `
        <main>
        ${content}
        </main>
    `;

    attachEvents(root);
}