import React from 'react'
import { Link, NavLink } from 'react-router-dom'

class ProjectTabs extends React.Component {
  render() {
    const { project } = this.props

    return (
      <section className="project-heading">
        <div className="breadcrumb"><Link to="/">Projects</Link><span>/</span><span>{project.name}</span></div>
        <div className="project-title-row">
          <div>
            <p className="eyebrow">PROJECT WORKSPACE</p>
            <h1>{project.name}</h1>
            <p className="muted">{project.client}</p>
          </div>
          <span className="project-id">{project.id.toUpperCase()}</span>
        </div>
        <nav className="project-tabs" aria-label="Project pages">
          <NavLink to="overview" end className={({ isActive }) => isActive ? 'project-tab active' : 'project-tab'}>Overview</NavLink>
          <NavLink to="estimate" className={({ isActive }) => isActive ? 'project-tab active' : 'project-tab'}>Estimate</NavLink>
          <NavLink to="team" className={({ isActive }) => isActive ? 'project-tab active' : 'project-tab'}>Team</NavLink>
        </nav>
      </section>
    )
  }
}

export default ProjectTabs
