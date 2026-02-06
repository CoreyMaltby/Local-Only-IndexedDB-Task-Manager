import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { useLiveQuery } from 'dexie-react-hooks';

function App() {
  const [taskText, setTaskText] = useState('');

  // Automatically stays in sync with IndexedDB
  const tasks = useLiveQuery(() => db.tasks.toArray(), []);

  // Create a new task
  const addTask = async (e) => {
    e.preventDefault(e);
    if (!taskText.trim()) return;

    await db.tasks.add({
      uuid: uuidv4(),
      text: taskText,
      createdAt: Date.now(),
    });
    setTaskText('');
  };

  // Toggle a task
  const toggleTask = async (uuid, completed) => {
    await db.tasks.update(uuid, { completed: !completed });
  };

  // Delete a task
  const deleteTask = async (uuid) => {
    await db.tasks.delete(uuid);
  };

  // Delete Database
  const wipeDatabase = async () => {
    const confirmed = window.confirm('Are you sure you want to delete the database? This action cannot be undone.');
    if (confirmed) {
      await db.tasks.clear(); // Deletes the entire database
      window.location.reload(); // Restarts the app to recreate the empty database
    }
  };

  return (
    <div> 
      <h1>Todo List</h1>
      <form onSubmit={addTask}>
        <input 
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul> 
        {tasks?.map((task) => (
          <li key={task.uuid}>
            <span
            onClick=
            {() => toggleTask(task.uuid, task.completed)}
            style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {task.text}
            </span>

            <button onClick={() => deleteTask(task.uuid)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={wipeDatabase}>
        Wipe Database
      </button>
    </div>
  );
}

export default App;