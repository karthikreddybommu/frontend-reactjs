import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      client: '',
      owner: '',
      hours: '',
      cost: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, client, owner, hours, cost } = this.state
    const project = this.props.createProject({
      name: name.trim(),
      client: client.trim(),
      owner: owner.trim(),
      hours: Number(hours),
      cost: Number(cost),
      status: 'Planned',
    })

    this.props.navigate(`/projects/${project.id}/estimate`)
  }

  render() {
    const { projects } = this.props

    return (
      <div className="home-page">
        <div className="page-intro">
          <div>
            <p className="eyebrow">PORTFOLIO</p>
            <h1>Projects</h1>
            <p className="muted">Keep client work, delivery details, and estimates in one place.</p>
          </div>
          <span className="project-count">{projects.length} active records</span>
        </div>

        <section className="content-panel project-list-panel">
          <div className="panel-heading">
            <div><p className="eyebrow">YOUR WORKSPACE</p><h2>All projects</h2></div>
            <span className="table-count">{projects.length} projects</span>
          </div>
          <div className="project-table-wrap">
            <table className="project-table">
              <thead><tr><th>PROJECT</th><th>CLIENT</th><th>OWNER</th><th>STATUS</th><th /></tr></thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td><strong>{project.name}</strong><span className="table-subtext">{project.id.toUpperCase()}</span></td>
                    <td>{project.client}</td>
                    <td>{project.owner}</td>
                    <td><span className={`status-pill status-${project.status.toLowerCase().replaceAll(' ', '-')}`}>{project.status}</span></td>
                    <td><Link className="text-link" to={`/projects/${project.id}/estimate`}>Open Estimate <span aria-hidden="true">→</span></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-panel create-panel">
          <div className="panel-heading">
            <div><p className="eyebrow">NEW WORK</p><h2>Create a project</h2></div>
            <span className="create-mark" aria-hidden="true">+</span>
          </div>
          <form className="project-form" onSubmit={this.handleSubmit}>
            <label>Project name<input name="name" value={this.state.name} onChange={this.handleChange} placeholder="e.g. Customer Portal" required /></label>
            <label>Client<input name="client" value={this.state.client} onChange={this.handleChange} placeholder="Company name" required /></label>
            <label>Owner<input name="owner" value={this.state.owner} onChange={this.handleChange} placeholder="Project owner" required /></label>
            <label>Total hours<input name="hours" type="number" min="0" value={this.state.hours} onChange={this.handleChange} placeholder="120" required /></label>
            <label>Estimated cost (₹)<input name="cost" type="number" min="0" value={this.state.cost} onChange={this.handleChange} placeholder="50000" required /></label>
            <button className="primary-button" type="submit"><span aria-hidden="true">+</span> Create project</button>
          </form>
        </section>
      </div>
    )
  }
}

export default Home
