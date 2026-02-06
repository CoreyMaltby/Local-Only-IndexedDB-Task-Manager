import Dexie from 'dexie';

// Initializes the database
export const db = new Dexie('TodoDB');

// Defines the database schema
// UUID is used as the primary key
db.version(1).stores({
    tasks: 'uuid, title, completed'
});