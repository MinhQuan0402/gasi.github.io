//get the "open menu" button (meant for hamIcon)
const hamBtn=document.querySelector("#hamIcon");
//connect hamBtn click to toggleMenus function
hamBtn.addEventListener("click",toggleMenus);
//get the menuItem list
const menu = document.querySelector(".mobile-layout .mobile-menu");

var isMenuOpen = false;

function toggleMenus(){
    isMenuOpen = !isMenuOpen; //toggle the state
    const overlay = document.getElementById('overlay');
    if(isMenuOpen){ //if menu is showing
        menu.classList.add("menuShow"); // add class to show menu
        document.body.classList.add("no-scroll");
        hamIcon.innerHTML = "&times;";
        hamIcon.classList.add("cross");
        document.querySelector('main').classList.add('blurred'); // add blurred class to main
        document.querySelector('footer').classList.add('blurred'); // add blurred class to footer
        overlay.classList.add('active'); // add active class to overlay
    }  
    else{ //if menu NOT showing
        menu.classList.remove("menuShow"); // remove class to hide menu
        document.body.classList.remove("no-scroll");
        hamIcon.innerHTML = "&#9776;";
        hamIcon.classList.remove("cross");
        document.querySelector('main').classList.remove('blurred'); // remove blurred class from main
        document.querySelector('footer').classList.remove('blurred'); // remove blurred class from footer
        overlay.classList.remove('active'); // remove active class from overlay
    }
}

const pages = document.querySelectorAll('section');
const navBtns = document.querySelectorAll('.mobile-menu nav ul li button');

pages.forEach(page => {
    page.style.display = 'none'; // hide all pages initially
});

var currentSection = document.getElementById('home'); // default section
currentSection.style.display = 'block'; // show the default section
updateActiveButton(0); // update the active button to the first one


for(let i = 0; i < navBtns.length; i++) {
    navBtns[i].addEventListener('click', function() {
        showPage(i); // call showPage function with the page id
        toggleMenus(); // close the menu after clicking a button
        updateActiveButton(i); // update the active button
    });
};

function showPage(pageId) {
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none'; // hide all pages
        if(pageId == i){
            pages[i].style.display = 'block'; // show the selected page
        }
    }
}

function updateActiveButton(pageId) {
    for (let i = 0; i < navBtns.length; i++) {
        navBtns[i].classList.remove('activeBtnPage'); // remove active class from all buttons
        if (i === pageId) {
            navBtns[i].classList.add('activeBtnPage'); // add active class to the current button
        }
    }
}

// Add event listener for window resize to handle menu and overlay visibility
window.addEventListener('resize', function() {
    let mainContent = document.querySelector('main');
    let footerContent = document.querySelector('footer');
    let overlay = document.getElementById('overlay');
    if (window.matchMedia("(min-width: 800px)").matches) { // Desktop screen
        // Remove the menu and overlay if they are open
        mainContent.classList.remove('blurred');
        footerContent.classList.remove('blurred');
        overlay.classList.remove('active');
        document.body.classList.remove("no-scroll");
    }
    else { // Mobile or tablet screen
        if(isMenuOpen) {
            // If the menu is open, apply the blurred effect
            mainContent.classList.add('blurred');
            footerContent.classList.add('blurred');
            overlay.classList.add('active');
            document.body.classList.add("no-scroll");
        }
    }
});