// Set up canvas and define constants
const html = document.documentElement;




function getPos(element) {
    let rect = element.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

function viewport() {
    return {
        width: Math.max(html.clientWidth || 0, window.innerWidth || 0),
        height: Math.max(html.clientHeight || 0, window.innerHeight || 0)
    };
}







// TOGGLE RESPONSIVE MENU


function menuFunction() {
    var navMenu = document.getElementById('nav-menu');
    
    if (navMenu.className === "nav-menu") {
        navMenu.className += " responsive";
    } else {
        navMenu.className = "nav-menu";
    }

}

// SHOWCASE CHAT REVEAL ANIMATIONS

const UserDialogues = document.querySelectorAll("[class$='user']");
const AIDialogues = document.querySelectorAll("[class$='ai']");
const VisionCards = document.querySelectorAll("[class^='vision-card']");
const ShowMoreButtons = document.querySelectorAll(".toggle-vision");
const OverFlowTexts = document.querySelectorAll(".overflow-text");
const ShortVersionTexts = document.querySelectorAll(".short-version");

ScrollReveal({
    // reset: true,
    distance: '140px',
    duration: 2000,
    delay: 100
});

// ScrollReveal().reveal('.hero-container', { delay: 150 , origin: 'bottom' });

ScrollReveal().reveal('.content-section-header', { delay: 150 , origin: 'top' });

for (const AIDialogue of AIDialogues) {
    ScrollReveal().reveal(AIDialogue, { delay: 60 , origin: 'left' });
}

for (const UserDialogue of UserDialogues) {
    ScrollReveal().reveal(UserDialogue, { delay: 60 , origin: 'right' });
}

// Paragraphs content

const paragraphsContent = document.querySelectorAll(".paragraph-content");

for (const paragraphContent of paragraphsContent) {
    ScrollReveal().reveal(paragraphContent, { delay: 60 });
}

// Vision Cards

ScrollReveal().reveal(VisionCards[0], { delay: 80 , origin: 'left'});
ScrollReveal().reveal(VisionCards[2], { delay: 80 , origin: 'right'});
ScrollReveal().reveal(VisionCards[4], { delay: 80 , origin: 'left'});

for (const i of Array(3).keys()) {
    ShowMoreButtons[i].addEventListener("click", () => {
        if (ShowMoreButtons[i].textContent == "Show details") {
            ShortVersionTexts[i].style.display = "none";
            OverFlowTexts[i].style.display = "block";
            setTimeout(() => {
                ShortVersionTexts[i].style.opacity = "0";
                OverFlowTexts[i].style.opacity = "1";
            }, 80);
            ShowMoreButtons[i].textContent = "Hide details";
        } else {
            setTimeout(() => {
                OverFlowTexts[i].style.opacity = "0";
                ShortVersionTexts[i].style.opacity = "1";
            }, 80);
            OverFlowTexts[i].style.display = "none";
            ShortVersionTexts[i].style.display = "block";
            ShowMoreButtons[i].textContent = "Show details";
        }
        
    });
}



// SCROLL TO TOP BUTTON

const scrollToTopButton = document.getElementById("scrollToTopButton");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
    scrollToTopButton.style.display = "block";
    scrollToTopButton.style.zIndex = "99999";
    setTimeout(() => { scrollToTopButton.style.opacity = 1; }, 100);
  } else {
    scrollToTopButton.style.opacity = 0;
    setTimeout(() => { scrollToTopButton.style.display = "none"; scrollToTopButton.style.zIndex = "-1"; }, 260);
  }
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

scrollToTopButton.addEventListener("click", () => {
    scrollToTop();
});