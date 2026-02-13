const LocalStorage = window.localStorage;
const key = "todo-list";

/**
 * This function store data in string to local storage
 * @param {Array} data contains the array of all todo list
 * @returns {Boolean} true if not error storing data 
 */
const store = (data) => {
    try {
        LocalStorage.setItem(key, JSON.stringify(data));
        return true;
    }catch (e) {
        return false;
    }
}

/**
 * This function retrieve todo list with the key 'todo-list'
 * @returns {Array} return empty array if data not found in local storage otherwise task list will be returned
*/
const get = () => {
    try {
        let data = JSON.parse(LocalStorage.getItem(key));
        if (data == null) return [];
        else return data;
    }catch (e) {
        return [];
    }
};

/**
 * This function will erase todo-list data
 * @returns {Boolean} return true once data is removed from localStorage
 */

const remove = () => {
    try {
        LocalStorage.removeItem(key);
        return true;
    }catch (e) {
        return false;
    }
}

export default {
    store,
    get,
    remove
}