import React from 'react'
import MainLayout from '../components/MainLayout'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api'

function Project() {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()

    const getProjectDetails = () => {
        api.get(`/api/projects/${id}/`)
            .then((res) => res.data)
            .then((data) => {
                setProject(data)
            })
            .catch((err) => console.log(err))
    }

    const getTasks = () => {
        api.get('/api/tasks/')
            .then((res) => res.data)
            .then((data) => {
                setTasks(data)
            })
            .catch((err) => console.log(err))
    }

    const deleteProject = () => {
        api.delete(`/api/projects/${id}/`)
            .then(() => {
                navigate(-1)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getProjectDetails()
        getTasks()
    }, [id])

    const filteredTasks = tasks.filter(task => task.project.id === parseInt(id))

    if (!project) {
        return (
            <MainLayout>
                <h1>Loading...</h1>
            </MainLayout>
        )
    }

    return (
        <div>
            <MainLayout>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1>Project: {project.name}</h1>
                    <div>
                        <button className="btn btn-primary me-2" onClick={() => navigate(`/projects/edit/${project.id}`)}>Edit</button>
                        <button className="btn btn-danger" onClick={deleteProject}>Delete</button>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-3 mt-3">
                                    <div className="col-3">
                                        <h5>Description: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p>{project.description ? project.description : 'No description'}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <h5>Created By: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p>{project.created_by.first_name} {project.created_by.last_name}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <h5>Created At: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p>{new Date(project.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <h5>Updated At: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p>{new Date(project.updated_at).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-header bg-white">
                                    <h5>Progress</h5>
                                </div>
                                <div className="card-body">
                                    <div className="progress w-100 my-2">
                                        <div className="progress-bar" role="progressbar" style={{ width: `${project.progress}%` }} aria-valuenow={project.progress} aria-valuemin="0" aria-valuemax="100">{project.progress}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-header bg-white">
                                    <h5>Tasks</h5>
                                </div>
                                <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <ul className="list-group mt-3">
                                        {filteredTasks.length > 0 ? (
                                            filteredTasks.map(task => (
                                                <Link to={`/task/${task.id}`} key={task.id} className="list-group-item list-group-item-action recent">
                                                    <li className="d-flex justify-content-between align-items-center">
                                                        <span>{task.title}</span>
                                                        <span className="badge bg-primary rounded-pill">
                                                            {task.status}
                                                        </span>
                                                    </li>
                                                </Link>
                                            ))
                                        ) : (
                                            <li className="list-group-item">No tasks available</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    )
}

export default Project
