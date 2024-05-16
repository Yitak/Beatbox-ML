// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


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

const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// MAILING LIST

const mailingFormContainer = document.querySelector(".mailing-signup-box");
ScrollReveal().reveal(mailingFormContainer, { delay: 65, reset: true });

const mailingForm = document.getElementById('mailing-form');
const newsletterEmailAddress = document.getElementById('newsletterEmailAddress');
const newsletterRepeatEmail = document.getElementById('newsletterRepeatEmail');
const newsletterSubscribe = document.getElementById('newsletter-subscribe');

const newsletterEmailErr = document.querySelector(".error-text.newsletter-email");
const newsletterRepeatErr = document.querySelector(".error-text.newsletter-repeat");


function sendSubscription() {
    let docData = {
        "email": newsletterEmailAddress.value.trim()
    };
    console.log(docData);
    addDoc(collection(firestoreDatabase, "mailing_list"), docData).then((docRef) => {
        console.log("Subscribed to newsletter. ID: ", docRef.id);
        Swal.fire({
            title: "Thank you for subscribing!",
            text: "Our irregular updates might end up in your junk folder - please check it occasionally!",
            icon: "success"
        });
        mailingForm.reset();
    }).catch((error) => {
        console.error(error);
        Swal.fire({
            title: "Unexpected error",
            text: "Please contact admin on beatml.webcontact@gmail.com",
            icon: "error"
        });
    });
}

function validateInputs() {
    if (validateEmail() == true && validateRepeatEmail() == true) {
        return true;
    } else {
        newsletterEmailAddress.addEventListener("keyup", validateEmail);
        newsletterRepeatEmail.addEventListener("keyup", validateRepeatEmail);
    }
}

function validateEmail() {
    newsletterEmailAddress.classList.remove("error");
    newsletterEmailAddress.parentElement.classList.remove("error");
    newsletterEmailErr.classList.remove("error");
    if (emailRegEx.test(newsletterEmailAddress.value.trim()) != true || (newsletterEmailAddress.value.trim().length < 10 || newsletterEmailAddress.value.trim().length > 64)) {
        newsletterEmailAddress.classList.add("error");
        newsletterEmailAddress.parentElement.classList.add("error");
        newsletterEmailErr.classList.add("error");
        newsletterEmailErr.textContent = "* Must be a valid email address";
        return false;
    }
    return true;
}

function validateRepeatEmail() {
    newsletterRepeatEmail.classList.remove("error");
    newsletterRepeatEmail.parentElement.classList.remove("error");
    newsletterRepeatErr.classList.remove("error");
    if (newsletterRepeatEmail.value.trim() != newsletterEmailAddress.value.trim()) {
        newsletterRepeatEmail.classList.add("error");
        newsletterRepeatEmail.parentElement.classList.add("error");
        newsletterRepeatErr.classList.add("error");
        newsletterRepeatErr.textContent = "* Must match above email address";
        return false;
    }
    return true;
}



newsletterSubscribe.addEventListener("click", (event) => {
    event.preventDefault();
    if (validateInputs() == true) {
        sendSubscription();
    }
})