import { Navigate, Outlet, Route, Routes, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import ProjectTabs from './components/ProjectTabs.jsx'
import Estimate from './pages/Estimate.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Overview from './pages/Overview.jsx'
import ProjectNotFound from './pages/ProjectNotFound.jsx'
import Team from './pages/Team.jsx'
import './App.css'
import './crm.css'

function HomeRoute() {
  const { projects, createProject } = useOutletContext()
  const navigate = useNavigate()

  return <Home projects={projects} createProject={createProject} navigate={navigate} />
}

function ProjectRoute() {
  const { projectId } = useParams()
  const { projects } = useOutletContext()
  const project = projects.find((item) => item.id === projectId)

  if (!project) return <ProjectNotFound />

  return (
    <>
      <ProjectTabs project={project} />
      <Outlet context={{ project }} />
    </>
  )
}

function ProjectPage({ component: Page }) {
  const { project } = useOutletContext()
  return <Page project={project} />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomeRoute />} />
        <Route path="projects/:projectId" element={<ProjectRoute />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<ProjectPage component={Overview} />} />
          <Route path="estimate" element={<ProjectPage component={Estimate} />} />
          <Route path="team" element={<ProjectPage component={Team} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
