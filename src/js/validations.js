function isValidName(name) {
    return name.trim().length >= 2;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^\+?[1-9]\d{7,14}$/.test(phone.replace(/[\s()-]/g, ""));
}

export function validateForm(data) {
    let valid = true;
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');

    if(!isValidName(data.firstName)) {
        nameInput.classList.add("error");
        nameError.textContent = "Please enter your first name."
        valid = false;
    } else {
        nameInput.classList.remove("error");
        nameError.textContent = ""
    }

    if (!isValidEmail(data.email)) {
        emailInput.classList.add("error");
        emailError.textContent = "Please enter a valid email."
        valid = false;
    } else {
        emailInput.classList.remove("error");
        emailError.textContent = ""
    }

    if (!isValidPhone(data.phone)) {
        phoneInput.classList.add("error");
        phoneError.textContent = "Please enter a valid phone number."
        valid = false;
    } else {
        phoneInput.classList.remove("error");
        phoneError.textContent = ""
    }

    return valid;
}