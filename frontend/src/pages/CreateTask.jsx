import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import api from '../api';

function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [priorityChoices, setPriorityChoices] = useState([]);
    const [statusChoices, setStatusChoices] = useState([]);
    const navigate = useNavigate();

    const getPriorityChoices = () => {
        api.get('/api/task-choices/')
            .then((res) => {
                setPriorityChoices(res.data.priority_choices);
                setStatusChoices(res.data.status_choices);
            })
            .catch((err) => console.error(err));
    };

    const getProjects = () => {
        api.get('/api/project-choices/')
            .then((res) => {
                setProjects(res.data.project_choices);
                const generalProject = res.data.project_choices.find(choice => choice.label === 'General');
                if (generalProject) {
                    setSelectedProject(generalProject.value);
                }
            })
            .catch((err) => console.error(err));
    };

    const createTask = (e) => {
        e.preventDefault();
        console.log("Selected Project:", selectedProject)
        api.post('/api/tasks/', {
            title: title,
            description: description,
            due_date: dueDate,
            priority: priority,
            project: selectedProject || null,  // Ensure project is null if not selected
        }).then((res) => {
            if (res.status === 201) {
                console.log('Task created successfully');
                navigate('/dashboard');
            } else {
                console.error('Failed to create task');
            }
        }).catch((err) => console.error(err));
    };

    useEffect(() => {
        getPriorityChoices();
        getProjects();
    }, []);

    return (
        <div>
            <MainLayout>
                <h1>Create Task</h1>
                <form onSubmit={createTask}>
                    <div className="row mt-5 mb-3">
                        <div className="col-3">
                            <h2>Task Details</h2>
                            <p>Fill in the details of the task</p>
                        </div>
                        <div className="col-9">
                            <div className="form-container card">
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <label htmlFor="title" className='form-label'>Title</label>
                                            <input type='text' className='form-control' id='title' placeholder='Title' required onChange={(e) => setTitle(e.target.value)} value={title} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <label htmlFor="description" className='form-label'>Description (Optional)</label>
                                            <textarea className='form-control' id='description' placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <label htmlFor="project" className='form-label'>Project</label>
                                            <select className='form-select' id='project' required onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject}>
                                                <option value=''>Select Project</option>
                                                {projects.map((choice) => (
                                                    <option key={choice.value} value={choice.value}>{choice.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="due-date" className='form-label'>Due Date</label>
                                            <input type='date' className='form-control' id='due-date' placeholder='Due Date' required onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="priority" className='form-label'>Priority</label>
                                            <select className='form-select' id='priority' required onChange={(e) => setPriority(e.target.value)} value={priority}>
                                                <option value=''>Select Priority</option>
                                                {priorityChoices.map((choice) => (
                                                    <option key={choice.value} value={choice.value}>{choice.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row p-3 border-top justify-content-end">
                        <div className="col-12 text-end">
                            <button type='button' className='btn btn-secondary me-2' onClick={() => navigate('/dashboard')}>Cancel</button>
                            <button type='submit' className='btn btn-primary'>Create Task</button>
                        </div>
                    </div>
                </form>
            </MainLayout>
        </div>
    );
}

export default CreateTask;
