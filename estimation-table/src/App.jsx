import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: []
    };

    this.roles = [
      {
        id: 1,
        name: "Developer",
        rate: 1000
      },
      {
        id: 2,
        name: "Tester",
        rate: 800
      },
      {
        id: 3,
        name: "Designer",
        rate: 900
      }
    ];
  }

  // Add new task
  addTask = () => {
    const newTask = {
      id: Date.now(),
      name: "",
      roleId: "",
      hours: 0
    };

    this.setState({
      tasks: [...this.state.tasks, newTask]
    });
  };

  // Update task name
  updateTaskName = (id, value) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          name: value
        };
      }

      return task;
    });

    this.setState({
      tasks: updatedTasks
    });
  };

  // Update selected role
  updateTaskRole = (id, value) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          roleId: value
        };
      }

      return task;
    });

    this.setState({
      tasks: updatedTasks
    });
  };

  // Update hours
  updateTaskHours = (id, value) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          hours: Number(value)
        };
      }

      return task;
    });

    this.setState({
      tasks: updatedTasks
    });
  };

  // Delete task
  deleteTask = (id) => {
    const updatedTasks = this.state.tasks.filter(
      (task) => task.id !== id
    );

    this.setState({
      tasks: updatedTasks
    });
  };

  // Calculate cost of one task
  calculateCost = (task) => {
    if (task.hours === 0 || task.roleId === "") {
      return 0;
    }

    const role = this.roles.find(
      (item) => item.id === Number(task.roleId)
    );

    if (!role) {
      return 0;
    }

    return task.hours * role.rate;
  };

  // Calculate total hours
  calculateTotalHours = () => {
    return this.state.tasks.reduce(
      (total, task) => total + task.hours,
      0
    );
  };

  // Calculate total cost
  calculateTotalCost = () => {
    return this.state.tasks.reduce(
      (total, task) => total + this.calculateCost(task),
      0
    );
  };

  render() {
    const totalHours = this.calculateTotalHours();
    const totalCost = this.calculateTotalCost();

    return (
      <div className="app">

        <h1>Estimation Table</h1>

        <button onClick={this.addTask}>
          + Add Task
        </button>

        {this.state.tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          <div>
            {this.state.tasks.map((task) => (
              <TaskRow
                key={task.id}
                data={task}
                roles={this.roles}
                cost={this.calculateCost(task)}
                updateTaskName={this.updateTaskName}
                updateTaskRole={this.updateTaskRole}
                updateTaskHours={this.updateTaskHours}
                deleteTask={this.deleteTask}
              />
            ))}
          </div>
        )}

        <div className="summary">
          <h2>Summary</h2>

          <p>
            <b>Total Tasks:</b> {this.state.tasks.length}
          </p>

          <p>
            <b>Total Hours:</b> {totalHours}
          </p>

          <p>
            <b>Total Cost:</b>{" "}
            {totalCost === 0
              ? "—"
              : "₹" + totalCost.toLocaleString("en-IN")}
          </p>
        </div>

      </div>
    );
  }
}


class TaskRow extends React.Component {
  render() {
    const task = this.props.data;

    return (
      <div className="task-row">

        {/* Task Name */}
        <input
          type="text"
          placeholder="Task name"
          value={task.name}
          onChange={(event) =>
            this.props.updateTaskName(
              task.id,
              event.target.value
            )
          }
        />

        {/* Role */}
        <select
          value={task.roleId}
          onChange={(event) =>
            this.props.updateTaskRole(
              task.id,
              event.target.value
            )
          }
        >
          <option value="">
            Select Role
          </option>

          {this.props.roles.map((role) => (
            <option
              key={role.id}
              value={role.id}
            >
              {role.name}
            </option>
          ))}
        </select>

        {/* Hours */}
        <input
          type="number"
          min="0"
          placeholder="Hours"
          value={task.hours}
          onChange={(event) =>
            this.props.updateTaskHours(
              task.id,
              event.target.value
            )
          }
        />

        {/* Cost */}
        <span>
          {this.props.data.hours === 0 ||
          this.props.data.roleId === ""
            ? "—"
            : "₹" +
              this.props.cost.toLocaleString("en-IN")}
        </span>

        {/* Delete */}
        <button
          onClick={() =>
            this.props.deleteTask(task.id)
          }
        >
          Delete
        </button>

      </div>
    );
  }
}


export default App;