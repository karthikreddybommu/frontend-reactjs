import React from 'react'
import { Link } from 'react-router-dom'

class ProjectNotFound extends React.Component {
  render() {
    return (
      <section className="content-panel message-panel">
        <span className="message-code">PROJECT</span>
        <h1>Project not found</h1>
        <p className="muted">This project ID does not exist in the local project list.</p>
        <Link className="primary-button button-link" to="/">← Back to Home</Link>
      </section>
    )
  }
}

export default ProjectNotFound
