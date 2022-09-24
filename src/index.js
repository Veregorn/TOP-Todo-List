import './styles/global.css';
import {Project, Todo, User} from './model.js';
import {view} from './view.js';
import Avatar from './assets/icons/monkey.svg';

const date1 = new Date(2022, 8, 22);
const date2 = new Date(2022, 8, 5);
const date3 = new Date(2022, 11, 31);
const date4 = new Date(2023, 0, 1);

const todo1 = Todo(1,"Do the housework","I'm todo number 1",date1,"high");
const todo2 = Todo(2,"Buy potatoes at the supermarket","I'm todo number 2",date2,"low");
const todo3 = Todo(3,"todo3","I'm todo number 3",date1,"high");
const todo4 = Todo(4,"Go to The Box and take my CrossFit class, paying current month and buying the new team shorts","I'm todo number 4",date2,"low");
todo4.complete();
// console.log(todo1.getTitle());

const defProject = Project(1,"Default Project","This is the project by default. New TODOs go inside this project if no other is specified.",date3,false,false,[]);
console.log("Default project has " + defProject.getNumberOfTodos() + " TODOs");
defProject.addTodo(todo1);
defProject.addTodo(todo2);
defProject.addTodo(todo4);
const retrievedTodo = defProject.getTodoById(1);
console.log(retrievedTodo.getTitle());
console.log(retrievedTodo.getDescription());
console.log("Default project has " + defProject.getNumberOfTodos() + " TODOs");
const anotherProject = Project(2,"Another Project","This is the project number 2",date4,false,false,[]);
anotherProject.addTodo(todo3);
const project3 = Project(3,"Develop a web3 App","This is the project number 3",date4,false,false,[]);
const project4 = Project(4,"Learn how to cook a Spanish Omelette","This is the project number 4",date4,false,false,[]);

// Let's create a new user
const user = User("Veregorn",Avatar);
console.log(user.getName());
user.addProject(defProject);
user.addProject(anotherProject);
user.addProject(project3);
user.addProject(project4);

view.loadMainUI();

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
view.displayUserInfo(user.getAvatar(),user.getName());
view.displayProjectInfo(defProject.getTitle(),defProject.getDescription(),defProject.getDueDate());

// Displaying TODOs in a project
for (let i = 0; i < defProject.getNumberOfTodos(); i++) {
     const todo = defProject.getTodoByOrder(i);
     view.displayTodoInList(todo.getTitle(),todo.getDueDate(),todo.isCompleted(),todo.getPriority(),todo.isOverdued());
}

view.displayTodosPopup();
view.displayProjectsPopup();

// A module for the controller (App logic)
export let controller = (function() {
    'use strict';

    function createNewProject() {
        alert("All the data is good!");
    }

    return {
        createNewProject
    }
})();