import Logo from './assets/icons/logo-icon.png';
import Magnify from './assets/icons/magnify.png';
import {format, startOfToday, endOfToday, compareAsc, add} from 'date-fns';
import {controller} from './index.js';

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
        button.addEventListener('click', function(){showNewProjectPopup()});
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
        searchInput.setAttribute('placeholder','Find TODOs in this project (Empty for ALL TODOs)');
        searchInput.addEventListener('keypress', function(e){
            if (e.key === 'Enter') {
                controller.displayFoundTodos(searchInput.value);
            }
        });
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
        newTodo.addEventListener('click', function(){showNewTodoPopup()});
        const completeAll = createElementWithClass('button');
        completeAll.textContent = 'Complete ALL';
        completeAll.addEventListener('click',function() {
            controller.completeAllTodos();
        });
        const deleteAll = createElementWithClass('button');
        deleteAll.textContent = 'Delete ALL';
        deleteAll.addEventListener('click',function() {
            controller.deleteAllTodos();
        });

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
        
        // Listener that hide new TODO or new PROJECT or edit TODO popup if user clicks outside it
        document.addEventListener('click', function(element) {
            // Check if the zone clicked is in the form div
            const isInForm = element.target.closest('.popup-content');
            // Check if the zone clicked is a button
            const isButton = element.target.closest('button');
            // Chack if the zone clicked is a TODO
            const isTodo = element.target.closest('.todo');

            const newTodoPopup = document.querySelector('#newTodoPopup');
            const projectPopup = document.querySelector('#projectPopup');
            const editTodoPopup = document.querySelector('#editTodoPopup');
            // If the users clicks out the form and the zone isn't a button and
            // the form is visible...
            if (!isInForm && !isButton && newTodoPopup.style.display == 'flex') {
                unshowNewTodoPopup();
            }
            if (!isInForm && !isButton && projectPopup.style.display == 'flex') {
                unshowNewProjectPopup();
            }
            
            if (!isInForm && !isButton && !isTodo && editTodoPopup.style.display == 'flex') {
                unshowEditTodoPopup();
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
            a.setAttribute('href','#');
            a.textContent = titles[i];
            a.addEventListener('click', function(){
                controller.getProjectInfo(ids[i]);
            });
            li.appendChild(a);

            // Projects will also have a delete button (except 'default' one - the first)
            if (i > 0) {
                const deleteButton = createElementWithClass('button','delete');
                deleteButton.textContent = 'Delete';
                // An event listener is needed to call the function in the controller
                deleteButton.addEventListener('click', function(){
                    controller.deleteProjectFromCurrentUser(ids[i]);
                });
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
        
        // if nodes exist yet we don't need to create them, only get them and
        // edit their content
        if (piLeft.firstChild && piRight.firstChild) {
            const projectTitle = getElement('project-title');
            const projectDesc = getElement('project-desc');
            const projectDueDate = getElement('project-date');

            projectTitle.textContent = title;
            projectDesc.textContent = desc;
            projectDueDate.textContent = format(date, 'dd/MM/yyyy');
        } else {
            const projectTitle = createElementWithId('p','project-title');
            const projectDesc = createElementWithId('p','project-desc');
            const projectDueDate = createElementWithId('p','project-date');

            projectTitle.textContent = title;
            projectDesc.textContent = desc;
            projectDueDate.textContent = format(date, 'dd/MM/yyyy');

            piLeft.appendChild(projectTitle);
            piLeft.appendChild(projectDesc);
            piRight.appendChild(projectDueDate);
        }
    }

    function displayTodoInList(id,name,date,completed,priority,overdued) {
        const ul = getElement('ul-todos');

        const li = createElementWithClass('li');
        
        const checkbox = createElementWithClass('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', function(){
            // First state in the model must to be updated
            controller.updateTodoState(id,this.checked);

            // Now I need to select siblings of this checkbox to update class completed
            const title = this.nextSibling;
            const desc = title.nextSibling;
            const date = desc.nextSibling;

            if (this.checked) {
                title.classList.add('completed');
                desc.classList.add('completed');
                date.classList.add('completed');
            } else {
                title.classList.remove('completed');
                desc.classList.remove('completed');
                date.classList.remove('completed');
            }
        });
        li.appendChild(checkbox);
        
        const titleA = createElementWithClass('a','todo');
        titleA.textContent = name;
        titleA.setAttribute('href','#');
        if (completed) {
            titleA.classList.add('completed');
        }
        titleA.addEventListener('click',function () {
            controller.getTodoInfo(id);
        });
        li.appendChild(titleA);

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
        deleteButton.addEventListener('click', function(){
            controller.deleteTodoFromCurrentUser(id);
        });
        li.appendChild(deleteButton);
        
        ul.appendChild(li);
    }

    // Function that renders the popup to add new TODOs (not displayed yet, view
    // showNewTodoPopup())
    function displayNewTodoPopup() {
        const main = getElement('main');

        const popup = createElementWithClass('div','popup');
        popup.setAttribute('id','newTodoPopup');
        const popupContent = createElementWithClass('div','popup-content');
        popupContent.setAttribute('id','newTodoPopupContent');
        const form = createElementWithId('form','newTodoForm');

        // FORM CONTENT

        const header = createElementWithClass('h2','popup-header');
        header.textContent = 'New TODO';
        
        const title = createElementWithClass('input','formInput');
        title.setAttribute('type','text');
        title.setAttribute('name','newTodoTitle');
        title.setAttribute('id','newTodoTitle');
        title.setAttribute('placeholder','Title (required)');

        const desc = createElementWithClass('textarea','formArea');
        desc.setAttribute('name','newTodoDesc');
        desc.setAttribute('id','newTodoDesc');
        desc.setAttribute('placeholder','Description (optional)');
        desc.setAttribute('cols','31');
        desc.setAttribute('rows','4');

        const dateLabel = createElementWithClass('label','formLabel');
        dateLabel.setAttribute('for','newTodoDueDate');
        dateLabel.textContent = 'Due Date';

        const date = createElementWithClass('input','formInput');
        date.setAttribute('type','date');
        date.setAttribute('name','newTodoDueDate');
        date.setAttribute('id','newTodoDueDate');
        date.valueAsDate = new Date();
        date.setAttribute('min',date.valueAsDate);

        const priorityLabel = createElementWithClass('label','formLabel');
        priorityLabel.setAttribute('for','newTodoPriority');
        priorityLabel.textContent = 'Priority';

        const prioritySelect = createElementWithClass('select','formInput');
        prioritySelect.setAttribute('id','newTodoPriority');

        const low = createElementWithClass('option');
        low.setAttribute('value','low');
        low.setAttribute('selected','true');
        low.textContent = 'low';

        const high = createElementWithClass('option');
        high.setAttribute('value','high');
        high.textContent = 'high';

        const button = createElementWithClass('button','formButton');
        button.setAttribute('id','saveNewTodo');
        button.setAttribute('type','button');
        button.textContent = 'Save TODO';
        button.addEventListener('click', function(){
            if (title.value.length === 0) {
                alert("Title can't be empty!");
            } else if (compareAsc(date.valueAsDate,startOfToday()) === -1) {
                alert("Don't create TODOs in the past. Please, look at your future!");
            } else {
                controller.createTodoInCurrentProject(null,title.value,desc.value,date.valueAsDate,prioritySelect.value,false);
                unshowNewTodoPopup();
            }
        });

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

    // Function that renders the popup to edit TODOs (not displayed yet, view
    // showEditTodoPopup())
    function displayEditTodoPopup() {
        const main = getElement('main');

        const popup = createElementWithClass('div','popup');
        popup.setAttribute('id','editTodoPopup');
        const popupContent = createElementWithClass('div','popup-content');
        popupContent.setAttribute('id','editTodoPopupContent');
        const form = createElementWithId('form','editTodoForm');

        // FORM CONTENT

        const header = createElementWithClass('h2','popup-header');
        header.textContent = 'Edit TODO';
        
        const title = createElementWithClass('input','formInput');
        title.setAttribute('type','text');
        title.setAttribute('name','editTodoTitle');
        title.setAttribute('id','editTodoTitle');
        title.setAttribute('placeholder','Title (required)');

        const desc = createElementWithClass('textarea','formArea');
        desc.setAttribute('name','editTodoDesc');
        desc.setAttribute('id','editTodoDesc');
        desc.setAttribute('placeholder','Description (optional)');
        desc.setAttribute('cols','31');
        desc.setAttribute('rows','4');

        const dateLabel = createElementWithClass('label','formLabel');
        dateLabel.setAttribute('for','editTodoDueDate');
        dateLabel.textContent = 'Due Date';

        const date = createElementWithClass('input','formInput');
        date.setAttribute('type','date');
        date.setAttribute('name','editTodoDueDate');
        date.setAttribute('id','editTodoDueDate');
        date.valueAsDate = new Date();
        date.setAttribute('min',date.valueAsDate);

        const priorityLabel = createElementWithClass('label','formLabel');
        priorityLabel.setAttribute('for','editTodoPriority');
        priorityLabel.textContent = 'Priority';

        const prioritySelect = createElementWithClass('select','formInput');
        prioritySelect.setAttribute('id','editTodoPriority');

        const low = createElementWithClass('option');
        low.setAttribute('value','low');
        low.setAttribute('selected','true');
        low.textContent = 'low';

        const high = createElementWithClass('option');
        high.setAttribute('value','high');
        high.textContent = 'high';

        const button = createElementWithClass('button','formButton');
        button.setAttribute('id','saveEditedTodo');
        button.setAttribute('type','button');
        button.textContent = 'Edit TODO';
        button.addEventListener('click', function(){
            if (title.value.length === 0) {
                alert("Title can't be empty!");
            } else if (compareAsc(date.valueAsDate,startOfToday()) === -1) {
                alert("Don't create TODOs in the past. Please, look at your future!");
            } else {
                controller.editTodo(title.value,desc.value,date.valueAsDate,prioritySelect.value);
                unshowEditTodoPopup();
            }
        });

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
    function showNewTodoPopup() {
        // Reasign default value to Due Date after the reset applied 
        // in the unshow function
        const date = getElement('newTodoDueDate');
        date.valueAsDate = new Date();
        
        const popup = document.querySelector('#newTodoPopup');
        popup.style.display = "flex";
    }

    // Called by HTML document element listener
    function unshowNewTodoPopup() {
        const popup = document.querySelector('#newTodoPopup');
        popup.style.display = "none";
        
        // Form needs to be cleaned
        const form = getElement('newTodoForm');
        form.reset();
    }

    // Shows the popup to edit TODO data
    function showEditTodoPopup(title,desc,date,priority) {
        const titleInput = getElement('editTodoTitle');
        const descInput = getElement('editTodoDesc');
        const dateInput = getElement('editTodoDueDate');
        const priorityInput = getElement('editTodoPriority');

        titleInput.value = title;
        descInput.value = desc;
        dateInput.valueAsDate = date;
        priorityInput.value = priority;

        const popup = document.querySelector('#editTodoPopup');
        popup.style.display = "flex";
    }

    function unshowEditTodoPopup() {
        const popup = document.querySelector('#editTodoPopup');
        popup.style.display = "none";

        // Form needs to be cleaned
        const form = getElement('editTodoForm');
        form.reset();
    }

    // Function that renders the popup to add new Projects (not displayed yet, view
    // showNewProjectPopup())
    function displayNewProjectPopup() {
        const main = getElement('main');

        const popup = createElementWithClass('div','popup');
        popup.setAttribute('id','projectPopup');
        const popupContent = createElementWithClass('div','popup-content');
        popupContent.setAttribute('id','projectPopupContent');
        const form = createElementWithId('form','newProjectForm');

        // FORM CONTENT
        
        const header = createElementWithClass('h2','popup-header');
        header.textContent = 'New Project';
        
        const title = createElementWithClass('input','formInput');
        title.setAttribute('type','text');
        title.setAttribute('name','projectTitle');
        title.setAttribute('id','projectTitle');
        title.setAttribute('placeholder','Title (required)');

        const desc = createElementWithClass('textarea','formArea');
        desc.setAttribute('name','projectDesc');
        desc.setAttribute('id','projectDesc');
        desc.setAttribute('placeholder','Description (optional)');
        desc.setAttribute('cols','31');
        desc.setAttribute('rows','4');

        const dateLabel = createElementWithClass('label','formLabel');
        dateLabel.setAttribute('for','projectDueDate');
        dateLabel.textContent = 'Due Date';

        const date = createElementWithClass('input','formInput');
        date.setAttribute('type','date');
        date.setAttribute('name','projectDueDate');
        date.setAttribute('id','projectDueDate');
        date.valueAsDate = new Date();
        date.setAttribute('min',date.valueAsDate);

        const button = createElementWithClass('button','formButton');
        button.setAttribute('id','saveProject');
        button.setAttribute('type','button');
        button.textContent = 'Save Project';
        button.addEventListener('click', function(){
            if (title.value.length === 0) {
                alert("Title can't be empty!");
            } else if (compareAsc(date.valueAsDate,startOfToday()) === -1) {
                alert("Don't create projects in the past. Please, look at your future!");
            } else {
                controller.createProjectForCurrentUser(null,title.value,desc.value,date.valueAsDate);
                unshowNewProjectPopup();
            }
        });

        form.appendChild(header);
        form.appendChild(title);
        form.appendChild(desc);
        form.appendChild(dateLabel);
        form.appendChild(date);
        form.appendChild(button);
        popupContent.appendChild(form);
        popup.appendChild(popupContent);
        main.appendChild(popup);
    }

    // Called by event listener associated to the 'New Project' button
    function showNewProjectPopup() {
        const popup = document.querySelector('#projectPopup');
        popup.style.display = "flex";
        // Reasign default value to Due Date after the reset applied 
        // in the unshow function
        const date = getElement('projectDueDate');
        date.valueAsDate = new Date();
    }

    // Called by HTML document element listener
    function unshowNewProjectPopup() {
        const popup = document.querySelector('#projectPopup');
        popup.style.display = "none";
        // Form needs to be cleaned
        const form = getElement('newProjectForm');
        form.reset();
    }

    function removeTodosFromDom() {
        // Let's select element father of all todos
        const ulTodos = getElement('ul-todos');

        // Delete all nodes
        while (ulTodos.firstChild) {
            ulTodos.removeChild(ulTodos.lastChild);
        }

        // Last we need to create the header of TODOs list again
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
        displayNewTodoPopup,
        displayNewProjectPopup,
        removeTodosFromDom,
        displayEditTodoPopup,
        showEditTodoPopup
    }
})();