import './styles/global.css';
import {Project, Todo, User} from './model.js';
import {view} from './view.js';
import Avatar from './assets/icons/monkey.svg';

// Three global variables needed to control ids for todos, projects and users
// In first start their value is 1. In other cases we need to retrieve it from localStorage
let todosIdCounter = 1;
let projectsIdCounter = 1;
let usersIdCounter = 1;

if (localStorage.getItem("todosIdCounter") != null) {
    todosIdCounter = localStorage.getItem("todosIdCounter");
}

if (localStorage.getItem("projectsIdCounter") != null) {
    projectsIdCounter = localStorage.getItem("projectsIdCounter");
}

if (localStorage.getItem("usersIdCounter") != null) {
    usersIdCounter = localStorage.getItem("usersIdCounter");
}

// One global variable to control who is the user that control the IA
// at the moment
let currentUser = User();

// One global variable to control what project user is working in
// By default is number 1 (the ID of the default project)
let currentProject = 1;

// One global variable to control what TODO user is editing
let currentTodo = 1;

// One global variable to check if there is data in localStorage
let stringifiedCurrentUser = localStorage.getItem("Default User");

// A module for the controller (App logic)
export let controller = (function() {
    'use strict';

    function createProjectForCurrentUser(id,title,desc,date) {
        // If 'id' == null then is a new project, else is a project retrieved
        // from localStorage
        if (id === null) {
            const newID = projectsIdCounter;
            projectsIdCounter++;
            currentUser.addProject(Project(newID,title,desc,date));
        } else {
            currentUser.addProject(Project(id,title,desc,date));
        }

        refreshProjects(currentUser);
        SaveInLocalStorage();
    }

    function createTodoInCurrentProject(id,title,desc,date,priority) {
        const project = currentUser.getProject(currentProject);
        // If 'id' == null then is a new todo, else is a todo retrieved
        // from localStorage
        if (id === null) {
            const newID = todosIdCounter;
            todosIdCounter++;
            project.addTodo(Todo(newID,title,desc,date,priority));
        } else {
            project.addTodo(Todo(id,title,desc,date,priority));
        }

        refreshTodos(project);
        SaveInLocalStorage();
    }

    function createUser(name,path) {
        const user = User(usersIdCounter,name,path);
        usersIdCounter++;
        SaveInLocalStorage();
        return user;
    }

    // Extracts projects from model, constructs 2 arrays with ids and titles
    // and pass them to the view to so left menu (projects)
    function refreshProjects(user) {
        // Displaying user's projects in left menu
        // First create an array with projects ids
        let ids = [];
        for (let i = 0; i < user.getProjects().length; i++) {
            const element = user.getProjects()[i];
            ids.push(element.getId());
        }
        // Then create another array with projects titles
        let titles = [];
        for (let i = 0; i < user.getProjects().length; i++) {
            const element = user.getProjects()[i];
            titles.push(element.getTitle());
        }

        view.displayProjectsMenu(ids,titles);
    }

    function refreshTodos(project) {
        view.removeTodosFromDom();
        getTodosForThisProject(project.getId());
    }

    function deleteProjectFromCurrentUser(id) {
        currentUser.deleteProject(id);
        refreshProjects(currentUser);
        // If project deleted is current project I need to display another one
        // Default one
        if (currentProject === id) {
            getProjectInfo(1);
        }
        SaveInLocalStorage();
    }

    // When project title is clicked in left menu, controller retrieves info
    // of this project and call view to show that info
    function getProjectInfo(id) {
        // First we take the project from current user
        const project = currentUser.getProject(id);

        // Then obtain the values we need
        const title = project.getTitle();
        const desc = project.getDescription();
        const date = project.getDueDate();

        // We call our function in the view
        view.displayProjectInfo(title,desc,date);

        // Last we get all todos for this project
        refreshTodos(project);

        // PD: We need to update global variable
        currentProject = id;
    }

    function getTodosForThisProject(id) {
        // First we take the project from current user
        const project = currentUser.getProject(id);

        // Displaying TODOs in a project
        for (let i = 0; i < project.getNumberOfTodos(); i++) {
            const todo = project.getTodoByOrder(i);
            view.displayTodoInList(todo.getId(),todo.getTitle(),todo.getDueDate(),todo.isCompleted(),todo.getPriority(),todo.isOverdued());
        }
    }

    function completeAllTodos() {
        // First we take the project from current user
        const project = currentUser.getProject(currentProject);

        // Completing All TODOs in that project
        for (let i = 0; i < project.getNumberOfTodos(); i++) {
            const todo = project.getTodoByOrder(i);
            updateTodoState(todo.getId(),true);
        }

        // Last, we need to update changes in user's screen
        refreshTodos(project);

        SaveInLocalStorage();
    }

    function deleteAllTodos() {
        // First we take the project from current user
        const project = currentUser.getProject(currentProject);

        // Deleting all todos in that project
        while (project.getNumberOfTodos() > 0) {
            const todo = project.getTodoByOrder(0);
            project.deleteTodo(todo.getId());
        }

        // Last, we need to update changes in user's screen
        refreshTodos(project);

        SaveInLocalStorage();
    }

    function updateTodoState(id,checked) {
        // Retrieving project user is working in
        const project = currentUser.getProject(currentProject);

        // Retrieving todo
        const todo = project.getTodoById(id);

        if (checked) {
            todo.complete();
        } else {
            todo.unComplete();
        }

        SaveInLocalStorage();
    }

    function deleteTodoFromCurrentUser(id) {
        // Retrieving project user is working in
        const project = currentUser.getProject(currentProject);

        project.deleteTodo(id);

        // Now I need to refresh todos in DOM
        view.removeTodosFromDom();
        getTodosForThisProject(currentProject);

        SaveInLocalStorage();
    }

    // Function called by event listener associated to the names of TODOs
    // Retrieve the TODO from the model and pass required fields to the view
    function getTodoInfo(id) {
        const project = currentUser.getProject(currentProject);
        const todo = project.getTodoById(id);

        // Global variable needs to be updated
        currentTodo = id;

        view.showEditTodoPopup(todo.getTitle(),todo.getDescription(),todo.getDueDate(),todo.getPriority());
    }

    // Function that updates TODO info in the model with the updates 
    // from the Edit TODO popup
    function editTodo(title,desc,date,priority) {
        const project = currentUser.getProject(currentProject);
        const todo = project.getTodoById(currentTodo);

        // Now let's edit todo fields
        todo.setTitle(title);
        todo.setDescription(desc);
        todo.setDueDate(date);
        todo.setPriority(priority);

        // Last we need to refresh TODOs in view
        refreshTodos(project);

        SaveInLocalStorage();
    }

    // Function that saves model status in localStorage
    function SaveInLocalStorage() {
        // Let's save the initial data in JSON Web Storage API (localStorage)
        stringifiedCurrentUser = JSON.stringify(currentUser);
        localStorage.setItem("Default User",stringifiedCurrentUser);
        localStorage.setItem("todosIdCounter",todosIdCounter);
        localStorage.setItem("projectsIdCounter",projectsIdCounter);
        localStorage.setItem("usersIdCounter",usersIdCounter);
    }

    return {
        createProjectForCurrentUser,
        createTodoInCurrentProject,
        createUser,
        refreshProjects,
        deleteProjectFromCurrentUser,
        getProjectInfo,
        getTodosForThisProject,
        updateTodoState,
        deleteTodoFromCurrentUser,
        completeAllTodos,
        deleteAllTodos,
        getTodoInfo,
        editTodo,
        SaveInLocalStorage,
        refreshTodos
    }
})();

// Displaying main interface
view.loadMainUI();

if (stringifiedCurrentUser != null) {
    const deserializedCurrentUser = JSON.parse(stringifiedCurrentUser, function (key,value) {
        if (key == "dueDate") {
            return new Date(value);
        } else {
            return value;
        }        
    });

    currentUser = User(deserializedCurrentUser.id,deserializedCurrentUser.name,deserializedCurrentUser.avatar);
    for (let i = 0; i < deserializedCurrentUser.projects.length; i++) {
        const deserializedProject = deserializedCurrentUser.projects[i];
        controller.createProjectForCurrentUser(deserializedProject.id,deserializedProject.title,
            deserializedProject.description,deserializedProject.dueDate);
            currentProject = deserializedProject.id;
        for (let j = 0; j < deserializedProject.todos.length; j++) {
            const deserializedTodo = deserializedProject.todos[j];
            controller.createTodoInCurrentProject(deserializedTodo.id,deserializedTodo.title,
                deserializedTodo.description,deserializedTodo.dueDate,deserializedTodo.priority);
        }
    }
    // Let's reasign currentProject to Default Project value
    currentProject = 1;
    controller.refreshTodos(currentUser.getProject(currentProject));
} else {
    // Let's create a new user and assign it to current User using the App
    currentUser = controller.createUser("Veregorn",Avatar);

    // Let's create some dates to use for projects and todos
    const date1 = new Date(2022, 8, 22);
    const date2 = new Date(2022, 8, 5);
    const date3 = new Date(2022, 11, 31);
    const date4 = new Date(2023, 0, 1);

    // Now let's create some projects
    controller.createProjectForCurrentUser(projectsIdCounter,"Default Project","This is the project by default. New TODOs go inside this project if no other is specified.",date3);
    projectsIdCounter++;

    // I need some todos (these are added to current project, 'defProject' by default)
    controller.createTodoInCurrentProject(todosIdCounter,"Do the housework","I'm todo number 1",date1,"high");
    todosIdCounter++;
    controller.createTodoInCurrentProject(todosIdCounter,"Buy potatoes at the supermarket","I'm todo number 2",date2,"low");
    todosIdCounter++;
    controller.createTodoInCurrentProject(todosIdCounter,"todo3","I'm todo number 3",date1,"high");
    todosIdCounter++;
    controller.createTodoInCurrentProject(todosIdCounter,"Go to The Box and take my CrossFit class, paying current month and buying the new team shorts","I'm todo number 4",date2,"low");
    todosIdCounter++;

    controller.createProjectForCurrentUser(projectsIdCounter,"Another Project","This is project number 2",date4);
    projectsIdCounter++;
    controller.createProjectForCurrentUser(projectsIdCounter,"Develop a web3 App","This is project number 3",date4);
    projectsIdCounter++;
    controller.createProjectForCurrentUser(projectsIdCounter,"Learn how to cook a Spanish Omelette","This is the project number 4",date4);
    projectsIdCounter++;

    // We need to save initial App status in localStorage
    controller.SaveInLocalStorage();
}

// Displaying another required elements
view.displayUserInfo(currentUser.getAvatar(),currentUser.getName());
view.displayProjectInfo(currentUser.getProject(1).getTitle(),currentUser.getProject(1).getDescription(),currentUser.getProject(1).getDueDate());
view.displayNewTodoPopup();
view.displayNewProjectPopup();
view.displayEditTodoPopup();