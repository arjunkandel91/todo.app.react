import { ref } from "vue";
import Storage from "./Storage";

// the todo list constant which sets data initially from the Local Storage
// it is reactive data and will modified in other actions
export const TodoList = ref(Storage.get());

/**
 * This function show/hide toast notification on every action on the app
 * like new task added, updated, deleted etc
 * @param {Object} notify (ref) data
 * @param {String} content message to show on the notification
 * 
*/

export const NotifyPop = (notify, content = "Task Updated!") => {
    notify.value.content = content;
    notify.value.show = true;

    setTimeout(() => notify.value.show = false, 2000);
};

/**
 * This function generates a unique ID for the to-do list.
 * @returns The newly generated unique ID, which is the incremented value of the highest occurring ID
*/

export const TodoUniqueId = () => {
    let unique = 1;
    TodoList.value.forEach(t => {
        if (t.id >= unique) unique = t.id + 1;
    });

    return unique;
};

/**
 * This function searches the entire to-do list by checking the search keyword against the to-do title. 
 * If no match is found, it sets the hide property to true. 
 * As a result, only items with hide: false will be displayed. 
 * This behavior is bound within the TodoCard component.
 * @param {String} keyword typed on the search input field
 * 
 */
export const SearchTodoList = (keyword) => {
    TodoList.value.map(t => {
        if (t.title.toLowerCase().includes(keyword.toLowerCase())) t.hide = false;
        else t.hide = true;
        return t;
    });
};

/**
 * This function will filter Todo list with the following types:
 * title: sort in ascending order with todo title
 * date: recently added todos
 * completed: completed todo first and incomplete
 * incomplete: default filter type it will sort incomplete task first and completed after
 * @param {String} type title || date || completed || incomplete (default)
 */

export const FilterTodo = (type) => {
    switch (type) {
        case 'title':
            FilterTodoTitle();
            break;
        
        case 'date':
            FilterTodoDate();
            break;
        
        case 'completed':
            FilterComplete(type);
            break;
        
        default:
            FilterComplete('incomplete');
    }
};

// this function sort todo list in ascending order using todo title
const FilterTodoTitle = () => {
    TodoList.value.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        else if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        else return 0;
    });
}

// this function will sort todo list id in descending order 
// i.e. sorted as recently created
const FilterTodoDate = () => {
    TodoList.value.sort((a, b) => {
        if (a.id > b.id) return -1;
        else if (a.id < b.id) return 1;
        else return 0;
    });
};

/**
 * This function filter todo list in 2 ways, completed first or incomplete first as requested
 * @param {String} type incomplete || completed
 * this will make slice of 2 different array which contain completed and incomplete todos
 * after that it will concat how it is requested
 */
const FilterComplete = (type) => {
    let slice1 = [] 
    let slice2 = [];
    TodoList.value.forEach(t => {
        if (!t.completed) slice1.push(t);
        else slice2.push(t);
    });

    TodoList.value = (type == 'incomplete') ? slice1.concat(slice2) : slice2.concat(slice1);
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