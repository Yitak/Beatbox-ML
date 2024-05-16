// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCikeBCko6DcGPxa_UW6EjlQ9qMXI_dayY",
  authDomain: "beatbox-ml-website-indev.firebaseapp.com",
  projectId: "beatbox-ml-website-indev",
  storageBucket: "beatbox-ml-website-indev.appspot.com",
  messagingSenderId: "521629764815",
  appId: "1:521629764815:web:0273ce66150e58ef6b3bba"
};


// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const firestoreDatabase = getFirestore(firebaseApp);






// CONTACT FORM

ScrollReveal().reveal('.contactform-container', { delay: 200, reset: true });

const contactform = document.getElementById('contactform');
const firstName = document.getElementById('First Name');
const lastName = document.getElementById('Last Name');
const emailAddress = document.getElementById('Email Address');
const repeatEmail = document.getElementById('Repeat Email Address');
const phoneNumber = document.getElementById('Phone Number');
const userMessageTags = document.getElementById('Tags');
const userMessage = document.getElementById('Message');
const contactformSubmit = document.getElementById('contactform-submit');

const firstNameErr = document.querySelector(".error-text-firstname");
const lastNameErr = document.querySelector(".error-text-lastname");
const emailErr = document.querySelector(".error-text.email");
const repeatEmailErr = document.querySelector(".error-text.repeat-email");
const phoneError = document.querySelector(".error-text.phone");
const titleErr = document.querySelector(".error-text.title");
const msgErr = document.querySelector(".error-text.message-content");

const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}

// send contact form after client-side validation passes
function sendContactForm() {
    let docData = {
        "first_name": firstName.value.trim(),
        "surname": lastName.value.trim(),
        "email": emailAddress.value.trim(),
        "phone": phoneNumber.value.trim(),
        "title": userMessageTags.value.trim(),
        "message": userMessage.value.trim()
    };
    console.log(docData);
    addDoc(collection(firestoreDatabase, "contact_form"), docData).then((docRef) => {
        console.log("Contact form sent. ID: ", docRef.id);
        Swal.fire({
            title: "Contact form sent!",
            text: "We will be in touch shortly.",
            icon: "success"
        });
        contactform.reset();
    }).catch((error) => {
        console.error(error);
        Swal.fire({
            title: "Unexpected error",
            text: "Please contact admin on beatml.webcontact@gmail.com",
            icon: "error"
        });
    });
    
}

const trueTest = (element) => {
    if (element == true) {
        return true;
    } else {
        return false;
    }
}

// client-side validation. must match the negation of firestore security rules, otherwise sendContactForm may error
function validateInputs() {
    let returnValues = {
        firstName: false,
        lastName: false,
        emailAddress: false,
        repeatEmail: false,
        phoneNumber: false,
        userMessageTags: false,
        userMessage: false
    };

    returnValues.firstName = validateFirstName();
    firstName.addEventListener("keyup", validateFirstName);

    returnValues.lastName = validateLastName();
    lastName.addEventListener("keyup", validateLastName);

    returnValues.emailAddress = validateEmail();
    emailAddress.addEventListener("keyup", validateEmail);

    returnValues.repeatEmail = validateRepeatEmail();
    repeatEmail.addEventListener("keyup", validateRepeatEmail);

    returnValues.phoneNumber = validatePhone();
    phoneNumber.addEventListener("keyup", validatePhone);

    returnValues.userMessageTags = validateTitle();
    userMessageTags.addEventListener("keyup", validateTitle);

    returnValues.userMessage = validateMessage();
    userMessage.addEventListener("keyup", validateMessage);

    console.log(returnValues);

    if (!Object.values(returnValues).every(trueTest)) {
        return false;
    }

    return true;

}

function validateFirstName() {
    firstName.classList.remove("error");
    firstName.parentElement.classList.remove("error");
    firstNameErr.classList.remove("error");
    if (isEmpty(firstName.value)) {
        firstName.classList.add("error");
        firstName.parentElement.classList.add("error");
        firstNameErr.classList.add("error");
        firstNameErr.textContent = "* Required";
        return false;
    }
    if (firstName.value.trim().length > 40) {
        firstName.classList.add("error");
        firstName.parentElement.classList.add("error");
        firstNameErr.classList.add("error");
        firstNameErr.textContent = "* Must not exceed 40 characters"
        return false;
    }
    return true;
}

function validateLastName() {
    lastName.classList.remove("error");
    lastName.parentElement.classList.remove("error");
    lastNameErr.classList.remove("error");
    if (isEmpty(lastName.value)) {
        lastName.classList.add("error");
        lastName.parentElement.classList.add("error");
        lastNameErr.classList.add("error");
        lastNameErr.textContent = "* Required";
        return false;
    }
    if (lastName.value.trim().length > 40) {
        lastName.classList.add("error");
        lastName.parentElement.classList.add("error");
        lastNameErr.classList.add("error");
        lastNameErr.textContent = "* Must not exceed 40 characters"
        return false;
    }
    return true;
}

function validateEmail() {
    emailAddress.classList.remove("error");
    emailAddress.parentElement.classList.remove("error");
    emailErr.classList.remove("error");
    if (emailRegEx.test(emailAddress.value.trim()) != true || (emailAddress.value.trim().length < 10 || emailAddress.value.trim().length > 64)) {
        emailAddress.classList.add("error");
        emailAddress.parentElement.classList.add("error");
        emailErr.classList.add("error");
        emailErr.textContent = "* Must be a valid email address";
        return false;
    }
    return true;
}

function validateRepeatEmail() {
    repeatEmail.classList.remove("error");
    repeatEmail.parentElement.classList.remove("error");
    repeatEmailErr.classList.remove("error");
    if (repeatEmail.value.trim() != emailAddress.value.trim()) {
        repeatEmail.classList.add("error");
        repeatEmail.parentElement.classList.add("error");
        repeatEmailErr.classList.add("error");
        repeatEmailErr.textContent = "* Must match above email address";
        return false;
    }
    return true;
}

function validatePhone() {
    phoneNumber.classList.remove("error");
    phoneNumber.parentElement.classList.remove("error");
    phoneError.classList.remove("error");
    if (!isEmpty(phoneNumber.value) && (phoneNumber.value.trim().length < 4 || phoneNumber.value.trim().length > 32)) {
        phoneNumber.classList.add("error");
        phoneNumber.parentElement.classList.add("error");
        phoneError.classList.add("error");
        phoneError.textContent = "* Must be a valid phone number or left blank";
        return false;
    }
    return true;
}

function validateTitle() {
    userMessageTags.classList.remove("error");
    userMessageTags.parentElement.classList.remove("error");
    titleErr.classList.remove("error");
    if (userMessageTags.value.trim().length < 5 || userMessageTags.value.trim().length > 64) {
        userMessageTags.classList.add("error");
        userMessageTags.parentElement.classList.add("error");
        titleErr.classList.add("error");
        titleErr.textContent = `* Subject must be 5-64 characters long (currently ${userMessageTags.value.trim().length})`;
        return false;
    }
    return true;
}

function validateMessage() {
    userMessage.classList.remove("error");
    userMessage.parentElement.classList.remove("error");
    msgErr.classList.remove("error");
    if (userMessage.value.trim().length < 10 || userMessage.value.trim().length > 1024) {
        userMessage.classList.add("error");
        userMessage.parentElement.classList.add("error");
        msgErr.classList.add("error");
        msgErr.textContent = `* Message must be 10-1024 characters long (currently ${userMessage.value.trim().length})`;
        return false;
    }
    return true;
}


contactformSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    if (validateInputs() == true) {
        sendContactForm();
    }
});

