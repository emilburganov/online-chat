import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

export const firebaseApp = initializeApp({
    apiKey: 'AIzaSyCCvXPnFK9M1GJPs_D_dN5mvJHPb2nVeqM',
    authDomain: 'online-chat-29f1d.firebaseapp.com',
    projectId: 'online-chat-29f1d',
    storageBucket: 'online-chat-29f1d.appspot.com',
    messagingSenderId: '213909296798',
    appId: '1:213909296798:web:de9e6104d2106bce970d8f',
    measurementId: 'G-RSZP80P7VM',
});

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp)
