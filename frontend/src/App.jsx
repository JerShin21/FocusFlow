import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/styles/custom.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Index from './pages/Index'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import CreateTask from './pages/CreateTask'
import CreateProject from './pages/CreateProject'
import Notification from './pages/Notification'
import Test from './pages/Test'
import ProjectList from './pages/ProjectList'
import TasksList from './pages/TasksList'
import CompletedTaskList from './pages/CompletedTaskList'

function Logout() {
  localStorage.clear()
  return <Navigate to="/" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path='/dashboard/create-task' element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
          <Route path='/dashboard/create-project' element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
          <Route path='/notifications' element={<ProtectedRoute><Notification /></ProtectedRoute>} />
          <Route path='/projects' element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
          <Route path='/tasks' element={<ProtectedRoute><TasksList /></ProtectedRoute>} />
          <Route path='/completed-tasks' element={<ProtectedRoute><CompletedTaskList /></ProtectedRoute>} />
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
