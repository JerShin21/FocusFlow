import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import api from '../api'

function ProjectList() {
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])

    const getTasks = () => {
        api.get('/api/tasks/')
            .then((res) => res.data)
            .then((data) => {
                setTasks(data)
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

    const countTasksForProject = (projectId) => {
        return tasks.filter(task => task.project.id === projectId).length
    }

    useEffect(() => {
        getProjects()
        getTasks()
    }, [])

    return (
        <div>
            <MainLayout>
                <h1>Project</h1>
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <ul className="list-group">
                                    {projects.map(project => (
                                        <Link to={`/project/${project.id}`} key={project.id} className="list-group-item d-flex justify-content-between align-items-center recent">
                                            <span>{project.name}</span>
                                            <span className="badge bg-primary rounded-pill">
                                                {countTasksForProject(project.id)}
                                            </span>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    )
}

export default ProjectList
