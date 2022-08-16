// Factory (multiple instances) for todos
export const Todo = (id,title,description,dueDate,priority) => {
    
    // PROPERTIES
    // For convention, I add a '_' before the name of every private property
    let _id = id;
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority; // 'low' or 'high'
    let _completed = false;
    let _overdue = false;

    // METHODS
    const getId = () => _id;

    const getTitle = () => _title;

    const getDescription = () => _description;

    const getDueDate = () => _dueDate;

    const getPriority = () => _priority;

    const setTitle = (title) => {
        if (title != "") {
            _title = title;
        } else {
            alert("Title can't be empty");
        }
    };

    const setDescription = (description) => _description = description;

    const setDueDate = (dueDate) => _dueDate = dueDate;

    const setPriority = (priority) => {
        if (priority == "low" || priority == "high") {
            _priority = priority;
        } else {
            alert("Invalid 'priority' value! (must be 'low' or 'high')");
        }
    };

    const isCompleted = () => _completed;

    const isOverdue = () => _overdue;

    const complete = () => _completed = true;

    const unComplete = () => _completed = false;

    return {
        getId,
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        isCompleted,
        isOverdue,
        complete,
        unComplete
    };
};

// Factory for Projects
export const Project = (id,title,description,dueDate) => {
    // PROPERTIES
    let _id = id;
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _completed = false;
    let _overdue = false;
    let _todos = []; // Array of Todo Factory type

    // METHODS
    const getId = () => _id;

    const getTitle = () => _title;

    const getDescription = () => _description;

    const getDueDate = () => _dueDate;

    const setTitle = (title) => {
        if (title != "") {
            _title = title;
        } else {
            alert("Title can't be empty");
        }
    };

    const setDescription = (description) => _description = description;

    const setDueDate = (dueDate) => _dueDate = dueDate;

    const isCompleted = () => _completed;

    const isOverdue = () => _overdue;

    const complete = () => _completed = true;

    const unComplete = () => _completed = false;

    const addTodo = (todo) => _todos.push(todo);

    const deleteTodo = (id) => {
        for (let i = 0; i < _todos.length; i++) {
            const element = _todos[i];
            if (element.getId() === id) {
                _todos.splice(i,1);
            }
        }
    };

    return {
        getId,
        getTitle,
        getDescription,
        getDueDate,
        setTitle,
        setDescription,
        setDueDate,
        isCompleted,
        isOverdue,
        complete,
        unComplete,
        addTodo,
        deleteTodo
    };
};