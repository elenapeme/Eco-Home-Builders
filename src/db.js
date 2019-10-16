import { initializeApp } from 'firebase';
 
const app = initializeApp({
    apiKey: "AIzaSyCQ7KHvtfsKCmt0GS84Q2XdHREltlUdiWg",
    authDomain: "eco-home-builders.firebaseapp.com",
    databaseURL: "https://eco-home-builders.firebaseio.com",
    projectId: "eco-home-builders",
    storageBucket: "eco-home-builders.appspot.com",
    messagingSenderId: "499017524183",
    appId: "1:499017524183:web:64564313a4ea3d2e5d6192"
});
export const db = app.firestore();
export const tasksCollection = db.collection('tasks');
