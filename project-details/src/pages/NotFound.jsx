import React from 'react'
import { Link } from 'react-router-dom'

class NotFound extends React.Component {
  render() {
    return (
      <main className="not-found-page">
        <div className="not-found-content">
          <span className="message-code">FIELDNOTE / 404</span>
          <h1>404</h1>
          <h2>Page not found</h2>
          <p>The page you’re looking for doesn’t exist or may have moved.</p>
          <Link className="primary-button button-link" to="/">← Home</Link>
        </div>
      </main>
    )
  }
}

export default NotFound
