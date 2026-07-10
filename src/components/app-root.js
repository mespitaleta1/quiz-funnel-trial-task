class AppRoot extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.screen="home";
    }

    connectedCallback(){
        this.render();
        this.shadowRoot.addEventListener("start-quiz",()=>{
            this.screen="quiz";
            this.render();
        });
    }

    render(){
        this.shadowRoot.innerHTML=`
            ${this.screen==="home"
                ? "<app-home></app-home>"
                : "<app-quiz></app-quiz>"
            }
        `;
    }
}

customElements.define("app-root",AppRoot);