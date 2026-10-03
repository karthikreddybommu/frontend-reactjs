import React from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import initialProjects from '../data/projects.js'

function getNavigationLinks(projects, pathname) {
  const routeProjectId = pathname.match(/^\/projects\/([^/]+)/)?.[1]
  const currentProject = projects.find((project) => project.id === routeProjectId) || projects[0]

  return [
    { label: 'Projects', to: '/', icon: '▦', end: true },
    { label: 'Overview', to: `/projects/${currentProject.id}/overview`, icon: '◫' },
    { label: 'Estimate', to: `/projects/${currentProject.id}/estimate`, icon: '◷' },
    { label: 'Team', to: `/projects/${currentProject.id}/team`, icon: '♧' },
  ]
}

function ProjectNavigation({ projects, className }) {
  const location = useLocation()
  const links = getNavigationLinks(projects, location.pathname)

  return (
    <nav className={className} aria-label="Main navigation">
      {links.map((link) => (
        <NavLink
          key={link.label}
          to={link.to}
          end={link.end}
          className={({ isActive }) => isActive ? `${className}-link active` : `${className}-link`}
        >
          <span className="nav-icon">{link.icon}</span> {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

function Sidebar({ projects }) {
  return (
    <aside className="sidebar">
      <Link className="brand" to="/">
        <span className="brand-mark">F</span>
        <span>
          <strong>Fieldnote</strong>
          <small>PROJECT CRM</small>
        </span>
      </Link>

      <div className="sidebar-section">
        <p className="sidebar-label">WORKSPACE</p>
        <ProjectNavigation projects={projects} className="sidebar-navigation" />
      </div>

      <div className="sidebar-footer">
        <span className="status-dot" /> All systems operational
      </div>
    </aside>
  )
}

class AppLayout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: initialProjects,
    }
  }

  createProject = (projectDetails) => {
    const usedIds = this.state.projects.map((project) => project.id)
    let nextNumber = 1

    while (usedIds.includes(`p${nextNumber}`)) {
      nextNumber += 1
    }

    const newProject = {
      ...projectDetails,
      id: `p${nextNumber}`,
    }

    this.setState((previousState) => ({
      projects: [...previousState.projects, newProject],
    }))

    return newProject
  }

  render() {
    const { projects } = this.state

    return (
      <div className="app-shell">
        <Sidebar projects={projects} />

        <main className="main-area">
          <header className="topbar">
            <span className="topbar-title">Client operations</span>
            <ProjectNavigation projects={projects} className="top-navigation" />
            <div className="user-chip"><span className="avatar">KM</span> Karthik M</div>
          </header>
          <div className="page-content">
            <Outlet context={{ projects, createProject: this.createProject }} />
          </div>
        </main>
      </div>
    )
  }
}

export default AppLayout
