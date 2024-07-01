import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import api from '../api'

function Task() {
    const { id } = useParams()
    const [task, setTask] = useState(null)
    const navigate = useNavigate()

    const getTaskDetails = () => {
        api.get(`/api/tasks/${id}/`)
            .then((res) => res.data)
            .then((data) => {
                setTask(data)
            })
            .catch((err) => console.log(err))
    }

    const deleteTask = () => {
        api.delete(`/api/tasks/${id}/`)
            .then(() => {
                navigate(-1)
            })
            .catch((err) => console.log(err))
    }

    const markAsComplete = () => {
        api.patch(`/api/tasks/${id}/`, { status: 'Completed' })
            .then(() => {
                getTaskDetails()
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getTaskDetails()
    }, [id])

    if (!task) {
        return (
            <MainLayout>
                <h1>Loading...</h1>
            </MainLayout>
        )
    }

    return (
        <div>
            <MainLayout>
                <h1>Task: {task.title}</h1>
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <h5>Description: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p>{task.description ? task.description : 'No description'}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <h5>Project: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p><Link to={`/project/${task.project.id}`} className='recent'>{task.project.name}</Link></p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <h5>Due Date: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p>{new Date(task.due_date).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <h5>Status: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p>{task.status}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <h5>Priority: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p>{task.priority}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <h5>Created At: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p>{new Date(task.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <h5>Updated At: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p>{new Date(task.updated_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <h5>Created By: </h5>
                                    </div>
                                    <div className="col-9">
                                        <p>{task.created_by.first_name} {task.created_by.last_name}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button 
                                            className="btn btn-success" 
                                            onClick={markAsComplete}
                                            disabled={task.status === 'Completed'}
                                        >
                                            Mark as Complete
                                        </button>
                                        <div>
                                            <button className="btn btn-danger me-2" onClick={deleteTask}>Delete</button>
                                            <button className="btn btn-primary" onClick={() => navigate(`/task/${task.id}/edit/`)}>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    )
}

export default Task
