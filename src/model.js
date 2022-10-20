import { compareAsc, endOfToday, parseISO } from "date-fns";

// JSON.pruned : a function to stringify any object without overflow
// example : var json = JSON.pruned({a:'e', c:[1,2,{d:{e:42, f:'deep'}}]})
// two additional optional parameters :
//   - the maximal depth (default : 6)
//   - the maximal length of arrays (default : 50)
// GitHub : https://github.com/Canop/JSON.prune
// This is based on Douglas Crockford's code ( https://github.com/douglascrockford/JSON-js/blob/master/json2.js )
(function () {
    'use strict';

    var DEFAULT_MAX_DEPTH = 6;
    var DEFAULT_ARRAY_MAX_LENGTH = 50;
    var seen; // Same variable used for all stringifications

    Date.prototype.toPrunedJSON = Date.prototype.toJSON;
    String.prototype.toPrunedJSON = String.prototype.toJSON;

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder, depthDecr, arrayMaxLength) {
        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            partial,
            value = holder[key];
        if (value && typeof value === 'object' && typeof value.toPrunedJSON === 'function') {
            value = value.toPrunedJSON(key);
        }

        switch (typeof value) {
        case 'string':
            return quote(value);
        case 'number':
            return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
            return String(value);
        case 'object':
            if (!value) {
                return 'null';
            }
            if (depthDecr<=0 || seen.indexOf(value)!==-1) {
                return '"-pruned-"';
            }
            seen.push(value);
            partial = [];
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = Math.min(value.length, arrayMaxLength);
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value, depthDecr-1, arrayMaxLength) || 'null';
                }
                v = partial.length === 0
                    ? '[]'
                    : '[' + partial.join(',') + ']';
                return v;
            }
            for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                    try {
                        v = str(k, value, depthDecr-1, arrayMaxLength);
                        if (v) partial.push(quote(k) + ':' + v);
                    } catch (e) { 
                        // this try/catch due to some "Accessing selectionEnd on an input element that cannot have a selection." on Chrome
                    }
                }
            }
            v = partial.length === 0
                ? '{}'
                : '{' + partial.join(',') + '}';
            return v;
        }
    }

    JSON.pruned = function (value, depthDecr, arrayMaxLength) {
        seen = [];
        depthDecr = depthDecr || DEFAULT_MAX_DEPTH;
        arrayMaxLength = arrayMaxLength || DEFAULT_ARRAY_MAX_LENGTH;
        return str('', {'': value}, depthDecr, arrayMaxLength);
    };

}());

// Factory (multiple instances) for todos
export const Todo = (id,title,description,dueDate,priority) => {
    
    // PROPERTIES
    // For convention, I add a '_' before the name of every private property
    let _id = id;
    let _title = title;
    let _description = description;
    let _dueDate = new Date();
    _dueDate = dueDate;
    let _priority = priority; // 'low' or 'high'
    let _completed = false;

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

    const isOverdued = () => {
        const result = compareAsc(_dueDate,endOfToday());
        
        if (result === 1 || result === 0) {
            return false;
        } else if (result === -1) {
            return true;
        }
    };

    const complete = () => _completed = true;

    const unComplete = () => _completed = false;

    const toJSON = () => {
        return {
            id: _id,
            title: _title,
            description: _description,
            dueDate: _dueDate,
            priority: _priority,
            completed: _completed
        };
    };

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
        isOverdued,
        complete,
        unComplete,
        toJSON
    };
};

// Factory for Projects
export const Project = (id,title,description,dueDate) => {
    // PROPERTIES
    let _id = id;
    let _title = title;
    let _description = description;
    let _dueDate = new Date();
    _dueDate = dueDate;
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

    const getTodoById = (id) => {
        for (let i = 0; i < _todos.length; i++) {
            const element = _todos[i];
            if (element.getId() === id) {
                return element;
            }
        }
    };

    const getNumberOfTodos = () => _todos.length;

    const getTodoByOrder = (i) => {
        return _todos[i];
    };

    const toJSON = () => {
        return {
            id: _id,
            title: _title,
            description: _description,
            dueDate: _dueDate,
            completed: _completed,
            overdue: _overdue,
            todos: _todos
        };
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
        deleteTodo,
        getTodoById,
        getNumberOfTodos,
        getTodoByOrder,
        toJSON
    };
};

// Factory for users
export const User = (id,name,path) => {
    // PROPERTIES
    let _id = id;
    let _name = name; // User name
    let _avatar = new Image(); // User avatar
    _avatar.src = path;
    let _projects = []; // The user has an array of Projects

    function getId() {
        return _id;
    }
    
    // We can change user's name
    function setName(name) {
        _name = name;
    }

    function getName() {
        return _name;
    }

    // We can change user avatar
    function setAvatar(path) {
        _avatar.src = path;
    }

    function getAvatar() {
        return _avatar;
    }

    function getProjects() {
        return _projects;
    }

    function addProject(project) {
        _projects.push(project);
    }

    function deleteProject(id) {
        for (let i = 0; i < _projects.length; i++) {
            const element = _projects[i];
            if (element.getId() === id) {
                _projects.splice(i,1);
            }
        }
    }

    function getProject(id) {
        for (let i = 0; i < _projects.length; i++) {
            const element = _projects[i];
            if (element.getId() === id) {
                return element;
            }
        }
    }

    function toJSON() {
        return {
            id: _id,
            name: _name,
            avatar: _avatar.src,
            projects: _projects
        };
    }

    return {
        getId,
        setName,
        getName,
        setAvatar,
        getAvatar,
        getProjects,
        addProject,
        deleteProject,
        getProject,
        toJSON
    }
};