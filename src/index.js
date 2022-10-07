import './styles/global.css';
import {Project, Todo, User} from './model.js';
import {view} from './view.js';
import Avatar from './assets/icons/monkey.svg';

// Three global variables needed to control ids for todos, projects and users
let todosIdCounter = 1;
let projectsIdCounter = 1;
let usersIdCounter = 1;

// One global variable to control who is the user that control the IA
// at the moment
let currentUser = User();

// One global variable to control what project user is working in
// By default is number 1 (the ID of the default project)
let currentProject = 1;

// A module for the controller (App logic)
export let controller = (function() {
    'use strict';

    function createProjectForCurrentUser(title,desc,date) {
        const project = Project(projectsIdCounter,title,desc,date);
        projectsIdCounter++;
        currentUser.addProject(project);
        refreshProjects(currentUser);
        return project;
    }

    function createTodoInCurrentProject(title,desc,date,priority) {
        const todo = Todo(todosIdCounter,title,desc,date,priority);
        todosIdCounter++;
        const project = currentUser.getProject(currentProject);
        project.addTodo(todo);
        refreshTodos(project);
    }

    function createUser(name,path) {
        const user = User(usersIdCounter,name,path);
        usersIdCounter++;
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
    }

    function deleteTodoFromCurrentUser(id) {
        // Retrieving project user is working in
        const project = currentUser.getProject(currentProject);

        project.deleteTodo(id);

        // Now I need to refresh todos in DOM
        view.removeTodosFromDom();
        getTodosForThisProject(currentProject);
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
        completeAllTodos
    }
})();

// Displaying main interface
view.loadMainUI();

// Let's create a new user and assign it to current User using the App
currentUser = controller.createUser("Veregorn",Avatar);

// Let's create some dates to use for projects and todos
const date1 = new Date(2022, 8, 22);
const date2 = new Date(2022, 8, 5);
const date3 = new Date(2022, 11, 31);
const date4 = new Date(2023, 0, 1);

// Now let's create some projects
const defProject = controller.createProjectForCurrentUser("Default Project","This is the project by default. New TODOs go inside this project if no other is specified.",date3);

// I need some todos (these are added to current project, 'defProject' by default)
controller.createTodoInCurrentProject("Do the housework","I'm todo number 1",date1,"high");
controller.createTodoInCurrentProject("Buy potatoes at the supermarket","I'm todo number 2",date2,"low");
controller.createTodoInCurrentProject("todo3","I'm todo number 3",date1,"high");
controller.createTodoInCurrentProject("Go to The Box and take my CrossFit class, paying current month and buying the new team shorts","I'm todo number 4",date2,"low");

const anotherProject = controller.createProjectForCurrentUser("Another Project","This is the project number 2",date4);
const project3 = controller.createProjectForCurrentUser("Develop a web3 App","This is the project number 3",date4);
const project4 = controller.createProjectForCurrentUser("Learn how to cook a Spanish Omelette","This is the project number 4",date4);

view.displayUserInfo(currentUser.getAvatar(),currentUser.getName());
view.displayProjectInfo(defProject.getTitle(),defProject.getDescription(),defProject.getDueDate());

view.displayTodosPopup();
view.displayProjectsPopup();