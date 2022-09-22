import Logo from './assets/icons/logo-icon.png';
import Magnify from './assets/icons/magnify.png';
import {format, endOfToday} from 'date-fns';

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

        // Another <div></div> for left side of this section is created
        const projectInfo = createElementWithId('div','project-info');
        // Left side has another <div></div> for title and desc inside it
        const piLeft = createElementWithId('div','piLeft');
        // Right side has another <div></div> for due date in it
        const piRight = createElementWithId('div','piRight');

        projectInfo.appendChild(piLeft);
        projectInfo.appendChild(piRight);

        subHeader2.appendChild(projectInfo);

        // Then we put another <div></div> on right side for buttons
        const buttons = createElementWithId('div','control-buttons');

        const newTodo = createElementWithClass('button');
        newTodo.textContent = 'New TODO';
        newTodo.addEventListener('click', function(){showTodosPopup()});
        const completeAll = createElementWithClass('button');
        completeAll.textContent = 'Complete ALL';
        const deleteAll = createElementWithClass('button');
        deleteAll.textContent = 'Delete All';

        buttons.appendChild(newTodo);
        buttons.appendChild(completeAll);
        buttons.appendChild(deleteAll);

        subHeader2.appendChild(buttons);

        // MAIN

        // Header of TODOs list
        const ulTodos = createElementWithId('ul','ul-todos');
        main.appendChild(ulTodos);

        const liHeader = createElementWithClass('li','li-header');
        
        const titleHeader = createElementWithClass('p','title');
        titleHeader.textContent = 'Title';
        liHeader.appendChild(titleHeader);
        
        const dateHeader = createElementWithClass('p');
        dateHeader.textContent = 'Due Date';
        liHeader.appendChild(dateHeader);

        const priorityHeader = createElementWithClass('p');
        priorityHeader.textContent = 'Priority';
        liHeader.appendChild(priorityHeader);
        
        ulTodos.appendChild(liHeader);

        // USEFUL LISTENERS
        
        // Listener that hide new TODO popup if user clicks outside it
        document.addEventListener('click', function(element) {
            // Check if the zone clicked is in the form div
            const isInForm = element.target.closest('.popup-content');
            // Check if the zone clicked is the 'New Book' button
            const isButton = element.target.closest('button');
            const popup = document.querySelector('.popup');
            // If the users clicks out the form and the zone isn't the 'New Book' button and
            // the form is visible...
            if (!isInForm && !isButton && popup.style.display == 'flex') {
                unshowTodosPopup();
            }
        });
    }

    function displayProjectsMenu(ids,titles) {
        // Retrieve <ul id="projects-list"></ul> element from the DOM
        const projectsList = getElement('projects-list');

        // Delete all nodes
        while (projectsList.firstChild) {
            projectsList.removeChild(projectsList.lastChild);
        }
        
        // Create nodes for each project in the array
        for (let i = 0; i < ids.length; i++) {
            // Create the <li></li> with the id of the project
            const li = createElementWithId('li',ids[i]);
            
            // Inside each <li></li> there is a <a></a>
            const a = createElementWithClass('a','project-name');
            a.setAttribute('href','');
            a.textContent = titles[i];
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

    function displayUserInfo(img,userName) {
        const userDiv = getElement('user');

        // Display user avatar
        const avatar = img;
        avatar.setAttribute('alt','avatar');
        avatar.classList.add('avatar-small');
        userDiv.appendChild(avatar);

        // Display user name
        const name = createElementWithClass('p');
        name.textContent = userName;
        userDiv.appendChild(name);
    }

    function displayProjectInfo(title,desc,date) {
        // This info goes inside <div></div>s we need to retrieve
        const piLeft = getElement('piLeft');
        const piRight = getElement('piRight');
        
        const projectTitle = createElementWithClass('p','project-title');
        projectTitle.textContent = title;
        piLeft.appendChild(projectTitle);

        const projectDesc = createElementWithClass('p','project-desc');
        projectDesc.textContent = desc;
        piLeft.appendChild(projectDesc);

        const projectDueDate = createElementWithClass('p','project-date');
        projectDueDate.textContent = format(date, 'dd/MM/yyyy');
        piRight.appendChild(projectDueDate);
    }

    function displayTodoInList(name,date,completed,priority,overdued) {
        const ul = getElement('ul-todos');

        const li = createElementWithClass('li');
        
        const checkbox = createElementWithClass('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        li.appendChild(checkbox);
        
        const titleP = createElementWithClass('p','todo');
        titleP.textContent = name;
        if (completed) {
            titleP.classList.add('completed');
        }
        li.appendChild(titleP);

        const dateP = createElementWithClass('p','todo');
        dateP.textContent = format(date, 'dd/MM/yyyy');
        if (overdued && !completed) {
            dateP.classList.add('high');
        }
        if (completed) {
            dateP.classList.add('completed');
        }
        li.appendChild(dateP);

        const priorityP = createElementWithClass('p','todo');
        priorityP.textContent = priority;
        if (priority === 'high') {
            priorityP.classList.add('high');
        }
        if (completed) {
            priorityP.classList.add('completed');
        }
        li.appendChild(priorityP);

        const deleteButton = createElementWithClass('button','delete-todo');
        deleteButton.textContent = 'Delete';
        li.appendChild(deleteButton);
        
        ul.appendChild(li);
    }

    // Function that renders the popup to add new TODOs (not displayed yet, view
    // showTodosPopup())
    function displayTodosPopup() {
        const main = getElement('main');

        const popup = createElementWithClass('div','popup');
        const popupContent = createElementWithClass('div','popup-content');
        const form = createElementWithId('form','newTodoForm');

        const header = createElementWithClass('h2','popup-header');
        header.textContent = 'New TODO';
        
        const title = createElementWithClass('input','todoInput');
        title.setAttribute('type','text');
        title.setAttribute('name','todoTitle');
        title.setAttribute('id','todoTitle');
        title.setAttribute('placeholder','Title (required)');

        const desc = createElementWithClass('textarea','todoArea');
        desc.setAttribute('name','todoDesc');
        desc.setAttribute('id','todoDesc');
        desc.setAttribute('placeholder','Description (optional)');
        desc.setAttribute('cols','31')
        desc.setAttribute('rows','4')

        const dateLabel = createElementWithClass('label','todoLabel');
        dateLabel.setAttribute('for','todoDueDate');
        dateLabel.textContent = 'Due Date';

        const date = createElementWithClass('input','todoInput');
        date.setAttribute('type','date');
        date.setAttribute('name','todoDueDate');
        date.setAttribute('id','todoDueDate');
        date.setAttribute('value',format(endOfToday(),'yyyy-mm-dd'));
        date.setAttribute('min',format(endOfToday(),'yyyy-mm-dd'));

        const priorityLabel = createElementWithClass('label','todoLabel');
        priorityLabel.setAttribute('for','priority');
        priorityLabel.textContent = 'Priority';

        const prioritySelect = createElementWithClass('select','todoInput');
        prioritySelect.setAttribute('id','priority');

        const low = createElementWithClass('option');
        low.setAttribute('value','low');
        low.setAttribute('selected','true');
        low.textContent = 'low';

        const high = createElementWithClass('option');
        high.setAttribute('value','high');
        high.textContent = 'high';

        const button = createElementWithId('button','saveTodo');
        button.setAttribute('type','button');
        button.textContent = 'Save TODO';

        prioritySelect.appendChild(low);
        prioritySelect.appendChild(high);
        form.appendChild(header);
        form.appendChild(title);
        form.appendChild(desc);
        form.appendChild(dateLabel);
        form.appendChild(date);
        form.appendChild(priorityLabel);
        form.appendChild(prioritySelect);
        form.appendChild(button);
        popupContent.appendChild(form);
        popup.appendChild(popupContent);
        main.appendChild(popup);
    }

    // Called by event listener associated to the 'New TODO' button
    function showTodosPopup() {
        const popup = document.querySelector('.popup');
        popup.style.display = "flex";
    }

    function unshowTodosPopup() {
        const popup = document.querySelector('.popup');
        popup.style.display = "none";
        // Form needs to be cleaned
        const form = getElement('newTodoForm');
        form.reset();
    }

    return {
        createElementWithClass,
        createElementWithId,
        getElement,
        loadMainUI,
        displayProjectsMenu,
        displayUserInfo,
        displayProjectInfo,
        displayTodoInList,
        displayTodosPopup
    }
})();