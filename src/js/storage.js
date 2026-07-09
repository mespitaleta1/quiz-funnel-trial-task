const STORAGE_KEY = "quiz-funnel";

export function saveState(state) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );
}

export function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : null;
}

export function clearState() {
    localStorage.removeItem(STORAGE_KEY);
}