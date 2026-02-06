# Local Only IndexDB Task Manager PoC

A local-first web application built with React and Dexie.js. This PoC shows how a web application can interact with a private database being stored exclusively on the user's device via IndexedDB.

## Key Features
* **Local Storage:** All the data is stored on the user's local device using IndexedDB, meaning no information is ever sent to a central server
* **UUID Primary Keys:** Every task is assigned a v4 UUID instead of an integer ID. This ensures that if cloud-sync is added, data from different devices can merge without ID collisions.
* **Reactive Local Queries:** Utilises the `useLiveQuery` hook from Dexie.js to keep the UI in sync with the local database automatically, allowing for it to update upon changes.
* **Database Wipe:** Features a button to delete the database completely from your device. This feature follows the GDPR right to erasure.

## Tech Stack
* **Frontend:** React, Vite
* **Database:** Dexie.js (IndexedDB wrapper)
* **ID Generation:** UUID library

## Local Data Schema
The database is stored entirely on the user's device.

```
import Dexie from 'dexie';

// Initializes the database
export const db = new Dexie('TodoDB');

// Defines the database schema
// UUID is used as the primary key
db.version(1).stores({
    tasks: 'uuid, title, completed'
});
```

## What I Learned
### 1. Client-Side Data
This project taught me how to manage the Browser Storage API. I also learned the capabilities of IndexedDB and how it's more powerful than localStorage for structured data.

### 2. UUID Strategy
I implemented the UUID library to avoid potential issues caused by serial integer IDs. This is important to avoid any data collisions if choosing to synchronise the local database with an online database.

### 3. Designing with GDPR in mind. 
I learned one method of ensuring the database complies with GDPR regulations. The program utilises `db.tasks.clear()` and `db.delete` to ensure that no data remains on the user's device if they wish to remove it.

## Local Setup

```
git clone https://github.com/CoreyMaltby/Local-Only-IndexedDB-Task-Manager.git
cd Local-Only-IndexedDB-Task-Manager
npm install
npm run dev
```
