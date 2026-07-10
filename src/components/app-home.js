import { HOME_STYLES } from "../styles/home.styles.js"
class AppHome extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
        ${ HOME_STYLES }
        </style>

        <section class="container">
            <h1>Discover which is your ideal product!</h1>

            <p>
              This quiz takes less than 5 minutes.
            </p>

            <button id="start">
                Start Quiz Now
            </button>
        </section>
      `;

      this.shadowRoot
        .querySelector("#start")
        .addEventListener("click", () => {
          this.dispatchEvent(
            new CustomEvent("start-quiz", {
              bubbles: true,
              composed: true
            })
          );
        });
    }
  }

  customElements.define("app-home", AppHome);