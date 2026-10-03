import React from 'react'

const formatIndianCurrency = (cost) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(cost)

class Estimate extends React.Component {
  render() {
    const { project } = this.props

    return (
      <section className="content-panel detail-panel estimate-panel">
        <div className="panel-heading"><div><p className="eyebrow">PROJECT FINANCIALS</p><h2>Estimate</h2></div><span className="estimate-symbol" aria-hidden="true">₹</span></div>
        <div className="detail-grid estimate-grid">
          <div className="detail-item"><span>Project name</span><strong>{project.name}</strong></div>
          <div className="detail-item"><span>Client</span><strong>{project.client}</strong></div>
          <div className="detail-item"><span>Total hours</span><strong className="metric-value">{project.hours.toLocaleString('en-IN')} <small>hrs</small></strong></div>
          <div className="detail-item cost-item"><span>Estimated cost</span><strong className="metric-value">{project.cost === null ? 'Not estimated' : formatIndianCurrency(project.cost)}</strong></div>
        </div>
      </section>
    )
  }
}

export default Estimate
