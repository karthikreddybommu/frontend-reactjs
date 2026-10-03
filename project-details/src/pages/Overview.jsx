import React from 'react'

class Overview extends React.Component {
  render() {
    const { project } = this.props

    return (
      <section className="content-panel detail-panel">
        <div className="panel-heading"><div><p className="eyebrow">PROJECT SUMMARY</p><h2>Overview</h2></div></div>
        <div className="detail-grid">
          <div className="detail-item"><span>Project name</span><strong>{project.name}</strong></div>
          <div className="detail-item"><span>Client</span><strong>{project.client}</strong></div>
          <div className="detail-item"><span>Status</span><strong><span className={`status-pill status-${project.status.toLowerCase().replaceAll(' ', '-')}`}>{project.status}</span></strong></div>
          <div className="detail-item"><span>Project owner</span><strong>{project.owner}</strong></div>
        </div>
      </section>
    )
  }
}

export default Overview
