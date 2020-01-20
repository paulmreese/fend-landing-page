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
        navLink.setAttribute("href", `#${sectionIds[i]}`)
        navLink.classList.add('menu__link');
        navMenu.appendChild(listItem);
    }
}

detectScrollPosition = () => {
    for (let i = 0; i < sectionTops.length; i++) {
        const currentSection = document.getElementById(sectionIds[i]);
        if (window.pageYOffset >= sectionTops[i] &&
            window.pageYOffset <= sectionBottoms[i]) {
                currentSection.classList.add('active-section');
        } else {
            currentSection.classList.remove('active-section');
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


// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', detectScrollPosition);


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
