import { STARS_ICON, GOLD_STARS_ICON } from "../assets/icon.js"

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
        :host {
          display: block;
          color: #252525;
          font-family: "DM Sans", sans-serif;
          padding: 50px 10%;
        }

        .wizard {
          max-width: 640px;
          margin: 0 auto;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #ddd;
          background: white;
        }

        .progress {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 32px;
          position: relative;
        }

        .progress-label {
          font-size: 14px;
          color: #666;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #ececec;
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-fill {
          width: ${(this.currentStep + 1) / this.totalSteps * 100}%;
          height: 100%;
          background: #40a3b5;
          transition: width .3s ease;
          border-radius: 5px;
        }

        .progress svg{
          top: 16px;
          position: absolute;
          right: -8px;
          width: 34px;
          height: 34px;
      }

        .content {
          margin-bottom: 32px;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          gap: 16px;
        }

        button {
          padding: 12px 18px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
        }

        button:disabled {
          opacity: .4;
          cursor: not-allowed;
        }

        .secondary {
          background: #efefef;
        }

        .primary {
          background: #40a3b5;
          color: white;
        }

        .primary:hover{
          background:#4D468C;
        }
      </style>

      <section class="wizard">
        <header class="progress">

          <span class="progress-label">
            Step ${this.currentStep + 1} of ${this.totalSteps}
          </span>

          <div class="progress-bar">
            <div class="progress-fill"></div>

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