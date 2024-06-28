import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { Link } from 'react-router-dom';
import api from '../api';

function Test() {
  const [recentTasks, setRecentTasks] = useState([]);
  const [Tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('/api/recent-tasks/')
      .then((res) => res.data)
      .then((data) => {
        setRecentTasks(data);
        console.log("Recent Tasks:", data);
      })
      .catch((err) => console.log(err));

    api.get('/api/tasks/')
      .then((res) => res.data)
      .then((data) => {
        setTasks(data);
        console.log("Tasks:", data);
      })
      .catch((err) => console.log(err));
  }, []);

  const markAsRead = (taskId) => {
    api.patch(`/api/tasks/${taskId}/`, { status: 'Completed' })
      .then((res) => res.data)
      .then((updatedTask) => {
        setTasks((prevTasks) => prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ));
      })
      .catch((err) => console.log(err));
  };

  return (
    <MainLayout>
      <h1>Dashboard</h1>
      <div>
        <h2>Recent Tasks</h2>
        <ul>
          {recentTasks.map(task => (
            <li key={task.id}>
              <Link to={`/tasks/${task.id}`}>{task.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Pending Tasks</h2>
        <ul>
          {Tasks.filter(task => task.status === 'Pending').map(task => (
            <li key={task.id}>
              <Link to={`/tasks/${task.id}`}>{task.title}</Link>
              <button onClick={() => markAsRead(task.id)}>Mark as Read</button>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
}

export default Test;
