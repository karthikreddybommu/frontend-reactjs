import React from "react";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [
        {
          id: 1,
          name: "Website Development",
          client: "ABC Company",
          status: "In Progress",
          owner: "Karthik",
          hours: 120,
          cost: 5330332
        },
        {
          id: 2,
          name: "Mobile Application",
          client: "XYZ Technologies",
          status: "Completed",
          owner: "Divya",
          hours: 180,
          cost: 425000
        },
        {
          id: 3,
          name: "HR Management System",
          client: "Teralogic",
          status: "Planned",
          owner: "Nikhitha",
          hours: 200,
          cost: null
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <ProjectTitle />

        <div>
          {this.state.data.map((item) => (
            <ProjectCard
              key={item.id}
              data={item}
            />
          ))}
        </div>
      </div>
    );
  }
}

class ProjectTitle extends React.Component {
  render() {
    return (
      <div>
        <h1>Project Details</h1>
      </div>
    );
  }
}

class ProjectCard extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.data.name}</h2>

        <InfoItem
          label="Client"
          value={this.props.data.client}
        />

        <InfoItem
          label="Status"
          value={this.props.data.status}
        />

        <InfoItem
          label="Owner"
          value={this.props.data.owner}
        />

        <InfoItem
          label="Total Hours"
          value={this.props.data.hours}
        />

        <InfoItem
          label="Final Estimated Cost"
          value={this.props.data.cost}
        />

        <hr />
      </div>
    );
  }
}

class InfoItem extends React.Component {
  render() {
    return (
      <p>
        <b>{this.props.label}:</b>{" "}
        {this.props.value}
      </p>
    );
  }
}

export default App;