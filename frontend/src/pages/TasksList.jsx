import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import MainLayout from '../components/MainLayout';
import api from '../api';

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState('all');

  const getTask = () => {
    api.get('/api/tasks/')
      .then((res) => res.data)
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => console.log(err));
  };

  const getProjects = () => {
    api.get('/api/projects/')
      .then((res) => res.data)
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTask();
    getProjects();
  }, []);

  const handleSelect = (eventKey) => {
    setActiveProject(eventKey);
  };

  const filteredTasks = tasks.filter(task => 
    (activeProject === 'all' || task.project.id === parseInt(activeProject)) && 
    task.status === 'Pending'
  );

  return (
    <div>
      <MainLayout>
        <h1 className="text-center mt-4">Tasks</h1>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card">
              <div className="card-body">
                <Nav variant="tabs" activeKey={activeProject} onSelect={handleSelect}>
                  <Nav.Item>
                    <Nav.Link eventKey="all">All Projects</Nav.Link>
                  </Nav.Item>
                  {projects.map(project => (
                    <Nav.Item key={project.id}>
                      <Nav.Link eventKey={project.id.toString()}>{project.name}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                <ul className="list-group mt-3">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                      <Link to={`/task/${task.id}`} key={task.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center recent">
                        <span>{task.title}</span>
                        <span className="badge bg-primary rounded-pill">
                          {task.status}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <li className="list-group-item">No pending tasks</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default TasksList;
