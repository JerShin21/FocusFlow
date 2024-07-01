import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import api from '../api'

function EditTask() {
    const { id } = useParams()
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
        project: '',
        due_date: ''
    })
    const [projects, setProjects] = useState([])
    const [priorityChoices, setPriorityChoices] = useState([])
    const navigate = useNavigate()

    const getTaskDetails = () => {
        api.get(`/api/tasks/${id}/`)
            .then((res) => res.data)
            .then((data) => {
                setTask({
                    ...data,
                    project: data.project.id
                })
            })
            .catch((err) => console.log(err))
    }

    const getProjects = () => {
        api.get('/api/projects/')
            .then((res) => res.data)
            .then((data) => {
                setProjects(data)
            })
            .catch((err) => console.log(err))
    }

    const getPriorityChoices = () => {
        api.get('/api/task-choices/')
            .then((res) => res.data)
            .then((data) => {
                setPriorityChoices(data.priority_choices)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getTaskDetails()
        getProjects()
        getPriorityChoices()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        api.put(`/api/tasks/${id}/`, task)
            .then(() => {
                navigate(`/task/${id}`)
            })
            .catch((err) => console.log(err))
    }

    return (
        <MainLayout>
            <h1>Edit Task</h1>
            <form onSubmit={handleSubmit}>
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
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='title'
                                            name='title'
                                            value={task.title}
                                            onChange={handleChange}
                                            placeholder='Title'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="description" className='form-label'>Description (Optional)</label>
                                        <textarea
                                            className='form-control'
                                            id='description'
                                            name='description'
                                            value={task.description}
                                            onChange={handleChange}
                                            placeholder='Description'
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label htmlFor="project" className='form-label'>Project</label>
                                        <select
                                            className='form-select'
                                            id='project'
                                            name='project'
                                            value={task.project}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value=''>Select Project</option>
                                            {projects.map((project) => (
                                                <option key={project.id} value={project.id}>{project.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="status" className='form-label'>Status</label>
                                        <select
                                            className='form-select'
                                            id='status'
                                            name='status'
                                            value={task.status}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value=''>Select Status</option>
                                            <option value='Pending'>Pending</option>
                                            <option value='Completed'>Completed</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label htmlFor="due_date" className='form-label'>Due Date</label>
                                        <input
                                            type='date'
                                            className='form-control'
                                            id='due_date'
                                            name='due_date'
                                            value={task.due_date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="priority" className='form-label'>Priority</label>
                                        <select
                                            className='form-select'
                                            id='priority'
                                            name='priority'
                                            value={task.priority}
                                            onChange={handleChange}
                                            required
                                        >
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
                        <button type='submit' className='btn btn-primary'>Save Changes</button>
                    </div>
                </div>
            </form>
        </MainLayout>
    )
}

export default EditTask
