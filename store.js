import { reducer } from "./main";
import { gameSteps } from "./data/scenes.json";

let state = {stepKey:"start", health:5, inventory:[], history:['start']};
const listeners = new Set();

export function dispatch(action) {
    state = reducer(state, action, gameSteps);
    listeners.forEach(fn => fn(state));
}

export function subscribe(fn) {listeners.add(fn);return () => listeners.delete(fn);}
export function getState() {return state;}