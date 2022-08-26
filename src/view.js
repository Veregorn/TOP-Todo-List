import Logo from './assets/icons/logo-icon.png';
import Magnify from './assets/icons/magnify.png';

// A module (only one instance) for a View that control DOM manipulation
export let view = (function() {
    'use strict';

    // Create an element with an optional CSS class
    function createElementWithClass(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }

        return element;
    }

    // Create an element with an optional CSS id
    function createElementWithId(tag, id) {
        const element = document.createElement(tag);
        if (id) {
            element.setAttribute("id",id);
        }

        return element;
    }

    // Retrieve an element from the DOM
    function getElement(id) {
        const element = document.getElementById(id);

        return element;
    }

    // Load initial UI screen
    function loadMainUI() {
        // Create a <div id="sidebar"></div> element and append it to <body></body>
        const sidebar = createElementWithId("div","sidebar");
        document.body.appendChild(sidebar);

        // Create a <div id="header"></div> element and append it to <body></body>
        const header = createElementWithId("div","header");
        document.body.appendChild(header);

        // Create a <div id="main"></div> element and append it to <body></body>
        const main = createElementWithId("div","main");
        document.body.appendChild(main);

        // SIDEBAR

        // Logo
        const logo = createElementWithId("div","logo");
        sidebar.appendChild(logo);

        const icon = new Image();
        icon.src = Logo;
        icon.setAttribute('class','icon');
        icon.setAttribute('alt','icon');
        logo.appendChild(icon);

        const h1 = createElementWithClass("h1");
        h1.textContent = "Todo List";
        logo.appendChild(h1);

        // Projects
        const projects = createElementWithId('div','projects');
        sidebar.appendChild(projects);

        const h2 = createElementWithClass('h2');
        h2.textContent = "Projects";
        projects.appendChild(h2);

        const menu = createElementWithId('div','menu');
        projects.appendChild(menu);

        const ul = createElementWithId('ul','projects-list');
        menu.appendChild(ul);

        // New Project
        const newProjDiv = createElementWithId('div','new-project');
        sidebar.appendChild(newProjDiv);

        const button = createElementWithClass('button');
        button.textContent = "New Project";
        newProjDiv.appendChild(button);

        // HEADER

        // Sub Header 1
        const subHeader1 = createElementWithId('div','subheader-1');
        header.appendChild(subHeader1);

        const search = createElementWithId('div','search');
        subHeader1.appendChild(search);

        const magni = new Image();
        magni.src = Magnify;
        magni.setAttribute('alt','search-icon');
        search.appendChild(magni);

        const searchInput = createElementWithId('input','search-input');
        searchInput.setAttribute('type','text');
        searchInput.setAttribute('name','search-input');
        searchInput.setAttribute('placeholder','Find TODOs in this project');
        search.appendChild(searchInput);

        const user = createElementWithId('div','user');
        subHeader1.appendChild(user);

        // Sub Header 2
        const subHeader2 = createElementWithId('div','subheader-2');
        header.appendChild(subHeader2);
    }

    function displayProjectsMenu(projects) {
        // Retrieve <ul id="projects-list"></ul> element from the DOM
        const projectsList = getElement('projects-list');

        // Delete all nodes
        while (projectsList.firstChild) {
            projectsList.removeChild(projectsList.lastChild);
        }
        
        // Create nodes for each project in the array
        for (let i = 0; i < projects.length; i++) {
            // Create the <li></li> with the id of the project
            const li = createElementWithId('li',projects[i].getId());
            
            // Inside each <li></li> there is a <a></a>
            const a = createElementWithClass('a','project-name');
            a.setAttribute('href','');
            a.textContent = projects[i].getTitle();
            li.appendChild(a);

            // Projects will also have a delete button (except 'default' one - the first)
            if (i > 0) {
                const deleteButton = createElementWithClass('button','delete');
                deleteButton.textContent = 'Delete';
                li.appendChild(deleteButton);
            }

            // Append the new node to the projects list
            projectsList.appendChild(li);
        }
    }

    function displayProjectInfo(project) {
        
    }

    return {
        createElementWithClass,
        createElementWithId,
        getElement,
        loadMainUI,
        displayProjectsMenu,
        displayProjectInfo
    }
})();