"use strict"

let displayMessage = document.querySelector('[data-name="message"]');
const submitButton = document.querySelector('[data-name="submit"]');
const email = document.querySelector('input[name="user_email"]');
const zipCode = document.querySelector('input[name="user_zipcode"]');
let userPassword = document.querySelector('input[name="user_password"]');
let confirmPassword = document.querySelector('input[name="user_confirm"]');
const form = document.querySelector("form");
const regex = /^\d{5}$/

// validate email
const emailError = () => {
    if (email.validity.valueMissing) {
        email.style.cssText = 'border: 2px solid red; border-radius: 3px';
        displayMessage.style.color = 'red';
        displayMessage.textContent = '!! Please enter an email address.';
    } else if (email.validity.typeMismatch) {
        displayMessage.style.color = 'red';
        displayMessage.textContent = "!! Enter a valid email address.";
    }
}

email.addEventListener("input", () => {
    if (email.validity.valid) {
        displayMessage.textContent = "";
        email.style.cssText = 'border: 2px solid green; border-radius: 3px';

    } else {
        email.style.cssText = 'border: 2px solid red; border-radius: 3px';
        emailError();
    }
});

// validate zip code
const zipcodeError = () => {
    if (zipCode.validity.valueMissing) {
        zipCode.style.cssText = 'border: 2px solid red; border-radius: 3px';
        displayMessage.style.color = 'red';
        displayMessage.textContent = "!! Please enter a zip code.";
    } else if (!zipCode.value.match(regex)) {
        displayMessage.style.color = 'red';
        displayMessage.textContent = "!! Enter a 5 digit zipcode.";
    }
}

zipCode.addEventListener('input', () => {
    if (zipCode.value.match(regex)) {
        displayMessage.textContent = "";
        zipCode.style.cssText = 'border: 2px solid green; border-radius: 3px';
    } else {
        zipCode.style.cssText = 'border: 2px solid red; border-radius: 3px';
        zipcodeError();
    }
})

// validate password
const passwordError = () => {
    if (userPassword.validity.valueMissing) {
        displayMessage.style.color = 'red';
        userPassword.style.cssText = 'border: 2px solid red; border-radius: 3px';
        displayMessage.textContent = '!! please enter a password';
    } else if (confirmPassword.validity.valueMissing) {
        displayMessage.style.color = 'red';
        confirmPassword.style.cssText = 'border: 2px solid red; border-radius: 3px';
        displayMessage.textContent = '!! please confirm password';

    }
}

const validatePassword = () => {
    if (userPassword.value !== confirmPassword.value) {
        displayMessage.style.color = 'red';
        userPassword.style.cssText = 'border: 2px solid red; border-radius: 3px';
        displayMessage.textContent = '!! confirm password does not match password';
        submitButton.disabled = true;
        submitButton.style.opacity = (0.4);
    } else {
        displayMessage.style.color = 'green';
        userPassword.style.cssText = 'border: 2px solid green; border-radius: 3px';
        confirmPassword.style.cssText = 'border: 2px solid green; border-radius: 3px';
        displayMessage.textContent = '* password matches';
        submitButton.disabled = false;
        submitButton.style.opacity = (1);
    }
}

confirmPassword.addEventListener('input', validatePassword);

form.addEventListener("submit", (e) => {
    if (!email.validity.valid) {
        emailError();
        e.preventDefault();
    } else if (!zipCode.validity.valid || !zipCode.value.match(regex)) {
        zipcodeError();
        e.preventDefault();
    } else if (userPassword.validity.valueMissing || confirmPassword.validity.valueMissing) {
        passwordError();
        e.preventDefault();
    }
});