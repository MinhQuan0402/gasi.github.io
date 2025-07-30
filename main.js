//get the "open menu" button (meant for hamIcon)
const hamBtn = document.querySelector("#hamIcon");
//connect hamBtn click to toggleMenus function
hamBtn.addEventListener("click", toggleMenus);
//get the menuItem list
const menu = document.querySelector(".mobile-layout .mobile-menu");

var isMenuOpen = false;
var isDesktop = window.matchMedia("(min-width: 800px)").matches; // check if the screen is desktop size

// Function to fit text to the width of an element
function fitTextToWidth(selector, minFont = 5, maxFont = 48) {
    if(isDesktop) {
        maxFont = 24; // Set a smaller max font size for desktop
    }
    document.querySelectorAll(selector).forEach(function(el) {
        let fontSize = maxFont;
        el.style.fontSize = fontSize + 'px';
        el.style.whiteSpace = 'nowrap';
        el.style.display = 'block';
        // Reset font size and try to fit
        while (el.scrollWidth > el.offsetWidth && fontSize > minFont) {
            fontSize -= 1;
            el.style.fontSize = fontSize + 'px';
        }
    });
}

// Fit text to width on page load and resize
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('resize', function() {
        fitTextToWidth('#exoplanets-info-list .nav-item-title');
    });
    window.resizeBy(0, 0); // Trigger a resize event to ensure the text fits correctly
});

function toggleMenus(){
    isMenuOpen = !isMenuOpen; //toggle the state
    const overlay = document.getElementById('overlay');
    if(isMenuOpen){ //if menu is showing
        menu.classList.add("menuShow"); // add class to show menu
        hamBtn.innerHTML = "&times;";
        hamBtn.classList.add("cross");
        document.body.classList.add("no-scroll"); // add no-scroll class to body
        document.querySelector('main').classList.add('blurred'); // add blurred class to main
        document.querySelector('footer').classList.add('blurred'); // add blurred class to footer
        overlay.classList.add('active'); // add active class to overlay
    }  
    else{ //if menu NOT showing
        menu.classList.remove("menuShow"); // remove class to hide menu
        hamBtn.innerHTML = "&#9776;";
        hamBtn.classList.remove("cross");
        document.body.classList.remove("no-scroll"); // remove no-scroll class from body
        document.querySelector('main').classList.remove('blurred'); // remove blurred class from main
        document.querySelector('footer').classList.remove('blurred'); // remove blurred class from footer
        overlay.classList.remove('active'); // remove active class from overlay
    }
}

const pages = document.querySelectorAll('main > section');
var mobileNavBtns = document.querySelectorAll('.mobile-menu nav ul li button');
var desktopNavBtns = document.querySelectorAll('.desktop-layout nav ul li button');

const homePage = document.getElementById('home'); // get the home page section
var homeNavBtns = homePage.querySelectorAll('.card-grid-section .card-grid > button');

pages.forEach(function(page) {
    page.style.display = 'none'; // hide all pages initially
});

var currentSection = document.getElementById('home'); // default section
currentSection.style.display = 'block'; // show the default section
updateActiveButton(0); // update the active button to the first one

const buttonClipSound = new Audio('/audio/Button-Click.mp3'); // sound for button click
const pageFlipSound = new Audio('/audio/Page-Flip.mp3'); // sound for page flip
const correctSound = new Audio('/audio/correct-choice.mp3'); // sound for correct answer

document.querySelectorAll('button').forEach(function(button) {
    button.addEventListener('click', function() {
        buttonClipSound.currentTime = 0; // reset the sound to the beginning
        buttonClipSound.play(); // play the button click sound
    });
});

mobileNavBtns.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
        setTimeout(function() {
            fitTextToWidth('#exoplanets-info-list .nav-item-title');
        }.bind(this), 100);
        document.querySelector('body').scrollTo({ top: 0 });
        showPage(index);
        toggleMenus();
        updateActiveButton(index);
    });
});

desktopNavBtns.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
        setTimeout(function() {
            fitTextToWidth('#exoplanets-info-list .nav-item-title');
        }.bind(this), 100);
        document.querySelector('body').scrollTo({ top: 0 });
        showPage(index);
        updateActiveButton(index);
        setTimeout(function() {
            this.blur();
        }.bind(this), 100);
    });
});

homeNavBtns.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
        setTimeout(function() {
            fitTextToWidth('#exoplanets-info-list .nav-item-title');
        }.bind(this), 100);
        document.querySelector('body').scrollTo({ top: 0 });
        showPage(index + 1);
        updateActiveButton(index + 1);
    });
});

function showPage(pageId) {
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none'; // hide all pages
        if(pageId == i){
            pages[i].style.display = 'block'; // show the selected page
        }
    }
}

function updateActiveButton(pageId) {
    for (let i = 0; i < mobileNavBtns.length; i++) {
        mobileNavBtns[i].classList.remove('activeBtnPage'); // remove active class from all buttons
        if (i === pageId) {
            mobileNavBtns[i].classList.add('activeBtnPage'); // add active class to the current button
        }

        desktopNavBtns[i].classList.remove('activeBtnPage'); // remove active class from all buttons
        if (i === pageId) {
            desktopNavBtns[i].classList.add('activeBtnPage'); // add active class to the current button
        }
    }
}

// Add event listener for window resize to handle menu and overlay visibility
window.addEventListener('resize', function() {
    let mainContent = document.querySelector('main');
    let footerContent = document.querySelector('footer');
    let overlay = document.getElementById('overlay');
    
    if (window.matchMedia("(min-width: 800px)").matches) { // Desktop screen
        isDesktop = true;
        // Remove the menu and overlay if they are open
        mainContent.classList.remove('blurred');
        footerContent.classList.remove('blurred');
        overlay.classList.remove('active');
        document.body.classList.remove("no-scroll");
        
    }
    else { // Mobile or tablet screen
        isDesktop = false;
        // If the menu is open, apply the blurred effect
        if(isMenuOpen) {
            // If the menu is open, apply the blurred effect
            mainContent.classList.add('blurred');
            footerContent.classList.add('blurred');
            overlay.classList.add('active');
            document.body.classList.add("no-scroll");
        }
    }
});

//#region Flip card functionality
document.querySelectorAll('.flip-card').forEach(function(card) {
    card.addEventListener('click', function () {
        pageFlipSound.currentTime = 0; // reset the sound to the beginning
        pageFlipSound.play(); // play the page flip sound
        this.classList.toggle('flipped'); // toggle the flipped class on click
    });
});
//#endregion

//#region Planet drag-and-drop game
const correctOrder = [
    "Mercury", "Venus", "Earth", "Mars",
    "Jupiter", "Saturn", "Uranus", "Neptune"
];

const draggables = document.querySelectorAll('.planet-draggable');
const dropzones = document.querySelectorAll('.planet-dropzone');
const draggablesContainer = document.querySelector('.planet-draggables');
let dragged = null;

// Drag events
draggables.forEach(function(item) {
    item.addEventListener('dragstart', function () {
        dragged = this; // set the dragged element
        setTimeout(function() {
            this.classList.add('dragging');
        }.bind(this), 0); // add dragging class after a short delay
    });

    item.addEventListener('dragend', function () {
        this.classList.remove('dragging'); // remove dragging class when drag ends
        dragged = null;
    });
});

draggablesContainer.addEventListener('dragover', function (e) {
    e.preventDefault(); // prevent default to allow drop
    if (dragged) {
        const afterElement = getDragAfterElement(this, e.clientX);
        if (afterElement) {
            this.insertBefore(dragged, afterElement);
        } else {
            this.appendChild(dragged);
        }
    }
});

dropzones.forEach(function(dropzone) {
    dropzone.addEventListener('dragover', function (e) {
        e.preventDefault(); // prevent default to allow drop
        if (this.children.length == 0 && dragged) { // if the dropzone is free and a dragged element exists
            console.log(this.children.length == 0);
            dropzone.appendChild(dragged); // if no element is found, append the dragged element at the end
        }
    }); // allow dragging over the dropzone
});

function getDragAfterElement(container, x) { // function to get the element after which the dragged element should be placed
    const draggableElements = Array.from(container.querySelectorAll('.planet-draggable:not(.dragging)')); // get all draggable elements except the one being dragged
    return draggableElements.reduce(function(closest, child) { // reduce the elements to find the closest one
        const box = child.getBoundingClientRect(); // get the bounding box of the child element
        const offset = x - box.left - box.width / 2; // calculate the offset from the left edge of the box
        if (offset < 0 && offset > closest.offset) { // if the offset is less than 0 and greater than the closest offset found so far
            return { offset: offset, element: child };
        } else { // if the offset is not valid, return the closest element found so far
            return closest;
        }
    }, { offset: -Infinity }).element; // return the closest element found
}

// Touch drag-and-drop for .planet-draggable elements
let touchDragged = null;

draggables.forEach(function(el) {
    el.addEventListener('touchstart', function(e) {
        touchDragged = this;
        this.classList.add('dragging');
        e.preventDefault();
    }, { passive: false });

    el.addEventListener('touchmove', function(e) {
        if (!touchDragged) return;
        const touch = e.touches[0]; // get the first touch point
        touchDragged.style.position = 'fixed';
        touchDragged.style.left = (touch.clientX - touchDragged.offsetWidth / 2) + 'px';
        touchDragged.style.top = (touch.clientY - touchDragged.offsetHeight / 2) + 'px';
        touchDragged.style.zIndex = 9999;
        e.preventDefault();
    }, { passive: false }); // prevent default to allow touchmove

    el.addEventListener('touchend', function(e) {
        if (!touchDragged) return;
        touchDragged.classList.remove('dragging');
        touchDragged.style.position = '';
        touchDragged.style.left = '';
        touchDragged.style.top = '';
        touchDragged.style.zIndex = '';

        // Find dropzone under touch
        const touch = e.changedTouches[0];
        let dropped = false;

        const draggablesContainerRect = draggablesContainer.getBoundingClientRect();
        console.log(touch.clientX, touch.clientY, draggablesContainerRect.left, draggablesContainerRect.right, draggablesContainerRect.top, draggablesContainerRect.bottom);
        if (
                touch.clientX > draggablesContainerRect.left &&
                    touch.clientX < draggablesContainerRect.right &&
                    touch.clientY > draggablesContainerRect.top &&
                    touch.clientY < draggablesContainerRect.bottom
            ) {
                // If the touch is outside the container, return the dragged element to its original position
                draggablesContainer.appendChild(touchDragged);
                touchDragged = null;
                return;
            } 
        else {
            dropzones.forEach(function(zone) {
                const rect = zone.getBoundingClientRect();
                if (
                    touch.clientX > rect.left &&
                    touch.clientX < rect.right &&
                    touch.clientY > rect.top &&
                    touch.clientY < rect.bottom
                ) {
                    if(zone.children.length === 0) {
                        zone.appendChild(touchDragged);
                        dropped = true;
                    }
                }
            });
        }
        touchDragged = null;
        e.preventDefault();
    }, { passive: false });
});

var checkPlanetsBtn = document.getElementById('check-planets-btn');
var resetPlanetsBtn = document.getElementById('reset-planets-btn');
var planetsTimer = document.getElementById('planets-timer');
var timerInterval;

// Check order
checkPlanetsBtn.addEventListener('click', function () {
    setTimeout(function() {
            this.blur(); // remove focus
        }.bind(this), 100);
    const placed = [];
    dropzones.forEach(function(zone) {
        const planet = Array.from(zone.querySelectorAll('.planet-draggable')).map(function(el) {
            return el.dataset.planet;
        });
        placed.push(...planet);
    });
    
    const result = document.getElementById('planet-game-result'); // get the result element
    if (placed.length !== correctOrder.length) {
        result.textContent = "Arrange all 8 planets in order!"; // if the number of placed planets is not equal to the correct order, show an error message
        result.style.color = "red"; // set the text color to red
        return;
    }

    const isCorrect = placed.every(function(planet, i) {
        return planet === correctOrder[i];
    }); // check if every placed planet matches the correct order
    if (isCorrect) {
        result.textContent = "Correct! 🌞🪐";
        result.style.color = "var(--highlight-color)"; // set the text color to highlight color
        // Stop timer
        clearInterval(timerInterval); // clear the timer interval
        resetPlanetsBtn.disabled = true; // disable the reset button
        checkPlanetsBtn.disabled = true; // disable the check button
        // Disable all draggable elements
        draggables.forEach(function(draggable) {
            draggable.setAttribute('draggable', 'false'); // disable dragging
            draggable.classList.add('disabled'); // add a disabled class for styling
        });
    } else {
        result.textContent = "Try again!";
        result.style.color = "red";
    }
});

resetPlanetsBtn.addEventListener('click', function () {
    setTimeout(function() {
            this.blur(); // remove focus
        }.bind(this), 100);


    const draggables = document.querySelectorAll('.planet-draggable');

    draggables.forEach(function(draggable) {
        draggablesContainer.appendChild(draggable);
    });
    document.getElementById('planet-game-result').textContent = '';
});

let totalTime = 90; // total time in seconds

document.getElementById('timer-minutes').textContent = String(Math.floor(totalTime / 60)).padStart(2, '0');
document.getElementById('timer-seconds').textContent = String(totalTime % 60).padStart(2, '0');

let planetsGameStartBtn = document.getElementById('planets-game-start-btn');
planetsGameStartBtn.addEventListener('click', function() {
    let planetsGameStart = document.getElementById('planets-game-start');
    let timerMinutesText = document.getElementById('timer-minutes');
    let timerSecondsText = document.getElementById('timer-seconds');
    let planetGameResult = document.getElementById('planet-game-result');

    shufflePlanets();
    planetsGameStart.style.display = 'none';
    //start the countdown timer
    let timerMinutes = Math.floor(totalTime / 60);
    let timerSeconds = totalTime % 60;
    timerInterval = setInterval(function() {
        if(timerMinutes === 0 && timerSeconds <= 10)
        {
            planetsTimer.style.color = 'red';
        }
        timerSeconds--;
        if (timerSeconds < 0) {
            timerMinutes--;
            timerSeconds = 59;
        }
        if (timerMinutes === 0 && timerSeconds === 0) {
            clearInterval(timerInterval);
            timerSeconds = 0;
            timerMinutes = 0;
            planetGameResult.textContent = "Time's up! Try again!";
            planetGameResult.style.color = "red";
            checkPlanetsBtn.disabled = true; // disable the check button
            resetPlanetsBtn.disabled = true; // disable the reset button
            //disable the draggable elements
            draggables.forEach(function(draggable) {
                draggable.setAttribute('draggable', 'false'); // disable dragging
                draggable.classList.add('disabled'); // add a disabled class for styling
            });
            
            //create a reset button
            const resetButton = document.createElement('button');
            resetButton.textContent = "Restart Game";
            resetButton.className = "button-link";

            // Add the reset button to the game section
            document.querySelector('#planet-game .planet-game-controls').appendChild(resetButton);

            // Add click event to reset button
            resetButton.addEventListener('click', function() {
                clearInterval(timerInterval);
                planetGameResult.textContent = '';
                planetsGameStart.style.display = 'flex';
                planetsTimer.style.color = 'white';
                resetButton.remove(); // remove the reset button
                
                // re-enable the draggable elements
                draggables.forEach(function(draggable) {
                    draggable.setAttribute('draggable', 'true'); // enable dragging
                    draggable.classList.remove('disabled'); // remove the disabled class
                });
                checkPlanetsBtn.disabled = false; // enable the check button
                resetPlanetsBtn.disabled = false; // enable the reset button
                resetPlanetsBtn.click(); // reset the game
                
                timerMinutesText.textContent = String(Math.floor(totalTime / 60)).padStart(2, '0');
                timerSecondsText.textContent = String(totalTime % 60).padStart(2, '0');
            });
        }
        timerMinutesText.textContent = String(timerMinutes).padStart(2, '0');
        timerSecondsText.textContent = String(timerSeconds).padStart(2, '0');
    }, 1000);
});

function shufflePlanets() {
    const container = document.querySelector('.planet-draggables');
    const planets = Array.from(container.children); 
    for (let i = planets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [planets[i], planets[j]] = [planets[j], planets[i]]; // Swap planets[i] with the element at random index j
    }
    // Remove all and re-append in shuffled order
    planets.forEach(function(planet) {
        container.appendChild(planet);
    });
}
//#endregion

//#region Carousel
document.addEventListener('DOMContentLoaded', function () {
    //#region Carousel In Fun Facts
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let current = 0;

    function showItem(index) {
        items.forEach(function(item, i) {
            item.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', function() {
        setTimeout(function() {
            prevBtn.blur(); // remove focus
        }, 100);
        current = (current - 1 + items.length) % items.length;
        showItem(current);
    });

    nextBtn.addEventListener('click', function() {
        setTimeout(function() {
            nextBtn.blur(); // remove focus
        }, 100);
        current = (current + 1) % items.length;
        showItem(current);
    });

    // Optional: swipe support for mobile
    let startX = 0;
    document.querySelector('.carousel-slide').addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    document.querySelector('.carousel-slide').addEventListener('touchend', function(e) {
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) prevBtn.click();
        if (startX - endX > 50) nextBtn.click();
    });
    //#endregion

    //#region Carousel In Universe Nav
    const universeItems = document.querySelectorAll('#universe-nav > ul > li');
    const universeNextBtn = document.getElementById('uni-nav-next');

    let universeCurrent = 0;
    function showUniverseItem(index) {
        universeItems.forEach(function(item, i) {
            item.classList.toggle('active', i === index);
        });
    }

    universeNextBtn.addEventListener('click', function() {
        setTimeout(function() {
            universeNextBtn.blur(); // remove focus
        }, 100);
        universeCurrent = (universeCurrent + 1) % universeItems.length;
        showUniverseItem(universeCurrent);
    });
    //#endregion

    //#region Exoplanets Info List
    const exoplanetsInfoList = document.querySelectorAll('#exoplanets-info-list > ul > li');
    const exoplanetNextBtn = document.getElementById('exo-nav-next');
    const exoplanetPrevBtn = document.getElementById('exo-nav-prev');
    let exoplanetCurrent = 0;
    function showExoplanetItem(index) {
        exoplanetsInfoList.forEach(function(item, i) {
            item.classList.toggle('active', i === index);
        });
    }
    exoplanetNextBtn.addEventListener('click', function() {
        setTimeout(function() {
            exoplanetNextBtn.blur(); // remove focus
            fitTextToWidth('#exoplanets-info-list .nav-item-title');
        }, 100);
        setTimeout(function() {
            fitTextToWidth('#exoplanets-info-list .nav-item-title');
        }, 10);
        exoplanetCurrent = (exoplanetCurrent + 1) % exoplanetsInfoList.length;
        showExoplanetItem(exoplanetCurrent);
    });
    exoplanetPrevBtn.addEventListener('click', function() {
        setTimeout(function() {
            exoplanetPrevBtn.blur(); // remove focus
            fitTextToWidth('#exoplanets-info-list .nav-item-title');
        }, 100);
        exoplanetCurrent = (exoplanetCurrent - 1 + exoplanetsInfoList.length) % exoplanetsInfoList.length;
        showExoplanetItem(exoplanetCurrent);
    });
    //#endregion
    
});

//#endregion

//#region Guessing Game
class GuessingGame {
    constructor(gameId, correctAnswer, maxAttempts, explaination = "") {
        this.gameId = gameId;
        this.correctAnswer = correctAnswer;
        this.maxAttempts = maxAttempts;
        this.attemptsLeft = maxAttempts;
        this.explaination = explaination;
        // Break the text into multiple lines if it's too long
        this.explaination = this.explaination.replace(/(.{50})/g, '$1<br>'); // Add a line break every 50 characters
        this.init();
    }
    
    init() {
        const guessBtn = document.getElementById(`${this.gameId}-guess-btn`);
        const resultDisplay = document.getElementById(`${this.gameId}-guess-result`);
        const guessInput = document.getElementById(`${this.gameId}-guess-input`);

        guessBtn.addEventListener('click', function() {
            setTimeout(function() {
                guessBtn.blur(); // remove focus
            }, 100);
            this.makeGuess(guessInput, resultDisplay);
        }.bind(this));

        guessInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') { // Check if the Enter key is pressed
                guessBtn.click(); // Trigger the button click
            }
        });
    }

    makeGuess(guessInput, resultDisplay) {
        const parsedGuess = parseFloat(guessInput.value);
        if (isNaN(parsedGuess)) {
            resultDisplay.textContent = "Please enter a valid number!";
            resultDisplay.style.color = "red";
            return;
        }

        this.attemptsLeft--;
        if (parsedGuess == this.correctAnswer) {
            correctSound.play(); // play the correct answer sound
            resultDisplay.textContent = `Amazing! The answer is ${this.correctAnswer}.`;
            resultDisplay.style.color = "lightgreen"; // Green color for correct answer
            guessInput.disabled = true; // Disable input after correct guess
            // Display the explaination if provided
            if (this.explaination) {
                resultDisplay.innerHTML += `<br><br>${this.explaination}`;
            }

        } else if (this.attemptsLeft == 0) {
            resultDisplay.textContent = `Game over! The correct answer was ${this.correctAnswer}.`;
            resultDisplay.style.color = "yellow";
            guessInput.value = ''; // Clear the input field
            guessInput.disabled = true; // Disable input after game over
            // Display the explaination if provided
            if (this.explaination) {
                resultDisplay.innerHTML += `<br><br>${this.explaination}`;
            }
        } else {
            if(parsedGuess < this.correctAnswer) {
                resultDisplay.textContent = `Your guess of ${parsedGuess} is too low!`;
            } else {
                resultDisplay.textContent = `Your guess of ${parsedGuess} is too high!`;
            }
            let closeGuessPercentage = Math.abs((parsedGuess - this.correctAnswer) / this.correctAnswer) * 100;
            if (closeGuessPercentage < 10) {
                resultDisplay.textContent += ` Very close! Your guess is within 10% of the correct answer. You have ${this.attemptsLeft} attempts left.`;
                resultDisplay.style.color = "orange"; // Orange color for close guess
            } else if (closeGuessPercentage < 25) {
                resultDisplay.textContent += ` Close! Your guess is within 25% of the correct answer. You have ${this.attemptsLeft} attempts left.`;
                resultDisplay.style.color = "lightcoral"; // Light coral color for close guess
            } else {
                resultDisplay.textContent += ` Your guess is not close. You have ${this.attemptsLeft} attempts left.`;
                resultDisplay.style.color = "red"; // Red color for incorrect guess
            }
            guessInput.value = ''; // Clear the input field
        }
    }
}

const maxNumTry = 5; // Maximum number of attempts for each game
let sunGame = new GuessingGame('sun', 1300000, maxNumTry, "You could fit about 1.3 million Earths inside the Sun.");
console.log(sunGame);

let mercuryGame = new GuessingGame('mercury', 800, maxNumTry,
    "Mercury's surface temperatures are both extremely hot and cold. " +
    "Because the planet is so close to the Sun, day temperatures can reach highs of 800°F (430°C). " +
    "Without an atmosphere to retain that heat at night, temperatures can dip as low as -290°F (-180°C)."
);
console.log(mercuryGame);

let venusGame = new GuessingGame('venus', 0, maxNumTry, "Venus has no rings.");
console.log(venusGame);

let earthGame = new GuessingGame('earth', 1670, maxNumTry, 
    "Earth rotates at about 1,670 km/h (1,037 mph) at the equator — " +
    "but you don’t feel it because the atmosphere moves with it."
);
console.log(earthGame);

let earthDustGame = new GuessingGame('earth-dust', 100, maxNumTry, 
    "Because space is not completely empty — it’s filled with tiny particles called cosmic dust, " +
    "also known as micrometeoroids or interplanetary dust. Earth moves through " +
    "this dusty environment as it orbits the Sun. " +
    "Hence, Earth is constantly hit by space dust."
);
console.log(earthDustGame);

let moonGame = new GuessingGame('moon', 1969, maxNumTry, 
    "The first humans landed on the Moon in 1969. " +
    "Neil Armstrong and Buzz Aldrin were the first and second humans to walk on the lunar surface."
);
console.log(moonGame);

let jupiterGame = new GuessingGame('jupiter', 43, maxNumTry, 
    "From an average distance of 484 million miles (778 million kilometers), " +
    "Jupiter is 5.2 astronomical units away from the Sun. One astronomical unit (abbreviated as AU), " +
    "is the distance from the Sun to Earth. From this distance, it takes sunlight 43 minutes to travel " +
    "from the Sun to Jupiter."
);
console.log(jupiterGame);

let jupiterOrbitGame = new GuessingGame('jupiter-orbit', 12, maxNumTry, 
    "Jupiter has the shortest day in the solar system. One day on Jupiter takes 9.9 hours " +
    "(the time it takes for Jupiter to rotate or spin around once), and " +
    "Jupiter makes a complete orbit around the Sun (a year in Jovian time) " +
    "in about 12 Earth years (4,333 Earth days)."
); 
console.log(jupiterOrbitGame);

//#endregion

//#region Disable summary cards on desktop
document.addEventListener('DOMContentLoaded', function() {
    function disableSummaryCards() {
        const isDesktop = window.matchMedia("(min-width: 800px)").matches;
        document.querySelectorAll('.summary-card').forEach(function(card) {
            const summary = card.querySelector('summary');
            if (isDesktop) {
                // Open all cards and disable interaction
                card.setAttribute('open', '');
                if (summary) {
                    summary.style.pointerEvents = 'none';
                    summary.style.cursor = 'default';
                }
            } else {
                // Enable interaction on mobile/tablet
                if (summary) {
                    summary.style.pointerEvents = '';
                    summary.style.cursor = '';
                }
                card.removeAttribute('open'); // Close all cards
            }
        });
    }
    disableSummaryCards();
    window.addEventListener('resize', disableSummaryCards);
});
//#endregion

//#region Interactive Starfield Map functionality
let mapPanX = 0;
let mapPanY = 0;

let maxZoom = 3.0; // Maximum zoom level
let minZoom = 1.0; // Minimum zoom level

document.addEventListener('DOMContentLoaded', function() {
    // Check if the galaxy map exists on the page
    const galaxyMap = document.getElementById('galaxy-map');
    if (!galaxyMap) return;

    const filterButtons = document.querySelectorAll('.filter-btn');
    const galaxyPoints = document.querySelectorAll('.galaxy-point');
    const modal = document.getElementById('galaxy-modal');
    const modalClose = document.querySelector('.close-modal');
    const zoomSlider = document.getElementById('galaxy-zoom-slider');

    //Set initial zoom level
    zoomSlider.value = minZoom * 100; // 100% zoom
    //Set maximum and minimum zoom levels
    zoomSlider.max = maxZoom * 100;
    zoomSlider.min = minZoom * 100;

    // Current zoom level
    let zoomLevel = 1.0;

    function calculatePanLimits() {
        // Get the starfield container and its parent
        const galaxyMap = document.getElementById('galaxy-map');
        const container = galaxyMap.parentElement;
        
        // Calculate the visible dimensions
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Calculate how much the map extends beyond visible area when zoomed
        const mapOverflowX = (galaxyMap.clientWidth * zoomLevel - containerWidth) / 2;
        const mapOverflowY = (galaxyMap.clientHeight * zoomLevel - containerHeight) / 2;
        
        // Return the maximum allowed pan distances
        return {
            maxX: Math.max(0, mapOverflowX / zoomLevel),
            maxY: Math.max(0, mapOverflowY / zoomLevel)
        };
    }

    // Galaxy data for the modal
    const galaxyData = {
        "Milky Way": {
            type: "spiral",
            image: "/images/Sun_in_Milky_Way-1.jpeg",
            description: "The Milky Way is our home galaxy, a barred spiral galaxy with a diameter between 150,000 and 200,000 light-years. It contains between 100-400 billion stars, including our Sun, which is located on one of the spiral arms about 27,000 light-years from the galactic center.",
            distance: "We're inside it",
            size: "~100,000 light-years diameter",
            age: "~13.6 billion years",
            stars: "100-400 billion"
        },
        "Andromeda (M31)": {
            type: "spiral",
            image: "/images/andromeda-galaxy.jpg",
            description: "Andromeda is the nearest major galaxy to the Milky Way and is on a collision course with our galaxy. The collision is predicted to occur in about 4.5 billion years. Andromeda is a spiral galaxy that appears as a faint, fuzzy patch in the night sky.",
            distance: "2.537 million light-years",
            size: "~220,000 light-years diameter",
            age: "~10 billion years",
            stars: "~1 trillion"
        },
        "Whirlpool (M51)": {
            type: "spiral",
            image: "/images/whirlpool-galaxy.jpg",
            description: "The Whirlpool Galaxy (also known as Messier 51) is a classic spiral galaxy located in the constellation Canes Venatici. It's famous for its well-defined spiral arms and is interacting with a smaller galaxy, creating a beautiful cosmic spectacle.",
            distance: "23 million light-years",
            size: "~60,000 light-years diameter",
            age: "~400 million years (current structure)",
            stars: "~100 billion"
        },
        "M87": {
            type: "elliptical",
            image: "/images/m87-galaxy.jpg",
            description: "M87 is one of the most massive galaxies in the local universe and is notable for its supermassive black hole, which was the first to be directly imaged by the Event Horizon Telescope. This elliptical galaxy contains trillions of stars and a jet of energetic plasma that extends at least 5,000 light-years.",
            distance: "53 million light-years",
            size: "~240,000 light-years diameter",
            age: "~12 billion years",
            stars: "~1 trillion"
        },
        "M60": {
            type: "elliptical",
            image: "/images/m60-galaxy.jpg",
            description: "M60 is a giant elliptical galaxy in the Virgo Cluster. It's one of the largest galaxies in the cluster and is known to have a supermassive black hole at its center with a mass of about 4.5 billion solar masses.",
            distance: "55 million light-years",
            size: "~120,000 light-years diameter",
            age: "~13 billion years",
            stars: "~400 billion"
        },
        "Large Magellanic Cloud": {
            type: "irregular",
            image: "/images/large-magellanic-cloud.jpg",
            description: "The Large Magellanic Cloud (LMC) is a satellite galaxy of the Milky Way and is one of the closest galaxies to Earth. It's an irregular galaxy that shows some structure, including a bar and a spiral arm, suggesting it may have once been a barred spiral galaxy before being disrupted by the Milky Way's gravity.",
            distance: "158,200 light-years",
            size: "~14,000 light-years diameter",
            age: "~1.1 billion years",
            stars: "~30 billion"
        },
        "Small Magellanic Cloud": {
            type: "irregular",
            image: "/images/small-magellanic-cloud.jpg",
            description: "The Small Magellanic Cloud (SMC) is another satellite galaxy of the Milky Way. It's an irregular dwarf galaxy that, along with the LMC, forms the Magellanic Clouds visible in the Southern Hemisphere. It contains a rich population of variable stars.",
            distance: "199,000 light-years",
            size: "~7,000 light-years diameter",
            age: "~6.5 billion years",
            stars: "~3 billion"
        },
        "Sombrero Galaxy (M104)": {
            type: "lenticular",
            image: "/images/sombrero-galaxy.jpg",
            description: "The Sombrero Galaxy is a lenticular galaxy with a bright nucleus, an unusually large central bulge, and a prominent dust lane in its inclined disk. Its appearance is similar to a sombrero hat, hence its name. It has a large population of globular clusters, estimated at about 2,000.",
            distance: "29 million light-years",
            size: "~50,000 light-years diameter",
            age: "~13 billion years",
            stars: "~100 billion"
        }
    };

    // Define locations for galaxy points
    const galaxyLocations = [
        [25, 40],
        [70, 15],
        [30, 75],
        [60, 60],
        [55, 45],
        [15, 55],
        [23, 25],
        [80, 80]
    ];
    
    // Set initial positions for galaxy points
    for(let i = 0; i < galaxyPoints.length; i++) {
        const point = galaxyPoints[i];
        const [x, y] = galaxyLocations[i] || [0, 0]; // Default to [0, 0] if no location is defined
        point.style.left = `${x}%`;
        point.style.top = `${y}%`;
    }
    
    // Filter galaxies by type
    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(function(b) {
                b.classList.remove('active');
            });
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show or hide galaxy points based on filter
            galaxyPoints.forEach(function(point) {
                if (filter === 'all' || point.getAttribute('data-type') === filter) {
                    point.style.display = 'block';
                } else {
                    point.style.display = 'none';
                }
            });
        });
    });
    
    // Open modal with galaxy information when clicking on a galaxy point
    galaxyPoints.forEach(function(point) {
        point.addEventListener('click', function() {
            const galaxyName = this.querySelector('.galaxy-name').textContent;
            const data = galaxyData[galaxyName];
            
            if (data) {
                document.getElementById('modal-galaxy-name').textContent = galaxyName;
                document.getElementById('modal-galaxy-type').textContent = data.type;
                document.getElementById('modal-galaxy-type').setAttribute('data-type', data.type);
                document.getElementById('modal-galaxy-image').src = data.image;
                document.getElementById('modal-galaxy-image').alt = galaxyName;
                document.getElementById('modal-galaxy-description').textContent = data.description;
                document.getElementById('modal-galaxy-distance').textContent = data.distance;
                document.getElementById('modal-galaxy-size').textContent = data.size;
                document.getElementById('modal-galaxy-age').textContent = data.age;
                document.getElementById('modal-galaxy-stars').textContent = data.stars;
                
                modal.style.display = 'block';
            }
        });

        point.addEventListener('touchstart', function() {
            const galaxyName = this.querySelector('.galaxy-name').textContent;
            const data = galaxyData[galaxyName];
            
            if (data) {
                document.getElementById('modal-galaxy-name').textContent = galaxyName;
                document.getElementById('modal-galaxy-type').textContent = data.type;
                document.getElementById('modal-galaxy-type').setAttribute('data-type', data.type);
                document.getElementById('modal-galaxy-image').src = data.image;
                document.getElementById('modal-galaxy-image').alt = galaxyName;
                document.getElementById('modal-galaxy-description').textContent = data.description;
                document.getElementById('modal-galaxy-distance').textContent = data.distance;
                document.getElementById('modal-galaxy-size').textContent = data.size;
                document.getElementById('modal-galaxy-age').textContent = data.age;
                document.getElementById('modal-galaxy-stars').textContent = data.stars;
                
                modal.style.display = 'block';
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    zoomSlider.addEventListener('input', function() {
        zoomLevel = parseFloat(this.value / 100.0);
        // Apply zoom and pan
        const limits = calculatePanLimits();
        // Update pan limits based on zoom level
        mapPanX = Math.max(-limits.maxX, Math.min(limits.maxX, mapPanX));
        mapPanY = Math.max(-limits.maxY, Math.min(limits.maxY, mapPanY));



        // Apply both zoom AND pan with a single transform
        galaxyMap.style.transform = `scale(${zoomLevel}) translate(${mapPanX}px, ${mapPanY}px)`;
        // Change cursor based on zoom level
        galaxyMap.style.cursor = zoomLevel > 1 ? 'grab' : 'default'; // Change cursor to grab when zoomed in
    });
    
    // Add drag functionality for panning
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    galaxyMap.addEventListener('mousedown', function(e) {
        if( zoomLevel === 1) return; // Disable dragging when zoomed out to 100%
        isDragging = true;
        galaxyMap.style.cursor = 'grabbing';
        startX = e.pageX - galaxyMap.offsetLeft;
        startY = e.pageY - galaxyMap.offsetTop;
        scrollLeft = galaxyMap.scrollLeft;
        scrollTop = galaxyMap.scrollTop;
    });
    
    galaxyMap.addEventListener('mouseleave', function() {
        isDragging = false;
        galaxyMap.style.cursor = 'grab';
    });
    
    galaxyMap.addEventListener('mouseup', function() {
        if( zoomLevel === 1) return; // Disable dragging when zoomed out to 100%
        isDragging = false;
        galaxyMap.style.cursor = 'grab';
    });

    galaxyMap.addEventListener('mousemove', function(e) {
        if (!isDragging || zoomLevel === 1) return;
        e.preventDefault();
        
        const x = e.pageX - galaxyMap.offsetLeft;
        const y = e.pageY - galaxyMap.offsetTop;

        // Calculate the drag distance
        const dx = (x - startX) * (1/zoomLevel); // Adjust for zoom level
        const dy = (y - startY) * (1/zoomLevel);
        
        // Update start position for next move event
        startX = x;
        startY = y;

        // Calculate new pan position
        let newMapPanX = mapPanX + dx;
        let newMapPanY = mapPanY + dy;

        // Get dynamic pan limits
        const limits = calculatePanLimits();
        
        // Restrict panning to boundaries
        newMapPanX = Math.max(-limits.maxX, Math.min(limits.maxX, newMapPanX));
        newMapPanY = Math.max(-limits.maxY, Math.min(limits.maxY, newMapPanY));

        // Update pan position
        mapPanX = newMapPanX;
        mapPanY = newMapPanY;

        // Apply both zoom AND pan with a single transform
        galaxyMap.style.transform = `scale(${zoomLevel}) translate(${mapPanX}px, ${mapPanY}px)`;
    });

    // Add touch support for mobile devices
    galaxyMap.addEventListener('touchstart', function(e) {
        if (zoomLevel === 1) return; // Disable dragging when zoomed out to 100%
        isDragging = true;
        galaxyMap.style.cursor = 'grabbing';
        
        const touch = e.touches[0];
        startX = touch.pageX - galaxyMap.offsetLeft;
        startY = touch.pageY - galaxyMap.offsetTop;
        
        // Prevent default to avoid page scrolling while panning the map
        e.preventDefault();
    });

    galaxyMap.addEventListener('touchmove', function(e) {
        if (!isDragging || zoomLevel === 1) return;
        
        const touch = e.touches[0];
        const x = touch.pageX - galaxyMap.offsetLeft;
        const y = touch.pageY - galaxyMap.offsetTop;

        // Calculate the drag distance (adjusted for zoom)
        const dx = (x - startX) * (1 / zoomLevel);
        const dy = (y - startY) * (1 / zoomLevel);
        
        // Update start position for next move event
        startX = x;
        startY = y;

        // Calculate new pan position
        let newMapPanX = mapPanX + dx;
        let newmapPanY = mapPanY + dy;

        // Get dynamic pan limits
        const limits = calculatePanLimits();
        
        // Restrict panning to boundaries
        newMapPanX = Math.max(-limits.maxX, Math.min(limits.maxX, newMapPanX));
        newmapPanY = Math.max(-limits.maxY, Math.min(limits.maxY, newmapPanY));

        // Update pan position
        mapPanX = newMapPanX;
        mapPanY = newmapPanY;

        // Apply both zoom AND pan with a single transform
        galaxyMap.style.transform = `scale(${zoomLevel}) translate(${mapPanX}px, ${mapPanY}px)`;
        
        // Prevent default to avoid page scrolling while panning the map
        e.preventDefault();
    }, { passive: false }); // Important for preventing default on some browsers

    galaxyMap.addEventListener('touchend', function() {
        isDragging = false;
    });

    galaxyMap.addEventListener('touchcancel', function() {
        isDragging = false;
    });
});
//#endregion

//#region Quiz functionality for the Universe Quiz section
document.addEventListener('DOMContentLoaded', function() {
    // Check if quiz section exists
    const quizSection = document.getElementById('universe-quiz');
    if (!quizSection) return;
    
    // Quiz elements
    const startScreen = document.querySelector('.quiz-start-screen');
    const questionsContainer = document.querySelector('.quiz-questions-container');
    const resultsScreen = document.querySelector('.quiz-results');
    const startButton = document.getElementById('start-quiz-btn');
    const nextButton = document.getElementById('next-question-btn');
    const retryButton = document.getElementById('retry-quiz-btn');
    const reviewButton = document.getElementById('review-answers-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.querySelector('.quiz-options');
    const progressBar = document.querySelector('.quiz-progress-bar');
    const currentScoreDisplay = document.getElementById('current-score');
    const questionsCountDisplay = document.getElementById('questions-count');
    const finalScoreDisplay = document.getElementById('final-score');
    const totalQuestionsDisplay = document.getElementById('total-questions');
    const scoreMessage = document.getElementById('score-message');

    // Quiz state
    let quizQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    let isReviewing = false;

    // Fetch quiz questions from JSON file
    function fetchQuizQuestions() {
        quizQuestions = getSampleQuestions();
        return quizQuestions;
    }

    // Provide sample questions as fallback
    function getSampleQuestions() {
        return [
            {
                question: "What is a stellar-mass black hole formed from?",
                options: [
                    "The collapse of a massive star after a supernova",
                    "The collision of two neutron stars",
                    "The accretion of gas in the early universe",
                    "The merger of multiple smaller black holes"
                ],
                correctAnswer: 0
            },
            {
                question: "Which galaxy is our closest large galactic neighbor?",
                options: [
                    "Triangulum Galaxy",
                    "Andromeda Galaxy",
                    "Large Magellanic Cloud",
                    "Sombrero Galaxy"
                ],
                correctAnswer: 1
            },
            {
                question: "What is the approximate age of our universe?",
                options: [
                    "4.5 billion years",
                    "10 billion years",
                    "13.8 billion years",
                    "20 billion years"
                ],
                correctAnswer: 2
            },
            {
                question: "What type of galaxy is characterized by a flat, rotating disk with spiral arms?",
                options: [
                    "Elliptical galaxy",
                    "Lenticular galaxy",
                    "Irregular galaxy",
                    "Spiral galaxy"
                ],
                correctAnswer: 3
            },
            {
                question: "What is found at the center of most large galaxies?",
                options: [
                    "A supermassive black hole",
                    "A neutron star cluster",
                    "A quasar",
                    "A massive star nursery"
                ],
                correctAnswer: 0
            },
            {
                question: "Which of these is NOT a type of black hole classified by astronomers?",
                options: [
                    "Stellar-mass black hole",
                    "Intermediate-mass black hole",
                    "Supermassive black hole",
                    "Subatomic black hole"
                ],
                correctAnswer: 3
            },
            {
                question: "How long does it take our solar system to orbit the Milky Way once?",
                options: [
                    "About 1 million years",
                    "About 10 million years",
                    "About 100 million years",
                    "About 240 million years"
                ],
                correctAnswer: 3
            },
            {
                question: "What is the main process that powers stars?",
                options: [
                    "Fission",
                    "Fusion",
                    "Combustion",
                    "Radioactive decay"
                ],
                correctAnswer: 1
            },
            {
                question: "What are molecular clouds in space primarily composed of?",
                options: [
                    "Helium and neon",
                    "Hydrogen and helium",
                    "Oxygen and nitrogen",
                    "Carbon dioxide and methane"
                ],
                correctAnswer: 1
            },
            {
                question: "What is the boundary of a black hole called?",
                options: [
                    "Event horizon",
                    "Cosmic edge",
                    "Schwarzschild barrier",
                    "Hawking limit"
                ],
                correctAnswer: 0
            },
            {
                question: "What is dark energy?",
                options: [
                    "A hypothetical form of energy that permeates space and accelerates the universe's expansion",
                    "The energy released when stars die",
                    "The energy contained within black holes",
                    "The force that pulls galaxies toward each other"
                ],
                correctAnswer: 0
            },
            {
                question: "What is the Cosmic Microwave Background?",
                options: [
                    "Radiation from nearby galaxies",
                    "Energy released by supernovas",
                    "The afterglow of the Big Bang",
                    "Radio waves from distant pulsars"
                ],
                correctAnswer: 2
            },
            {
                question: "What do astronomers mean by 'metal' when describing stars?",
                options: [
                    "Any element heavier than helium",
                    "The metallic surface of stars",
                    "The core of a star",
                    "The outer layers of a star"
                ],
                correctAnswer: 0
            },
            {            
                question: "What is the primary method used to detect exoplanets?",
                options: [
                    "Direct imaging",
                    "Gravitational lensing",
                    "Transit method",
                    "Spectroscopy"
                ],
                correctAnswer: 2
            },
            {            
                question: "What is the largest known structure in the universe?",
                options: [ 
                    "The Milky Way",
                    "The Virgo Supercluster",
                    "The Great Wall of Galaxies",
                    "The Hercules-Corona Borealis Great Wall"
                ],
                correctAnswer: 3
            },
            {            
                question: "What is the primary component of the universe's mass-energy content?",
                options: [
                    "Dark matter",
                    "Dark energy",
                    "Ordinary matter",
                    "Neutrinos"
                ],
                correctAnswer: 0
            },
            {   
                question: "What is the observable universe?",
                options: [
                    "The entire universe including all galaxies",
                    "The part of the universe we can see from Earth",
                    "The universe beyond the Milky Way",
                    "The universe that existed before the Big Bang"
                ],
                correctAnswer: 1
            },
            {
                question: "What is the primary reason for the expansion of the universe?",
                options: [
                    "The Big Bang",
                    "Dark energy",
                    "Gravitational forces",
                    "Cosmic inflation"
                ],
                correctAnswer: 1
            }
        ];
    }

    // Shuffle questions and return a random subset
    function getRandomSubset(questions, count) {
        // Shuffle array using Fisher-Yates algorithm
        const shuffled = [...questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        // Return first 'count' items
        return shuffled.slice(0, count);
    }

    // Start the quiz
    startButton.addEventListener('click', function() {
        startScreen.style.display = 'none';
        questionsContainer.style.display = 'block';
        
        // Fetch questions and start quiz
        fetchQuizQuestions().then(function(questions) {
        // Get 10 random questions (change number as needed)
        quizQuestions = getRandomSubset(questions, 10);
        
        // Update UI with question count
        questionsCountDisplay.textContent = quizQuestions.length;
        totalQuestionsDisplay.textContent = quizQuestions.length;
        
        // Load first question
        loadQuestion(currentQuestionIndex);
        });
    });

    // Load a question
    function loadQuestion(index) {
        // Reset state
        nextButton.disabled = true;
        
        // Update progress bar
        const progress = ((index + 1) / quizQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Set question text
        const question = quizQuestions[index];
        questionText.textContent = question.question;

        // Clear previous options
        optionsContainer.innerHTML = '';

        // Add new options
        question.options.forEach(function(option, i) {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.dataset.index = i;

            // If reviewing, show correct/incorrect answers
            if (isReviewing) {
                if (i === question.correctAnswer) {
                    optionElement.classList.add('correct');
                } else if (i === userAnswers[index] && i !== question.correctAnswer) {
                    optionElement.classList.add('incorrect');
                }
                optionElement.style.cursor = 'default';
            } else {
                // Add click event for selecting an answer
                optionElement.addEventListener('click', selectOption);
            }

            optionsContainer.appendChild(optionElement);
        });

        // If reviewing, always enable the next button
        if (isReviewing) {
            nextButton.disabled = false;
            nextButton.textContent = index < quizQuestions.length - 1 ? "Next Question" : "Finish Review";
        } else {
            nextButton.textContent = "Next Question";
        }
    }

    // Handle option selection
    function selectOption() {
        // Remove selected class from all options
        document.querySelectorAll('.quiz-option').forEach(function(option) {
            option.classList.remove('selected');
        });

        // Add selected class to clicked option
        this.classList.add('selected');

        // Enable next button
        nextButton.disabled = false;
    }

    // Handle next button click
    nextButton.addEventListener('click', function() {
        // Get selected option
        const selectedOption = document.querySelector('.quiz-option.selected');
        
        // If not reviewing, record answer and update score
        if (!isReviewing) {
            if (selectedOption) {
                const selectedIndex = parseInt(selectedOption.dataset.index);
                userAnswers[currentQuestionIndex] = selectedIndex;
                
                if (selectedIndex === quizQuestions[currentQuestionIndex].correctAnswer) {
                    score++;
                    currentScoreDisplay.textContent = score;
                }
            }
        }

        // Move to next question or show results
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) { // Load next question
            loadQuestion(currentQuestionIndex);
        } else { // If reviewing, show next question or end review
            // End of quiz or review
            if (isReviewing) {
                // End review, go back to results
                isReviewing = false;
                questionsContainer.style.display = 'none';
                resultsScreen.style.display = 'block';
            } else {
                // Show results
                showResults();
            }
        }
    });

    // Show quiz results
    function showResults() {
        questionsContainer.style.display = 'none';
        resultsScreen.style.display = 'block';
        
        finalScoreDisplay.textContent = score;
        
        // Set score message based on score
        const scorePercentage = (score / quizQuestions.length) * 100;
        
        if (scorePercentage >= 90) {
            scoreMessage.textContent = "Cosmic genius! You're ready for a NASA job interview!";
        } else if (scorePercentage >= 70) {
            scoreMessage.textContent = "Great job! You're a space enthusiast with solid knowledge.";
        } else if (scorePercentage >= 50) {
            scoreMessage.textContent = "Not bad! You know the basics about our universe.";
        } else {
            scoreMessage.textContent = "Keep exploring! There's a vast universe of knowledge to discover.";
        }
    }

    // Retry the quiz
    retryButton.addEventListener('click', function() {
        // Reset quiz state
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        isReviewing = false;
        currentScoreDisplay.textContent = '0';
        
        // Show questions screen
        resultsScreen.style.display = 'none';
        questionsContainer.style.display = 'block';
        
        // Load first question
        loadQuestion(currentQuestionIndex);
    });

    // Review answers
    reviewButton.addEventListener('click', function() {
        // Set review mode
        isReviewing = true;
        currentQuestionIndex = 0;
        
        // Show questions screen
        resultsScreen.style.display = 'none';
        questionsContainer.style.display = 'block';
        
        // Load first question
        loadQuestion(currentQuestionIndex);
    });
});
//#endregion

//#region Timeline functionality for the Space Telescopes section
document.addEventListener('DOMContentLoaded', function() {
    // Timeline setup
    setupTimeline();
    
    // Node positioning
    positionNodesOnTimeline();
    
    // Event listeners
    setupEventListeners();
    
    // Optional: Initial animation
    animateTimelineEntry();
});

function setupTimeline() {
    // Calculate positions for year markers
    const timelineTrack = document.querySelector('.timeline-track');
    const timelineWidth = timelineTrack.offsetWidth;
    const startYear = 2030;
    const endYear = 1970;
    const yearRange = endYear - startYear;

    document.querySelectorAll('.time-marker').forEach(function(marker) {
        const year = parseInt(marker.dataset.year);
        const position = ((year - startYear) / yearRange) * (timelineWidth - 100) + 100;
        marker.style.left = `${position}%`;
    });
}

function positionNodesOnTimeline() {
    // Position telescope nodes according to their years
    const timelineTrack = document.querySelector('.timeline-track');
    const timelineWidth = timelineTrack.offsetWidth;
    const startYear = 2030;
    const endYear = 1970;
    const yearRange = endYear - startYear;

    document.querySelectorAll('.telescope-node').forEach(function(node) {
        const year = parseInt(node.dataset.year);
        const position = ((year - startYear) / yearRange) * (timelineWidth - 100) + 100;
        node.style.left = `${position}%`;
    });
}

function setupEventListeners() {
    // Era filter buttons
    document.querySelectorAll('.era-selector').forEach(function(button) {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.era-selector').forEach(function(b) {
                b.classList.remove('active');
            });
            // Add active class to clicked button
            this.classList.add('active');
            
            const era = this.dataset.era;
            filterTelescopesByEra(era);
        });
    });
    
    // Telescope node clicks
    document.querySelectorAll('.telescope-node').forEach(function(node) {
        node.addEventListener('click', function() {
            // Remove active class from all nodes
            document.querySelectorAll('.telescope-node').forEach(function(n) {
                n.classList.remove('active');
            });
            // Add active class to clicked node
            this.classList.add('active');
            
            const telescope = this.dataset.telescope;
            displayTelescopeDetails(telescope);
        });
    });
}

function filterTelescopesByEra(era) {
    document.querySelectorAll('.telescope-node').forEach(function(node) {
        if (era === 'all' || node.dataset.era === era) {
            node.style.display = 'block';
        } else {
            node.style.display = 'none';
        }
    });
}

function displayTelescopeDetails(telescope) {
    const detailsPanel = document.getElementById('telescope-details');
    
    // Load telescope data (this could be fetched from a JSON file)
    const telescopeData = getTelescopeData(telescope);
    
    // Generate HTML content for details panel
    let content = `
        <div class="telescope-header">
            <h2>${telescopeData.name}</h2>
            <span class="launch-date">Launched: <strong>${telescopeData.launchDate}</strong></span>
        </div>
        
        <div class="telescope-content">
            <div class="horizontal-flexbox margin-bottom-2">
                <div class="video-container">
                    <div class="video-wrapper">
                        <img src="${telescopeData.mainImage}" alt="${telescopeData.name}" class="main-image">
                    </div>
                </div>
                <div>
                    <div class="specs-table">
                        <div class="spec-row">
                            <div class="spec-label">Wavelength:</div>
                            <div class="spec-value">${telescopeData.wavelength}</div>
                        </div>
                        <div class="spec-row">
                            <div class="spec-label">Size/Aperture:</div>
                            <div class="spec-value">${telescopeData.size}</div>
                        </div>
                        <div class="spec-row">
                            <div class="spec-label">Orbit:</div>
                            <div class="spec-value">${telescopeData.orbit}</div>
                        </div>
                        <div class="spec-row">
                            <div class="spec-label">Mission Duration:</div>
                            <div class="spec-value">${telescopeData.duration}</div>
                        </div>
                        <div class="spec-row">
                            <div class="spec-label">Operating Agency:</div>
                            <div class="spec-value">${telescopeData.agency}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="telescope-info">
                <div class="telescope-description">
                    ${telescopeData.description}
                </div>
                
                <h3>Key Discoveries</h3>
                <ul class="discoveries-list">
                    ${telescopeData.discoveries.map(function(discovery) {
                        return `
                        <li>
                            <span class="discovery-date">${discovery.year}</span>
                            <span class="discovery-text">${discovery.text}</span>
                        </li>
                    `;
                    }).join('')}
                </ul>
                
                <div class="telescope-links">
                    <a href="${telescopeData.officialWebsite}" target="_blank" class="readmore-more-link">
                        <h3>Learn More</h3>
                        <div class="circle-box">→</div>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    detailsPanel.innerHTML = content;
    
    // Add event listeners to gallery thumbnails
    document.querySelectorAll('.gallery-thumb').forEach(function(thumb) {
        thumb.addEventListener('click', function() {
            document.querySelector('.main-image').src = this.dataset.full;
        });
    });
}

function getTelescopeData(telescopeId) {
    // This would ideally come from a JSON file
    const telescopes = {
        uhuru: {
            name: "Uhuru",
            launchDate: "December 12, 1970",
            wavelength: "X-ray",
            size: "0.3-meter primary mirror",
            orbit: "Low Earth Orbit (500 km)",
            duration: "3 years",
            agency: "NASA",
            mainImage: "/images/X-Ray_Explorer_Satellite.jpg",
            description: "Uhuru was the first satellite dedicated to X-ray astronomy. It made significant contributions to our understanding of X-ray sources in the universe, including the discovery of the first X-ray binary star.",
            discoveries: [
                {
                    year: "1971",
                    text: "First detection of X-ray emission from a binary star system"
                },
                {
                    year: "1972",
                    text: "Discovery of the first X-ray pulsar"
                },
                {
                    year: "1973",
                    text: "Mapped the distribution of X-ray sources in the sky"
                }
            ],
            moreInfo: "https://www.cfa.harvard.edu/facilities-technology/telescopes-instruments/uhuru"
        },
        viking: {
            name: "Viking 1",
            launchDate: "September 15, 1977",
            wavelength: "Visible, Infrared",
            size: "1.5-meter diameter",
            orbit: "Mars Orbit",
            duration: "6 years",
            agency: "NASA",
            mainImage: "/images/500px-Viking_spacecraft.jpg",
            description: "Viking 1 was the first spacecraft to successfully land on Mars and conduct experiments on the Martian surface. It sent back the first images of the Martian landscape.",
            discoveries: [
                {
                    year: "1976",
                    text: "First images of the Martian surface"
                },
                {
                    year: "1977",
                    text: "Conducted the first successful landing on Mars"
                }
            ],
            moreInfo: "https://science.nasa.gov/mission/viking-1"
        },
        iras: {
            name: "Infrared Astronomical Satellite (IRAS)",
            launchDate: "January 25, 1983",
            wavelength: "Infrared",
            size: "0.57-meter primary mirror",
            orbit: "Sun-Earth L2 Lagrange Point (1.5 million km from Earth)",
            duration: "10 months",
            agency: "NASA & UKSA",
            mainImage: "/images/IRAS.jpeg",
            description: "IRAS was the first space telescope to survey the entire sky in infrared wavelengths. It discovered thousands of new celestial objects, including comets, asteroids, and distant galaxies.",
            discoveries: [
                {
                    year: "1983",
                    text: "Discovered the first comet detected by infrared light"
                },
                {
                    year: "1984",
                    text: "Identified over 350,000 celestial objects"
                },
                {
                    year: "1985",
                    text: "Mapped the distribution of dust in the Milky Way"
                }
            ],
            moreInfo: "https://www.jpl.nasa.gov/missions/infrared-astronomical-satellite-iras"
        },
        hubble: {
            name: "Hubble Space Telescope",
            launchDate: "April 24, 1990",
            wavelength: "Ultraviolet, Visible, Near-Infrared",
            size: "2.4-meter primary mirror",
            orbit: "Low Earth Orbit (547 km)",
            duration: "30+ years and counting",
            agency: "NASA & ESA",
            mainImage: "/images/hubble-space-telescope.jpg",
            description: "The Hubble Space Telescope has made more than 1.4 million observations since its mission began in 1990. Astronomers using Hubble data have published more than 17,000 scientific papers, making it one of the most productive scientific instruments ever built.",
            discoveries: [
                {
                    year: "1995",
                    text: "Hubble Deep Field - First deep view into the universe"
                },
                {
                    year: "2001",
                    text: "First measurement of an exoplanet atmosphere"
                },
                {
                    year: "2009",
                    text: "Helped determine the accelerating expansion of the universe"
                }
            ],
            officialWebsite: "https://hubblesite.org/",
            moreInfo: "https://science.nasa.gov/mission/hubble/"
        },
        chandra: {
            name: "Chandra X-ray Observatory",
            launchDate: "July 23, 1999",
            wavelength: "X-ray",
            size: "2.4-meter primary mirror",
            orbit: "High Earth Orbit (139,000 km)",
            duration: "Minimum 5-year mission, extended to 20+ years",
            agency: "NASA",
            mainImage: "/images/Chandra_artist_illustration.jpg",
            description: "Chandra is NASA's flagship mission for X-ray astronomy. It has provided unprecedented views of the universe in X-rays, revealing phenomena such as black holes, supernova remnants, and clusters of galaxies.",
            discoveries: [
                {
                    year: "2000",
                    text: "First direct image of a black hole"
                },
                {
                    year: "2003",
                    text: "Discovered the most distant galaxy ever observed"
                },
                {
                    year: "2014",
                    text: "Revealed the structure of the Milky Way's halo"
                }
            ],
            moreInfo: "https://www.nasa.gov/mission/chandra-x-ray-observatory"
        },
        spitzer: {
            name: "Spitzer Space Telescope",
            launchDate: "August 25, 2003",
            wavelength: "Infrared",
            size: "0.85-meter primary mirror",
            orbit: "Sun-Earth L2 Lagrange Point (1.5 million km from Earth)",
            duration: "Minimum 5-year mission, extended to 16 years",
            agency: "NASA",
            mainImage: "/images/spitzer20171013-768.jpg",
            description: "Spitzer was the first space telescope to detect light from exoplanets and has provided critical insights into the formation of stars and galaxies, as well as the structure of our own Milky Way galaxy.",
            discoveries: [
                {
                    year: "2004",
                    text: "First detection of light from an exoplanet"
                },
                {
                    year: "2009",
                    text: "Revealed the presence of water in the atmosphere of an exoplanet"
                },
                {
                    year: "2018",
                    text: "Mapped the Milky Way's spiral arms in unprecedented detail"
                }
            ],
            moreInfo: "https://science.nasa.gov/mission/spitzer"
        },
        kepler: {
            name: "Kepler Space Telescope",
            launchDate: "March 7, 2009",
            wavelength: "Visible",
            size: "0.95-meter primary mirror",
            orbit: "Sun-Earth L2 Lagrange Point (1.5 million km from Earth)",
            duration: "Minimum 3.5-year mission, extended to 9 years",
            agency: "NASA",
            mainImage: "/images/PIA18904~large.jpg",
            description: "Kepler was designed to survey a portion of our region of the Milky Way galaxy to discover Earth-size planets in or near the habitable zones of their stars. It has discovered thousands of exoplanets, revolutionizing our understanding of planetary systems.",
            discoveries: [
                {
                    year: "2009",
                    text: "First detection of an Earth-size exoplanet"
                },
                {
                    year: "2011",
                    text: "Confirmed over 1,000 exoplanets"
                },
                {
                    year: "2014",
                    text: "Revealed the diversity of planetary systems"
                }
            ],
            moreInfo: "https://science.nasa.gov/mission/kepler/"
        },
        jwst: {
            name: "James Webb Space Telescope",
            launchDate: "December 25, 2021",
            wavelength: "Near and Mid-Infrared",
            size: "6.5-meter primary mirror",
            orbit: "Sun-Earth L2 Lagrange Point (1.5 million km from Earth)",
            duration: "Minimum 5-year mission, goal of 10+ years",
            agency: "NASA, ESA, CSA",
            mainImage: "/images/jwst_artist_concept_0.jpg",
            description: "The James Webb Space Telescope is the largest, most powerful space telescope ever built. Its significantly improved infrared resolution and sensitivity allow it to view objects too old, distant, or faint for the Hubble Space Telescope.",
            discoveries: [
                {
                    year: "2022",
                    text: "First deep field image revealing thousands of galaxies"
                },
                {
                    year: "2023",
                    text: "Detection of water vapor in the atmosphere of exoplanet K2-18b"
                },
                {
                    year: "2023",
                    text: "Most detailed images of early galaxies from the universe's first billion years"
                }
            ],
            moreInfo: "https://science.nasa.gov/mission/webb/"
        },
        roman: {
            name: "Nancy Grace Roman Space Telescope",
            launchDate: "By May 2027",
            wavelength: "Visible and Near-Infrared",
            size: "2.4-meter primary mirror",
            orbit: "Sun-Earth L2 Lagrange Point (1.5 million km from Earth)",
            duration: "Minimum 5-year mission",
            agency: "NASA",
            mainImage: "/images/nancy-grace.jpg",
            description: "The Nancy Grace Roman Space Telescope will be a wide-field observatory that will help answer fundamental questions in astrophysics and cosmology. It will have a field of view 100 times larger than that of the Hubble Space Telescope.",
            discoveries: [
                {
                    year: "2027",
                    text: "Expected to make significant contributions to dark energy research"
                },
                {
                    year: "2028",
                    text: "Will conduct a census of exoplanets in the Milky Way"
                },
                {
                    year: "2029",
                    text: "Will map the distribution of dark matter in the universe"
                }
            ],
            moreInfo: "https://science.nasa.gov/mission/roman-space-telescope"
        }
    };
    
    return telescopes[telescopeId] || {};
}

function animateTimelineEntry() {
    // Optional animation when the timeline first loads
    const timelineTrack = document.querySelector('.timeline-track');
    const nodes = document.querySelectorAll('.telescope-node');
    
    timelineTrack.style.opacity = 0;
    nodes.forEach(function(node) {
        node.style.opacity = 0;
        node.style.transform = 'translateX(-50%) translateY(20px)';
    });
    
    // Fade in timeline
    setTimeout(function() {
        timelineTrack.style.transition = 'opacity 1s ease';
        timelineTrack.style.opacity = 1;
        
        // Stagger node animations
        nodes.forEach(function(node, index) {
            setTimeout(function() {
                node.style.transition = 'all 0.5s ease';
                node.style.opacity = 1;
                node.style.transform = 'translateX(-50%) translateY(0)';
            }, 300 + (index * 100));
        });
    }, 300);
}

//#endregion Timeline functionality for the Space Telescopes section