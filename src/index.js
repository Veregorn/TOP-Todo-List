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

// A module for the controller (App logic)
export let controller = (function() {
    'use strict';

    function createProjectForCurrentUser(title,desc,date) {
        const project = Project(projectsIdCounter,title,desc,date);
        projectsIdCounter++;
        currentUser.addProject(project);
        return project;
    }

    function createTodo(title,desc,date,priority) {
        const todo = Todo(todosIdCounter,title,desc,date,priority);
        todosIdCounter++;
        return todo;
    }

    function createUser(name,path) {
        const user = User(usersIdCounter,name,path);
        usersIdCounter++;
        return user;
    }

    return {
        createProjectForCurrentUser,
        createTodo,
        createUser
    }
})();

// Let's create a new user and asign it to current User using the App
currentUser = controller.createUser("Veregorn",Avatar);

// Let's create some dates to use for projects and todos
const date1 = new Date(2022, 8, 22);
const date2 = new Date(2022, 8, 5);
const date3 = new Date(2022, 11, 31);
const date4 = new Date(2023, 0, 1);

// Now let's create some projects
const defProject = controller.createProjectForCurrentUser("Default Project","This is the project by default. New TODOs go inside this project if no other is specified.",date3);

// I need some todos to fill in the projects with
const todo1 = controller.createTodo("Do the housework","I'm todo number 1",date1,"high");
const todo2 = controller.createTodo("Buy potatoes at the supermarket","I'm todo number 2",date2,"low");
const todo3 = controller.createTodo("todo3","I'm todo number 3",date1,"high");
const todo4 = controller.createTodo("Go to The Box and take my CrossFit class, paying current month and buying the new team shorts","I'm todo number 4",date2,"low");
todo4.complete();

// Let's add some of out todos to the project created
defProject.addTodo(todo1);
defProject.addTodo(todo2);
defProject.addTodo(todo4);

const anotherProject = controller.createProjectForCurrentUser("Another Project","This is the project number 2",date4);
anotherProject.addTodo(todo3);
const project3 = controller.createProjectForCurrentUser("Develop a web3 App","This is the project number 3",date4);
const project4 = controller.createProjectForCurrentUser("Learn how to cook a Spanish Omelette","This is the project number 4",date4);

view.loadMainUI();

// Displaying user's projects in left menu
// First create an array with projects ids
let ids = [];
for (let i = 0; i < currentUser.getProjects().length; i++) {
    const element = currentUser.getProjects()[i];
    ids.push(element.getId());
}
// Then create another array with projects titles
let titles = [];
for (let i = 0; i < currentUser.getProjects().length; i++) {
    const element = currentUser.getProjects()[i];
    titles.push(element.getTitle());
}

view.displayProjectsMenu(ids,titles);
view.displayUserInfo(currentUser.getAvatar(),currentUser.getName());
view.displayProjectInfo(defProject.getTitle(),defProject.getDescription(),defProject.getDueDate());

// Displaying TODOs in a project
for (let i = 0; i < defProject.getNumberOfTodos(); i++) {
     const todo = defProject.getTodoByOrder(i);
     view.displayTodoInList(todo.getTitle(),todo.getDueDate(),todo.isCompleted(),todo.getPriority(),todo.isOverdued());
}

view.displayTodosPopup();
view.displayProjectsPopup();