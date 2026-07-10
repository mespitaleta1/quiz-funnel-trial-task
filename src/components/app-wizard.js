import { STARS_ICON, GOLD_STARS_ICON } from "../assets/icon.js"
import { APP_WIZARD_STYLES } from "../styles/app-wizard.styles.js"

class AppWizard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return [
      "current-step",
      "total-steps",
      "can-continue"
    ];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get currentStep() {
    return Number(this.getAttribute("current-step")) || 0;
  }

  get totalSteps() {
    return Number(this.getAttribute("total-steps")) || 0;
  }

  get canContinue() {
    return this.getAttribute("can-continue") !== "false";
  }

  get isFirstStep() {
    return this.currentStep === 0;
  }

  get isLastStep() {
    return this.currentStep === this.totalSteps - 1;
  }

  get progress() {
    return ((this.currentStep + 1) / this.totalSteps) * 100;
  }

  previous() {
    this.dispatchEvent(
      new CustomEvent("wizard-previous", {
        bubbles: true,
        composed: true,
      })
    );
  }

  next() {
    this.dispatchEvent(
      new CustomEvent("wizard-next", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
       ${APP_WIZARD_STYLES}
      </style>

      <section class="wizard">
        <header class="progress">

          <span class="progress-label">
            Step ${this.currentStep + 1} of ${this.totalSteps}
          </span>

          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(this.currentStep + 1) / this.totalSteps * 100}%"></div>

          </div>
          ${ this.progress === 100 ? GOLD_STARS_ICON : STARS_ICON }
        </header>

        <section class="content">
          <slot></slot>
        </section>

        <footer class="actions">
          <button
            id="previous"
            class="secondary"
            type="button"
            ${this.isFirstStep ? "disabled" : ""}
          >
            Previous
          </button>

          <button
            id="next"
            class="primary"
            type="button"
            ${!this.canContinue ? "disabled" : ""}
          >
            ${this.isLastStep ? "Submit" : "Next"}
          </button>
        </footer>

      </section>
    `;

    this.shadowRoot
      .querySelector("#previous")
      ?.addEventListener("click", () => this.previous());

    this.shadowRoot
      .querySelector("#next")
      ?.addEventListener("click", () => this.next());
  }
}

customElements.define("app-wizard", AppWizard);