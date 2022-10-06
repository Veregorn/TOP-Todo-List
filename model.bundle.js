"use strict";
(self["webpackChunktop_todo_list"] = self["webpackChunktop_todo_list"] || []).push([["model"],{

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/compareAsc/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/compareAsc/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compareAsc)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */

function compareAsc(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/endOfDay/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/endOfDay/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ endOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */

function endOfDay(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/endOfToday/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/endOfToday/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ endOfToday)
/* harmony export */ });
/* harmony import */ var _endOfDay_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../endOfDay/index.js */ "./node_modules/date-fns/esm/endOfDay/index.js");

/**
 * @name endOfToday
 * @category Day Helpers
 * @summary Return the end of today.
 * @pure false
 *
 * @description
 * Return the end of today.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @returns {Date} the end of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfToday()
 * //=> Mon Oct 6 2014 23:59:59.999
 */

function endOfToday() {
  return (0,_endOfDay_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Date.now());
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "Todo": () => (/* binding */ Todo),
/* harmony export */   "User": () => (/* binding */ User)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/compareAsc/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/endOfToday/index.js");


// Factory (multiple instances) for todos
const Todo = (id,title,description,dueDate,priority) => {
    
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
        const result = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])(_dueDate,(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])());
        
        if (result === 1 || result === 0) {
            return false;
        } else if (result === -1) {
            return true;
        }
    };

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
        isOverdued,
        complete,
        unComplete
    };
};

// Factory for Projects
const Project = (id,title,description,dueDate) => {
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
        getTodoByOrder
    };
};

// Factory for users
const User = (id,name,path) => {
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

    return {
        getId,
        setName,
        getName,
        setAvatar,
        getAvatar,
        getProjects,
        addProject,
        deleteProject,
        getProject
    }
};

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/model.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QiwrQkFBK0I7QUFDL0I7QUFDQSx3QkFBd0I7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3AtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9jb21wYXJlQXNjL2luZGV4LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2VuZE9mRGF5L2luZGV4LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2VuZE9mVG9kYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9wLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vdG9EYXRlL2luZGV4LmpzIiwid2VicGFjazovL3RvcC10b2RvLWxpc3QvLi9zcmMvbW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWlyZWRBcmdzKHJlcXVpcmVkLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihyZXF1aXJlZCArICcgYXJndW1lbnQnICsgKHJlcXVpcmVkID4gMSA/ICdzJyA6ICcnKSArICcgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmdzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBjb21wYXJlQXNjXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIC0xLCAwIG9yIDEuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBvciAwIGlmIGRhdGVzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgcmVzdWx0IG9mIHRoZSBjb21wYXJpc29uXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbXBhcmUgMTEgRmVicnVhcnkgMTk4NyBhbmQgMTAgSnVseSAxOTg5OlxuICogY29uc3QgcmVzdWx0ID0gY29tcGFyZUFzYyhuZXcgRGF0ZSgxOTg3LCAxLCAxMSksIG5ldyBEYXRlKDE5ODksIDYsIDEwKSlcbiAqIC8vPT4gLTFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU29ydCB0aGUgYXJyYXkgb2YgZGF0ZXM6XG4gKiBjb25zdCByZXN1bHQgPSBbXG4gKiAgIG5ldyBEYXRlKDE5OTUsIDYsIDIpLFxuICogICBuZXcgRGF0ZSgxOTg3LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDE5ODksIDYsIDEwKVxuICogXS5zb3J0KGNvbXBhcmVBc2MpXG4gKiAvLz0+IFtcbiAqIC8vICAgV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwLFxuICogLy8gICBNb24gSnVsIDEwIDE5ODkgMDA6MDA6MDAsXG4gKiAvLyAgIFN1biBKdWwgMDIgMTk5NSAwMDowMDowMFxuICogLy8gXVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBhcmVBc2MoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlTGVmdCA9IHRvRGF0ZShkaXJ0eURhdGVMZWZ0KTtcbiAgdmFyIGRhdGVSaWdodCA9IHRvRGF0ZShkaXJ0eURhdGVSaWdodCk7XG4gIHZhciBkaWZmID0gZGF0ZUxlZnQuZ2V0VGltZSgpIC0gZGF0ZVJpZ2h0LmdldFRpbWUoKTtcblxuICBpZiAoZGlmZiA8IDApIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcbiAgICByZXR1cm4gMTsgLy8gUmV0dXJuIDAgaWYgZGlmZiBpcyAwOyByZXR1cm4gTmFOIGlmIGRpZmYgaXMgTmFOXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRpZmY7XG4gIH1cbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGVuZE9mRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiBhIGRheVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBlbmQgb2YgYSBkYXkgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBlbmRPZkRheShuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMjM6NTk6NTkuOTk5XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5kT2ZEYXkoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICBkYXRlLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCBlbmRPZkRheSBmcm9tIFwiLi4vZW5kT2ZEYXkvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgZW5kT2ZUb2RheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGVuZCBvZiB0b2RheS5cbiAqIEBwdXJlIGZhbHNlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiB0b2RheS5cbiAqXG4gKiA+IOKaoO+4jyBQbGVhc2Ugbm90ZSB0aGF0IHRoaXMgZnVuY3Rpb24gaXMgbm90IHByZXNlbnQgaW4gdGhlIEZQIHN1Ym1vZHVsZSBhc1xuICogPiBpdCB1c2VzIGBEYXRlLm5vdygpYCBpbnRlcm5hbGx5IGhlbmNlIGltcHVyZSBhbmQgY2FuJ3QgYmUgc2FmZWx5IGN1cnJpZWQuXG4gKlxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgdG9kYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQ6XG4gKiBjb25zdCByZXN1bHQgPSBlbmRPZlRvZGF5KClcbiAqIC8vPT4gTW9uIE9jdCA2IDIwMTQgMjM6NTk6NTkuOTk5XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5kT2ZUb2RheSgpIHtcbiAgcmV0dXJuIGVuZE9mRGF5KERhdGUubm93KCkpO1xufSIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7IC8vIENsb25lIHRoZSBkYXRlXG5cbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fCBfdHlwZW9mKGFyZ3VtZW50KSA9PT0gJ29iamVjdCcgJiYgYXJnU3RyID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQuZ2V0VGltZSgpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnQgPT09ICdudW1iZXInIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgTnVtYmVyXScpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIGlmICgodHlwZW9mIGFyZ3VtZW50ID09PSAnc3RyaW5nJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IFN0cmluZ10nKSAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXCJTdGFydGluZyB3aXRoIHYyLjAuMC1iZXRhLjEgZGF0ZS1mbnMgZG9lc24ndCBhY2NlcHQgc3RyaW5ncyBhcyBkYXRlIGFyZ3VtZW50cy4gUGxlYXNlIHVzZSBgcGFyc2VJU09gIHRvIHBhcnNlIHN0cmluZ3MuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI3N0cmluZy1hcmd1bWVudHNcIik7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cbiAgICAgIGNvbnNvbGUud2FybihuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cbn0iLCJpbXBvcnQgeyBjb21wYXJlQXNjLCBlbmRPZlRvZGF5LCBwYXJzZUlTTyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG4vLyBGYWN0b3J5IChtdWx0aXBsZSBpbnN0YW5jZXMpIGZvciB0b2Rvc1xuZXhwb3J0IGNvbnN0IFRvZG8gPSAoaWQsdGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eSkgPT4ge1xuICAgIFxuICAgIC8vIFBST1BFUlRJRVNcbiAgICAvLyBGb3IgY29udmVudGlvbiwgSSBhZGQgYSAnXycgYmVmb3JlIHRoZSBuYW1lIG9mIGV2ZXJ5IHByaXZhdGUgcHJvcGVydHlcbiAgICBsZXQgX2lkID0gaWQ7XG4gICAgbGV0IF90aXRsZSA9IHRpdGxlO1xuICAgIGxldCBfZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICBsZXQgX2R1ZURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIF9kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICBsZXQgX3ByaW9yaXR5ID0gcHJpb3JpdHk7IC8vICdsb3cnIG9yICdoaWdoJ1xuICAgIGxldCBfY29tcGxldGVkID0gZmFsc2U7XG5cbiAgICAvLyBNRVRIT0RTXG4gICAgY29uc3QgZ2V0SWQgPSAoKSA9PiBfaWQ7XG5cbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IF90aXRsZTtcblxuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gX2Rlc2NyaXB0aW9uO1xuXG4gICAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IF9kdWVEYXRlO1xuXG4gICAgY29uc3QgZ2V0UHJpb3JpdHkgPSAoKSA9PiBfcHJpb3JpdHk7XG5cbiAgICBjb25zdCBzZXRUaXRsZSA9ICh0aXRsZSkgPT4ge1xuICAgICAgICBpZiAodGl0bGUgIT0gXCJcIikge1xuICAgICAgICAgICAgX3RpdGxlID0gdGl0bGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGVydChcIlRpdGxlIGNhbid0IGJlIGVtcHR5XCIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHNldERlc2NyaXB0aW9uID0gKGRlc2NyaXB0aW9uKSA9PiBfZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcblxuICAgIGNvbnN0IHNldER1ZURhdGUgPSAoZHVlRGF0ZSkgPT4gX2R1ZURhdGUgPSBkdWVEYXRlO1xuXG4gICAgY29uc3Qgc2V0UHJpb3JpdHkgPSAocHJpb3JpdHkpID0+IHtcbiAgICAgICAgaWYgKHByaW9yaXR5ID09IFwibG93XCIgfHwgcHJpb3JpdHkgPT0gXCJoaWdoXCIpIHtcbiAgICAgICAgICAgIF9wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoXCJJbnZhbGlkICdwcmlvcml0eScgdmFsdWUhIChtdXN0IGJlICdsb3cnIG9yICdoaWdoJylcIik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaXNDb21wbGV0ZWQgPSAoKSA9PiBfY29tcGxldGVkO1xuXG4gICAgY29uc3QgaXNPdmVyZHVlZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gY29tcGFyZUFzYyhfZHVlRGF0ZSxlbmRPZlRvZGF5KCkpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gMSB8fCByZXN1bHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IF9jb21wbGV0ZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgdW5Db21wbGV0ZSA9ICgpID0+IF9jb21wbGV0ZWQgPSBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldElkLFxuICAgICAgICBnZXRUaXRsZSxcbiAgICAgICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgICAgIGdldER1ZURhdGUsXG4gICAgICAgIGdldFByaW9yaXR5LFxuICAgICAgICBzZXRUaXRsZSxcbiAgICAgICAgc2V0RGVzY3JpcHRpb24sXG4gICAgICAgIHNldER1ZURhdGUsXG4gICAgICAgIHNldFByaW9yaXR5LFxuICAgICAgICBpc0NvbXBsZXRlZCxcbiAgICAgICAgaXNPdmVyZHVlZCxcbiAgICAgICAgY29tcGxldGUsXG4gICAgICAgIHVuQ29tcGxldGVcbiAgICB9O1xufTtcblxuLy8gRmFjdG9yeSBmb3IgUHJvamVjdHNcbmV4cG9ydCBjb25zdCBQcm9qZWN0ID0gKGlkLHRpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUpID0+IHtcbiAgICAvLyBQUk9QRVJUSUVTXG4gICAgbGV0IF9pZCA9IGlkO1xuICAgIGxldCBfdGl0bGUgPSB0aXRsZTtcbiAgICBsZXQgX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgbGV0IF9kdWVEYXRlID0gbmV3IERhdGUoKTtcbiAgICBfZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgbGV0IF9jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICBsZXQgX292ZXJkdWUgPSBmYWxzZTtcbiAgICBsZXQgX3RvZG9zID0gW107IC8vIEFycmF5IG9mIFRvZG8gRmFjdG9yeSB0eXBlXG5cbiAgICAvLyBNRVRIT0RTXG4gICAgY29uc3QgZ2V0SWQgPSAoKSA9PiBfaWQ7XG5cbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IF90aXRsZTtcblxuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gX2Rlc2NyaXB0aW9uO1xuXG4gICAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IF9kdWVEYXRlO1xuXG4gICAgY29uc3Qgc2V0VGl0bGUgPSAodGl0bGUpID0+IHtcbiAgICAgICAgaWYgKHRpdGxlICE9IFwiXCIpIHtcbiAgICAgICAgICAgIF90aXRsZSA9IHRpdGxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoXCJUaXRsZSBjYW4ndCBiZSBlbXB0eVwiKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChkZXNjcmlwdGlvbikgPT4gX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG5cbiAgICBjb25zdCBzZXREdWVEYXRlID0gKGR1ZURhdGUpID0+IF9kdWVEYXRlID0gZHVlRGF0ZTtcblxuICAgIGNvbnN0IGlzQ29tcGxldGVkID0gKCkgPT4gX2NvbXBsZXRlZDtcblxuICAgIGNvbnN0IGlzT3ZlcmR1ZSA9ICgpID0+IF9vdmVyZHVlO1xuXG4gICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiBfY29tcGxldGVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHVuQ29tcGxldGUgPSAoKSA9PiBfY29tcGxldGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBhZGRUb2RvID0gKHRvZG8pID0+IF90b2Rvcy5wdXNoKHRvZG8pO1xuXG4gICAgY29uc3QgZGVsZXRlVG9kbyA9IChpZCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF90b2Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IF90b2Rvc1tpXTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmdldElkKCkgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgX3RvZG9zLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGdldFRvZG9CeUlkID0gKGlkKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3RvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gX3RvZG9zW2ldO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuZ2V0SWQoKSA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBnZXROdW1iZXJPZlRvZG9zID0gKCkgPT4gX3RvZG9zLmxlbmd0aDtcblxuICAgIGNvbnN0IGdldFRvZG9CeU9yZGVyID0gKGkpID0+IHtcbiAgICAgICAgcmV0dXJuIF90b2Rvc1tpXTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0SWQsXG4gICAgICAgIGdldFRpdGxlLFxuICAgICAgICBnZXREZXNjcmlwdGlvbixcbiAgICAgICAgZ2V0RHVlRGF0ZSxcbiAgICAgICAgc2V0VGl0bGUsXG4gICAgICAgIHNldERlc2NyaXB0aW9uLFxuICAgICAgICBzZXREdWVEYXRlLFxuICAgICAgICBpc0NvbXBsZXRlZCxcbiAgICAgICAgaXNPdmVyZHVlLFxuICAgICAgICBjb21wbGV0ZSxcbiAgICAgICAgdW5Db21wbGV0ZSxcbiAgICAgICAgYWRkVG9kbyxcbiAgICAgICAgZGVsZXRlVG9kbyxcbiAgICAgICAgZ2V0VG9kb0J5SWQsXG4gICAgICAgIGdldE51bWJlck9mVG9kb3MsXG4gICAgICAgIGdldFRvZG9CeU9yZGVyXG4gICAgfTtcbn07XG5cbi8vIEZhY3RvcnkgZm9yIHVzZXJzXG5leHBvcnQgY29uc3QgVXNlciA9IChpZCxuYW1lLHBhdGgpID0+IHtcbiAgICAvLyBQUk9QRVJUSUVTXG4gICAgbGV0IF9pZCA9IGlkO1xuICAgIGxldCBfbmFtZSA9IG5hbWU7IC8vIFVzZXIgbmFtZVxuICAgIGxldCBfYXZhdGFyID0gbmV3IEltYWdlKCk7IC8vIFVzZXIgYXZhdGFyXG4gICAgX2F2YXRhci5zcmMgPSBwYXRoO1xuICAgIGxldCBfcHJvamVjdHMgPSBbXTsgLy8gVGhlIHVzZXIgaGFzIGFuIGFycmF5IG9mIFByb2plY3RzXG5cbiAgICBmdW5jdGlvbiBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIF9pZDtcbiAgICB9XG4gICAgXG4gICAgLy8gV2UgY2FuIGNoYW5nZSB1c2VyJ3MgbmFtZVxuICAgIGZ1bmN0aW9uIHNldE5hbWUobmFtZSkge1xuICAgICAgICBfbmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIF9uYW1lO1xuICAgIH1cblxuICAgIC8vIFdlIGNhbiBjaGFuZ2UgdXNlciBhdmF0YXJcbiAgICBmdW5jdGlvbiBzZXRBdmF0YXIocGF0aCkge1xuICAgICAgICBfYXZhdGFyLnNyYyA9IHBhdGg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QXZhdGFyKCkge1xuICAgICAgICByZXR1cm4gX2F2YXRhcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9qZWN0cygpIHtcbiAgICAgICAgcmV0dXJuIF9wcm9qZWN0cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgX3Byb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpZCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IF9wcm9qZWN0c1tpXTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmdldElkKCkgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgX3Byb2plY3RzLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdChpZCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IF9wcm9qZWN0c1tpXTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmdldElkKCkgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJZCxcbiAgICAgICAgc2V0TmFtZSxcbiAgICAgICAgZ2V0TmFtZSxcbiAgICAgICAgc2V0QXZhdGFyLFxuICAgICAgICBnZXRBdmF0YXIsXG4gICAgICAgIGdldFByb2plY3RzLFxuICAgICAgICBhZGRQcm9qZWN0LFxuICAgICAgICBkZWxldGVQcm9qZWN0LFxuICAgICAgICBnZXRQcm9qZWN0XG4gICAgfVxufTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=