import { browserLocalPersistence } from 'firebase/auth';

// The web build (your Pages site): the browser keeps the session.
export const persistence = browserLocalPersistence;
