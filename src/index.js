import './style.css';
import {Project, Todo} from './model.js';

const todo1 = Todo(1,"todo1","I'm todo number 1","04-08-2022","high");
// console.log(todo1.getTitle());

const defProject = Project(1,"Default Project","This is the project by default. New TODOs go inside this project if no other is specified.","01-01-2099",false,false,[]);
console.log("Default project has " + defProject.getNumberOfTodos() + " TODOs");
defProject.addTodo(todo1);
const retrievedTodo = defProject.getTodoById(1);
console.log(retrievedTodo.getTitle());
console.log(retrievedTodo.getDescription());
console.log("Default project has " + defProject.getNumberOfTodos() + " TODOs");
defProject.deleteTodo(1);
console.log("Default project has " + defProject.getNumberOfTodos() + " TODOs");
