import React from 'react'
import MainLayout from '../components/MainLayout'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'

function EditProject() {
    const { id } = useParams();
    const [project, setProject] = useState({
        name: '',
        description: '',
    });
    const navigate = useNavigate();

    const getProjectDetails = () => {
        api.get(`/api/projects/${id}/`)
            .then((res) => res.data)
            .then((data) => {
                setProject(data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getProjectDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prevProject => ({
            ...prevProject,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/api/projects/${id}/`, project)
            .then(() => {
                navigate(`/project/${id}`);
            })
            .catch((err) => console.log(err));
    }

  return (
    <div>
        <MainLayout>
            <h1 className='text-center mt-4'>Edit Project</h1>
            <form onSubmit={handleSubmit}>
                    <div className="row mt-4 mb-3">
                        <div className="col-12 col-md-3 mb-3 mb-md-0">
                            <h2>Project Details</h2>
                            <p>Edit the details of the project</p>
                        </div>
                        <div className="col-12 col-md-9">
                            <div className="form-container card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Name" required onChange={handleChange} value={project.name} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description (Optional)</label>
                                        <textarea className="form-control" id="description" placeholder="Description" onChange={handleChange} value={project.description} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row p-3 border-top justify-content-end">
                        <div className="col-12 text-end">
                            <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/dashboard')}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </form>
        </MainLayout>
    </div>
  )
}

export default EditProject
