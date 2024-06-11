import { Routes, Route } from 'react-router-dom';

import { AppProvider } from './store/Context';

// components

// pages
import TodoPage from "./pages/TodoPage";
import LoginPage from './pages/LoginPage';

/**
 * Friday - 5/24
 * Created login page
 * add sidebar in app page
 * can edit task
 * 
*/


function App () {
    return (
        <AppProvider>
            <Routes>
                <Route path='/' element={<TodoPage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </AppProvider>
    );
}

export default App;