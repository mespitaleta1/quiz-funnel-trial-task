import { trackQuizStep } from "../services/tracking.js";

class GtmTracker extends HTMLElement {
    connectedCallback() {
        document.addEventListener("quiz-answer-selected",this.handleQuizAnswer);
    }

    disconnectedCallback() {
        document.removeEventListener("quiz-answer-selected",this.handleQuizAnswer);
    }

    handleQuizAnswer = ({ detail }) => {
        trackQuizStep(detail);
    };
}

customElements.define("gtm-tracker", GtmTracker);