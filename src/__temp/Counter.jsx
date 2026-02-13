import { useReducer } from 'react';
import { countReducer } from './Reducer';

export default function Counter() {
    
    const initialState = {count: 0};    
    const [state, dispatch] = useReducer(countReducer, initialState);

    return (
        <div>
            <h1>{ state.count }</h1>
            <button onClick={() => dispatch({type: 'increase'})}>Increase</button>
            <button onClick={() => dispatch({type: 'decrease'})}>Decrease</button>
            <button onClick={() => dispatch({type: 'reset', value: 0})}>Reset</button>
        </div>
    )
};