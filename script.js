const burgerButton = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
const blend = document.querySelector('.blend');

// attaches css classes to elements to activate the menu
function toggleMenu() {
    burgerButton.classList.toggle('active');
    headerMenu.classList.toggle('active');
    document.body.classList.toggle('lock');
    blend.classList.toggle('blend-visible');
}

function overrideAnchors() {
    // if current target is not an anchor, get a reference
    // to its parent anchor tag
    const getAnchor = (target) => {
        if ('href' in target) {
            return target;
        }
        const parent = target.parentElement;
        return getAnchor(parent);
    };
    // sets new behaviour for each 'a' tag on the page
    const setNewClickBehaviour = (e) => {
        e.preventDefault();
        const anchor = getAnchor(e.target);
        // if href has a # sign, assume it's a link to an element on the same page
        const hrefs = anchor.href.split('#');
        const href = hrefs[hrefs.length - 1];
        // try to get that element
        const element = document.getElementById(href);
        if (!element) {
            // if element is not found, just redirect browser to anchor's 'href'
            document.location.href = anchor.href;
            return;
        }
        // if element is found, scroll the page precisely to
        // the beginning of the element
        const elTop = element.getBoundingClientRect().top;
        const header = document.querySelector('header');
        const headerBottom = header.getBoundingClientRect().bottom;
        window.scrollBy(0, elTop - headerBottom);
    };
    document.querySelectorAll('a').forEach(
        (a) => a.addEventListener('click', setNewClickBehaviour),
    );
}

overrideAnchors();
burgerButton.addEventListener('click', toggleMenu);
blend.addEventListener('click', toggleMenu);
