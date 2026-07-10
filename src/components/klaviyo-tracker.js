import { subscribeToKlaviyo } from "../services/klaviyo.js";

class KlaviyoTracker extends HTMLElement {
    connectedCallback() {
        document.addEventListener(
            "quiz-submit",
            this.handleSubmit
        );
    }

    disconnectedCallback() {
        document.removeEventListener(
            "quiz-submit",
            this.handleSubmit
        );
    }

    handleSubmit = async (event) => {
        const { contact, answers } = event.detail;
        await subscribeToKlaviyo(
            contact,
            answers
        );
    };
}

customElements.define("klaviyo-tracker",KlaviyoTracker);