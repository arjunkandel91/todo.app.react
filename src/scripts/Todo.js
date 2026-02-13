/**
 * This function show/hide toast notification on every action on the app
 * like new task added, updated, deleted etc
 * @param {Object} state state data
 * @param {Function} setState setState function
 * @param {String} content message to show on the notification
 * 
*/
export const NotifyPop = (state, setState, content = "Task Updated!") => {
    setState({
        show: true,
        content: content
    });

    setTimeout(() => setState({...state, show: false}), 2000);
};

/**
 * This function generates a unique ID for the to-do list.
 * @param {Array of Objects} TodoList array of all the tasks
 * @returns The newly generated unique ID, which is the incremented value of the highest occurring ID
*/

export const TodoUniqueId = (state) => {
    let unique = 1;
    state.forEach(t => {
        if (t.id >= unique) unique = t.id + 1;
    });

    return unique;
};

/**
 * This function searches the entire to-do list by checking the search keyword against the to-do title. 
 * If no match is found, it sets the hide property to true. 
 * As a result, only items with hide: false will be displayed. 
 * This behavior is bound within the TodoCard component.
 * @param {Array of Objects} state TodoList state array of objects variable
 * @param {Function} setState setTodoList state function
 * @param {String} keyword typed on the search input field
 * 
 */
export const SearchTodoList = (state, setState, keyword) => {
    const updated = state.map(s => {
        if (s.title.toLowerCase().includes(keyword.toLowerCase())) s.hide = false;
        else s.hide = true;
        return s;
    })
    setState(updated);
};

/**
 * This function will filter Todo list with the following types:
 * title: sort in ascending order with todo title
 * date: recently added todos
 * completed: completed todo first and incomplete
 * incomplete: default filter type it will sort incomplete task first and completed after
 * @param {String} type title || date || completed || incomplete (default)
 * @param {Array} state TodoList state variable
 * @param {Function} setState setTodoList state function to update task list
 */

export const FilterTodo = (type, state, setState) => {
    switch (type) {
        case 'title':
            FilterTodoTitle(state, setState);
            break;
        
        case 'date':
            FilterTodoDate(state, setState);
            break;
        
        case 'completed':
            FilterComplete(type, state, setState);
            break;
        
        default:
            FilterComplete('incomplete', state, setState);
    }
};

// this function sort todo list in ascending order using todo title
const FilterTodoTitle = (state, setState) => {
    const sorted = [...state].sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        else if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        else return 0;
    });setState(sorted);
}

// this function will sort todo list id in descending order 
// i.e. sorted as recently created
const FilterTodoDate = (state, setState) => {
    const sorted = [...state].sort((a, b) => {
        if (a.id > b.id) return -1;
        else if (a.id < b.id) return 1;
        else return 0;
    });setState(sorted);
};

/**
 * This function filter todo list in 2 ways, completed first or incomplete first as requested
 * @param {String} type incomplete || completed
 * @param {Array} state TodoList state variable
 * @param {Function} setState setTodoList state function to update todo list
 * this will make slice of 2 different array which contain completed and incomplete todos
 * after that it will concat how it is requested
 */
const FilterComplete = (type, state, setState) => {
    let slice1 = [] 
    let slice2 = [];
    state.forEach(t => {
        if (!t.completed) slice1.push(t);
        else slice2.push(t);
    });

    if (type == 'incomplete') setState(slice1.concat(slice2));
    else setState(slice2.concat(slice1));
};

// all filter settings for filter context menu in the app
export const Filters = [
    {
            id: 1,
            name: 'Sort by',
            type: 'none',
            active: false
        },
        {
            id: 2,
            name: 'Todo Title',
            type: 'title',
            active: false
        },
        {
            id: 3,
            name: 'Incomplete (default)',
            type: 'incomplete',
            active: true
        },
        {
            id: 4,
            name: 'Completed',
            type: 'completed',
            active: false
        },
        {
            id: 5,
            name: 'Recently created',
            type: 'date',
            active: false
        }
];