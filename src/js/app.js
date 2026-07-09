import { state } from "./state.js";
import { render } from "./render.js";
import { loadState } from "./storage.js";

const savedState = loadState();

if (savedState) {
    Object.assign(state, savedState);
}

render();