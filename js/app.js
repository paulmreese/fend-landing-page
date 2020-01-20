/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

/*
  https://hackernoon.com/htmlcollection-nodelist-and-array-of-objects-da42737181f9
  Special Thanks for the concise syntax!
*/
let nodeList = document.querySelectorAll('section[id]');
let sectionArray = [...nodeList];
let sectionIds = [];
let sectionNames = [];
let sectionTops = [];
let sectionBottoms = [];

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
getSectionInfo = () => {
    for (let i=0; i < sectionArray.length; i++) {
        sectionIds.push(sectionArray[i].id);
        sectionNames.push(sectionArray[i].dataset.nav);
        sectionTops.push(sectionArray[i].offsetTop);
        sectionBottoms.push(sectionArray[i].offsetTop +
            sectionArray[i].offsetHeight);
    }
}

appendNavLink = () => {
    for (const i in sectionIds) {
        const newNavMenuLink = document.querySelector(sectionIds[i])
        const navMenu = document.getElementById("navbar__list");
        const listItem = document.createElement("li");
        const navLink = document.createElement("a");
        listItem.appendChild(navLink);
        navLink.appendChild(document.createTextNode(sectionNames[i]));
        navLink.setAttribute("id", `link-to-${sectionIds[i]}`);
        navLink.setAttribute("href", `#${sectionIds[i]}`);
        navLink.setAttribute("data-link-id", sectionIds[i]);
        navLink.classList.add('menu__link');
        navMenu.appendChild(listItem);
    }
}

detectScrollPosition = () => {
    for (let i = 0; i < sectionTops.length; i++) {
        const currentSection = document.getElementById(sectionIds[i]);
        const currentLink = document.getElementById(`link-to-${sectionIds[i]}`);
        console.log(currentLink);
        if (window.pageYOffset >= sectionTops[i] - 50 &&
            window.pageYOffset <= sectionBottoms[i] - 50) {
                currentSection.classList.add('active-section');
                currentLink.classList.add('current-section');
        } else {
            currentSection.classList.remove('active-section');
            currentLink.classList.remove('current-section');
        }
    }
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
getSectionInfo();
appendNavLink();
//For development, keep tabs on the actual section offsets
console.log(sectionTops + " " + window.pageYOffset);


// Add class 'active-section' to section when near top of viewport
document.addEventListener('scroll', detectScrollPosition);


/**
 * End Main Functions
 * Begin Events
 *
*/

// Scroll to section on link click
/*
 * https://flaviocopes.com/add-click-event-to-dom-list/
 * Special thanks for concise Node Array syntax and
 *
 * https://css-tricks.com/snippets/jquery/smooth-scrolling/
 * Special thanks for smooth scroll tips!
 */
for (const link of document.querySelectorAll('.menu__link')) {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target);
        const sectionId = e.target.dataset.linkId;
        window.scroll({
            top: document.getElementById(sectionId).offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    });
}
