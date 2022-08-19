// A module (only one instance) for a View that control DOM manipulation
let view = (function() {
    'use strict';

    // Create an element with an optional CSS class
    function createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }

        return element;
    }

    // Retrieve an element from the DOM
    function getElement(selector) {
        const element = document.querySelector(selector);

        return element;
    }

    return {
        createElement,
        getElement
    }
})();