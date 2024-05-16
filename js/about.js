function menuFunction() {
    var navMenu = document.getElementById('nav-menu');
    if (navMenu.className === "nav-menu") {
        navMenu.className += " responsive";
    } else {
        navMenu.className = "nav-menu";
    }
}

// SCROLL REVEAL

ScrollReveal({
    // reset: true,
    distance: '140px',
    duration: 2000,
    delay: 100
});

// Paragraphs content

const paragraphsContent = document.querySelectorAll(".paragraph-content");

for (const paragraphContent of paragraphsContent) {
    ScrollReveal().reveal(paragraphContent, { delay: 60 });
}

// OUR TEAM

const directorProfiles = document.querySelectorAll(".director-profile");

ScrollReveal().reveal('.content-section-header', { delay: 150 , origin: 'top' });
ScrollReveal().reveal(directorProfiles[0], { delay: 150 , origin : 'left' });
ScrollReveal().reveal(directorProfiles[1], { delay: 150 , origin : 'right' });

