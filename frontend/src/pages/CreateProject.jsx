import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import api from '../api';

function CreateProject() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const createProject = (e) => {
        e.preventDefault();
        api.post('/api/projects/', {
            name: name,
            description: description
        }).then((res) => {
            if (res.status === 201) {
                console.log('Project created successfully');
                navigate('/dashboard');
            } else {
                console.error('Failed to create project');
            }
        }).catch((err) => console.error(err));
    };

    return (
        <div>
            <MainLayout>
                <h1 className="text-center mt-4">Create Project</h1>
                <form onSubmit={createProject}>
                    <div className="row mt-4 mb-3">
                        <div className="col-12 col-md-3 mb-3 mb-md-0">
                            <h2>Project Details</h2>
                            <p>Fill in the details of the project</p>
                        </div>
                        <div className="col-12 col-md-9">
                            <div className="form-container card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Name" required onChange={(e) => setName(e.target.value)} value={name} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description (Optional)</label>
                                        <textarea className="form-control" id="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row p-3 border-top justify-content-end">
                        <div className="col-12 text-end">
                            <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/dashboard')}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Create Project</button>
                        </div>
                    </div>
                </form>
            </MainLayout>
        </div>
    );
}

export default CreateProject;
