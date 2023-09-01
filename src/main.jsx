import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {firebaseApp, auth, firestore} from './utils/firebase';
import {Context} from './context/index'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Context.Provider value={{firebaseApp, auth, firestore}}>
        <App/>
    </Context.Provider>,
);
