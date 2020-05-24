const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error';
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmailValid(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(String(email.value).toLowerCase())) {
        showSuccess(email);
    } else {
        showError(email,`${getFieldName(email)} format is incorrect`);
    }
}

function getFieldName(input) {
    return `${input.id.charAt(0).toUpperCase()}${input.id.slice(1)}`;
}

function checkRequired(inputs) {
    inputs.forEach(function(input) {
        if(input.value.trim() == '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function checkLength(input,min,max) {
    if(input.value.length < min) {
        showError(input,`${getFieldName(input)} must be at least ${min} characters long`);
    } else if(input.value.length > 25) {
        showError(input,`${getFieldName(input)} cannot be more than ${max} characters long`);
    }
}

function checkPasswordMatch(password,passwordConfirm) {
    if(password.value !== passwordConfirm.value) {
        showError(passwordConfirm,`Passwords do not match`);
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequired([username,email,password,passwordConfirm]);
    checkLength(username,3,15);
    checkLength(password,6,25);
    isEmailValid(email);
    checkPasswordMatch(password,passwordConfirm);
});