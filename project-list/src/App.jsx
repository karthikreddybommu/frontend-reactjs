import React from "react";
import "./App.css";

import {
  getProjects,
  getUsers
} from "./services/api";

import ProjectCard from "./components/ProjectCard";
import Skeleton from "./components/Skeleton";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      isLoading: true,
      error: null
    };

    this.controller = null;
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    if (this.controller) {
      this.controller.abort();
    }
  }

  loadData = async () => {
    this.controller = new AbortController();

    this.setState({
      isLoading: true,
      error: null
    });

    try {
      const [projects, users] =
        await Promise.all([
          getProjects(
            this.controller.signal
          ),

          getUsers(
            this.controller.signal
          )
        ]);

      const userMap = new Map(
        users.map((user) => [
          user.id,
          user.name
        ])
      );

      const updatedProjects =
        projects.map((project) => ({
          ...project,

          owner:
            userMap.get(project.ownerId) ||
            "Unknown"
        }));

      this.setState({
        data: updatedProjects,
        isLoading: false,
        error: null
      });

    } catch (error) {

      if (error.name === "AbortError") {
        return;
      }

      this.setState({
        data: [],
        isLoading: false,
        error: "Unable to load projects"
      });
    }
  };

  render() {
    const {
      data,
      isLoading,
      error
    } = this.state;

    return (
      <div className="app">

        <h1>Project List</h1>

        {isLoading && (
          <div className="project-container">

            <Skeleton />
            <Skeleton />
            <Skeleton />

          </div>
        )}

        {!isLoading && error && (
          <div className="error-box">

            <h2>
              Something went wrong
            </h2>

            <p>
              {error}
            </p>

            <button
              onClick={this.loadData}
            >
              Try Again
            </button>

          </div>
        )}

        {!isLoading &&
          !error &&
          data.length === 0 && (

            <div className="empty-box">

              <h2>
                No projects found
              </h2>

              <p>
                There are currently no
                projects available.
              </p>

            </div>
          )}

        {!isLoading &&
          !error &&
          data.length > 0 && (

            <div className="project-container">

              {data.map((project) => (

                <ProjectCard
                  key={project.id}
                  data={project}
                />

              ))}

            </div>
          )}

      </div>
    );
  }
}

export default App;