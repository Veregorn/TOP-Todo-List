import './styles/global.css';
import {Project, Todo, User} from './model.js';
import {view} from './view.js';
import Avatar from './assets/icons/monkey.svg';

const todo1 = Todo(1,"todo1","I'm todo number 1","04-08-2022","high");
const todo2 = Todo(2,"todo2","I'm todo number 2","01-09-2022","low");
const todo3 = Todo(3,"todo3","I'm todo number 3","10-09-2022","high");
// console.log(todo1.getTitle());

const defProject = Project(1,"Default Project","This is the project by default. New TODOs go inside this project if no other is specified.","01-01-2099",false,false,[]);
console.log("Default project has " + defProject.getNumberOfTodos() + " TODOs");
defProject.addTodo(todo1);
defProject.addTodo(todo2);
const retrievedTodo = defProject.getTodoById(1);
console.log(retrievedTodo.getTitle());
console.log(retrievedTodo.getDescription());
console.log("Default project has " + defProject.getNumberOfTodos() + " TODOs");
const anotherProject = Project(2,"Another Project","This is the project number 2","01-09-2022",false,false,[]);
anotherProject.addTodo(todo3);
const project3 = Project(3,"Develop a web3 App","This is the project number 3","20-09-2022",false,false,[]);
const project4 = Project(4,"Learn how to cook a Spanish Omelette","This is the project number 4","20-09-2022",false,false,[]);

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