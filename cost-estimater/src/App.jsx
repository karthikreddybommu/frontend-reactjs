import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        { name: "karthik" },
        { name: "kumar" },
        {name:"Reddy"}

      ]
    };
  }

  render() {
    return (
      <div>
        <StudentName />
        <ul>
          {this.state.data.map((item) => (
            <List key={item.name} data={item} />
          ))}
        </ul>
      </div>
    );
  }
}

class StudentName extends React.Component {
  render() {
    return (
      <div>
        <h1>Student name detail</h1>
      </div>
    );
  }
}

class List extends React.Component {
  render() {
    return <li>{this.props.data.name}</li>;
  }
}

export default App;