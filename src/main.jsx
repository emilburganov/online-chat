import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {auth, firestore} from '@/utils/firebase.js';

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Context.Provider value={{auth, firestore}}>
        <App/>
    </Context.Provider>,
);
