import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Breadcrumb, Row, Col, Container } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../styles/MainLayout.css';
import PropTypes from 'prop-types';
import { PiNotePencil, PiFolderPlus, PiUser, PiSidebar, PiHouse, PiTarget, PiBell, PiUserList, PiFolders, PiCheckSquareOffset, PiSquaresFour, PiFolder } from 'react-icons/pi';
import { TbLogout2 } from "react-icons/tb";
import api from '../api';
import {useMediaQuery} from '@mui/system';

function MainLayout({ children, breadcrumbs }) {
    const [collapsed, setCollapsed] = useState(true);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 768px)');

    const getProjects = () => {
        api.get('/api/projects/').then((res) => res.data).then((data) => {setProjects(data); console.log("Projects:" +data)}).catch((err) => console.log(err))
    }

    useEffect(() => {
        getProjects()
    },[])

    const toggleSidebar = () => setCollapsed(!collapsed);

    const handleNavigate = (path) => {
        navigate(path);
    }

    return (
        <div className="main-layout">
            <Container fluid>
                <Row>
                    <Navbar expand="lg">
                        <Navbar.Brand href="/dashboard">
                            <img
                                src={logo}
                                className="d-inline-block align-top logo"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Button onClick={() => handleNavigate("/dashboard/create-task")} className="me-2 btn btn-secondary"><PiNotePencil size={24} />{isMobile? " Create Task" : ""}</Button>
                                <Button onClick={() => handleNavigate("/dashboard/create-project")} className="me-2 btn btn-secondary"><PiFolderPlus size={24} />{isMobile? " Create Project" : ""}</Button>
                                <NavDropdown title={<PiUser size={24} />} id="basic-nav-dropdown" align="end">
                                    <NavDropdown.Item className='custom-dropdown-item' href="#action/3.1"><PiUserList size={24} className='icon'/>Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className='custom-dropdown-item' href="/logout"><TbLogout2 size={22} className='icon'/>Log out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
                <Row className='align-items-center p-1 bg-light border-bottom'>
                    <Col xs="auto">
                        <Button onClick={toggleSidebar} className="toggle-btn">
                            <PiSidebar size={24} />
                        </Button>
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-end align-items-center">
                            <Breadcrumb className='bg-light mb-0'>
                                {breadcrumbs && breadcrumbs.map((breadcrumb, index) => (
                                    <Breadcrumb.Item key={index} href={breadcrumb.href} active={breadcrumb.active} className="breadcrumb-link">
                                        {breadcrumb.label}
                                    </Breadcrumb.Item>
                                ))}
                            </Breadcrumb>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container fluid>
                <Row>
                    <Col xs="auto" className={`sidebar ${collapsed && isMobile ? 'collapsed-mobile' : collapsed ? 'collapsed' : 'expanded'}`}>
                        <Nav className="flex-column justify-content-center">
                            <Nav.Link onClick={() => handleNavigate("/dashboard")}>
                                <PiHouse size={24} />
                                {!collapsed && <span>Dashboard</span>}
                            </Nav.Link>
                            <Nav.Link href="/notifications">
                                <PiBell size={24} />
                                {!collapsed && <span>Notifications</span>}
                            </Nav.Link>
                            <Nav.Link href="/projects">
                                <PiFolders size={24} />
                                {!collapsed && <span>Projects</span>}
                            </Nav.Link>
                            <Nav.Link href="/tasks">
                                <PiTarget size={24} />
                                {!collapsed && <span>Tasks</span>}
                            </Nav.Link>
                            <Nav.Link href="/completed-tasks">
                                <PiCheckSquareOffset size={24} />
                                {!collapsed && <span>Completed Tasks</span>}
                            </Nav.Link>
                        </Nav>
                        <hr className='divider'/>
                        <Nav className="flex-column justify-content-center">
                            {collapsed ? (
                                <Nav.Link onClick={toggleSidebar} className="toggle-btn">
                                    <PiSquaresFour size={24} />
                                </Nav.Link>
                            ) : (
                                <>
                                    <h6>Projects</h6>
                                    {projects.map((project, index) => (
                                        <Nav.Link key={index} href={`/project/${project.id}`}>
                                            <PiFolder size={24} />
                                            <span>{project.name}</span>
                                        </Nav.Link>
                                    ))}
                                </>
                            )}
                        </Nav>
                    </Col>
                    <Col>
                        <Row>
                            <Col className="content-container">
                                {children}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string,
            active: PropTypes.bool,
        })
    ),
};

export default MainLayout;
