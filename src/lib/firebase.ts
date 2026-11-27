import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDj02hGicDFb9EavcczVqrnIt68fuY6C5s',
  authDomain: 'iwamad-chat-a62ba.firebaseapp.com',
  databaseURL: 'https://iwamad-chat-a62ba-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iwamad-chat-a62ba',
  storageBucket: 'iwamad-chat-a62ba.firebasestorage.app',
  messagingSenderId: '994000435608',
  appId: '1:994000435608:web:f307af8061c0a4c53dd3ed',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
