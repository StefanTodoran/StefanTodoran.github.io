import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDPAXqTZfVjZ9rWNtG4R72R92LVoJLU0ck",
    authDomain: "todoran-dev.firebaseapp.com",
    projectId: "todoran-dev",
    storageBucket: "todoran-dev.appspot.com",
    messagingSenderId: "686866329464",
    appId: "1:686866329464:web:630e1fdf9b3e3a41ea628d",
    measurementId: "G-XGG0DV3C7Q"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
