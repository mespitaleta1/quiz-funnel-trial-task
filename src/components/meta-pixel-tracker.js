import { trackLead } from "../services/tracking.js";

class MetaPixelTracker extends HTMLElement {
    connectedCallback() {
        document.addEventListener("quiz-submit",this.handleSubmit);
    }

    disconnectedCallback() {
        document.removeEventListener("quiz-submit",this.handleSubmit);
    }

    handleSubmit = (event) => {
        const { contact, answers } = event.detail;
        trackLead(contact, answers);
    };
}

customElements.define("meta-pixel-tracker", MetaPixelTracker);