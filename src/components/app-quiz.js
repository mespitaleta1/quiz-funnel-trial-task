import { questions } from "../data/questions.js"
import { APP_QUIZ_STYLES } from "../styles/app-quiz.styles.js"
import { validateField, validateContact } from "../utils/validations.js"

class AppQuiz extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.submitRedirect = "https://ledisa.com/products/glp-1";
        this.questions = questions;
        this.state = {
            currentStepIndex: 0,
            answers: {},
            contact: {
                name: "",
                email: "",
                phone: "",
            },
        };
    }

    connectedCallback() {
      this.render();
    }

    get isContactStep() {
     return this.state.currentStepIndex === this.questions.length;
    }

    get currentQuestion() {
        return this.questions[this.state.currentStepIndex];
    }

    get canContinue() {
        if (this.isContactStep) {
          return (
              validateField("name", this.state.contact.name) === "" &&
              validateField("email", this.state.contact.email) === "" &&
              validateField("phone", this.state.contact.phone) === ""
          );
        }

        return Boolean(
            this.state.answers[this.currentQuestion.id]
        );
    }

    updateAnswer(questionId, optionId) {
        this.state.answers = {
            ...this.state.answers,
            [questionId]: optionId,
        };

        this.dispatchEvent(
          new CustomEvent("quiz-answer-selected", {
              detail: {
                  step: this.state.currentStepIndex + 1,
                  questionId,
                  answer: optionId,
                  answers: {...this.state.answers}
              },
              bubbles: true,
              composed: true
          })
        );
        this.render();
    }

    updateContact(field, value) {
        this.state.contact = {
            ...this.state.contact,
            [field]: value
        }

        const wizard = this.shadowRoot.querySelector("app-wizard");
        if (wizard) {
            wizard.setAttribute("can-continue",this.canContinue);
        }
    }

    updateCurrentStep(index) {
        this.state.currentStepIndex = Math.max( 0,Math.min(index, this.questions.length));
        this.render();
    }

    showFieldError(field, message) {
      const input = this.shadowRoot.querySelector(`[name="${field}"]`);
      const error = this.shadowRoot.querySelector(`[data-error="${field}"]`);

      if (!input || !error) return;

      if (message) {
        input.classList.add("error");
        error.textContent = message;
      } else {
        input.classList.remove("error");
        error.textContent = "";
      }
    }

    submit() {
        const errors = validateContact(this.state.contact);
        Object.entries(errors).forEach(([field, message]) => {
            this.showFieldError(field, message);
        });

        if (Object.keys(errors).length > 0) {
            return;
        }

        const payload = {
            answers: this.state.answers,
            contact: this.state.contact,
        }

        this.dispatchEvent(
            new CustomEvent("quiz-submit", {
                detail: payload,
                bubbles: true,
                composed: true,
            })
        );

        window.location.href = this.submitRedirect;
    }

    renderQuestionStep(question) {
        const selectedOption = this.state.answers[question.id];
        return `
            <h2>${question.title}</h2>
            <div class="options">
            ${question.options.map(
                (option) => `
                <button
                    class="option ${selectedOption === option.value ? "selected" : ""}"
                    type="button"
                    data-question-id="${question.id}"
                    data-option-id="${option.value}"
                >
                    ${option.label}
                </button>
                `).join("")}
            </div>
        `;
    }

    renderContactStep() {
        return `
          <h2>Contact information</h2>

          <label>
            Name
            <input
              name="name"
              value="${this.state.contact.name}"
              placeholder="Your name"
            />
            <small class="error" data-error="name"></small>
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value="${this.state.contact.email}"
              placeholder="you@example.com"
            />
            <small class="error" data-error="email"></small>
          </label>

          <label>
            Phone
            <input
              name="phone"
              value="${this.state.contact.phone}"
              placeholder="Your phone"
            />
            <small class="error" data-error="phone"></small>
          </label>
        `;
    }

    render() {
      const step = this.isContactStep
      ? this.renderContactStep()
      : this.renderQuestionStep(this.currentQuestion);

        this.shadowRoot.innerHTML = `
        <style>
          ${APP_QUIZ_STYLES}
       </style>

        <app-wizard
            current-step="${this.state.currentStepIndex}"
            total-steps="${this.questions.length + 1}"
            can-continue="${this.canContinue}"
        >
            ${step}
        </app-wizard>
        `;

        this.shadowRoot
          .querySelectorAll(".option").forEach((button) => {
            button.addEventListener("click", ()=> {
                this.updateAnswer(
                    button.dataset.questionId,
                    button.dataset.optionId
                )
            })
        });

        this.shadowRoot.querySelectorAll("input").forEach((input) => {
          input.addEventListener("input", (e) => {
              this.updateContact(
                  e.target.name,
                  e.target.value
              );

              const message = validateField(
                  e.target.name,
                  e.target.value
              );

              this.showFieldError(
                  e.target.name,
                  message
              );
          });
      });

        const wizard = this.shadowRoot.querySelector("app-wizard");

        wizard?.addEventListener("wizard-next", () => {
          if (this.isContactStep) {
            this.submit();
            return;
          }

          this.updateCurrentStep(this.state.currentStepIndex + 1);
        });

        wizard?.addEventListener("wizard-previous", () => {
          if (this.state.currentStepIndex === 0) return;

          this.updateCurrentStep(this.state.currentStepIndex - 1);
        });
    }
}

customElements.define("app-quiz", AppQuiz);