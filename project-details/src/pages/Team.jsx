import React from 'react'

class Team extends React.Component {
  render() {
    const { project } = this.props
    const teamMembers = [
      { name: project.owner, role: 'Project owner', initials: project.owner.slice(0, 2).toUpperCase() },
      { name: 'Ananya Rao', role: 'Product designer', initials: 'AR' },
      { name: 'Vikram Nair', role: 'Frontend developer', initials: 'VN' },
    ]

    return (
      <section className="content-panel detail-panel team-panel">
        <div className="panel-heading"><div><p className="eyebrow">PEOPLE</p><h2>{project.name} team</h2><p className="muted">{project.client}</p></div><span className="team-count">{teamMembers.length} members</span></div>
        <div className="team-list">
          {teamMembers.map((member) => (
            <div className="team-member" key={member.name}>
              <span className="member-avatar">{member.initials}</span>
              <span className="member-info"><strong>{member.name}</strong><small>{member.role}</small></span>
              <span className="member-status">Assigned</span>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default Team
