class AppWizardStep extends HTMLElement {
  static get observedAttributes() {
    return["active"];
  }

  connectedCallback(){
    this.render();
  }

  attributeChangedCallback() {
    this.render()
  }

  get active() {
    return this.hasAttribute("active");
  }

  set active(value) {
    if(value) {
      this.setAttribute("active", "");
    } else {
      this.removeAttribute("active");
    }
  }

  render(){
    this.style.display = this.active ? "block" : "none";
  }
}

customElements.define('app-wizard-step', AppWizardStep);