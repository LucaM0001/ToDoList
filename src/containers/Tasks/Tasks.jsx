import { Component } from "react";
import Title from "../../components/Title/Tilte";
import Form from "./Form/FormAdd";
import Filter from "./Filter/Filter";
import Task from "./Task/Task";
import axios from "axios";

class Tasks extends Component {
  state = {
    tasks: [],
    lastIdTask: Date.now(),
    filter: "all",
  };

  componentDidMount() {
    axios
      .get("https://todolist-c84fd-default-rtdb.firebaseio.com/tasks.json")
      .then((response) => {
        const tasksArray = Object.values(response.data);
        this.setState({ tasks: tasksArray });
      })
      .catch((err) => console.log(err));
  }

  handleChangeTaskState = (event, id) => {
    const newTask = { ...this.state.tasks.find((task) => task.id === id) };
    newTask.completed = !newTask.completed;

    const newTaskIndex = this.state.tasks.findIndex((task) => task.id === id);
    const newTasks = [...this.state.tasks];
    newTasks[newTaskIndex] = newTask;

    this.setState({ tasks: newTasks });
  };

  handleAddTask = (task) => {
    const newTask = {
      id: this.state.lastIdTask,
      title: task,
      completed: false,
    };

    const newTasks = [...this.state.tasks];
    newTasks.push(newTask);

    this.setState((oldState) => {
      return {
        tasks: newTasks,
        lastIdTask: Date.now(),
      };
    });

    axios.post(
      "https://todolist-c84fd-default-rtdb.firebaseio.com/tasks.json",
      newTask
    );

    document.getElementById("form").reset();
  };

  handleChangeFilterTask = (option) => {
    this.setState({ filter: option });
  };

  handleShowTask = (filter) => {
    let tasksArray = [];
    if (filter === "all") tasksArray = [...this.state.tasks];
    else {
      if (filter === "todo")
        tasksArray = this.state.tasks.filter(
          (task) => task.completed === false
        );
      else if (filter === "done")
        tasksArray = this.state.tasks.filter((task) => task.completed === true);
    }

    return (
      <ul className="list-group">
        {tasksArray.map((task, index) => (
          <li
            className="list-group-item"
            key={Math.floor(Math.random() * 4000)}
          >
            <Task
              taskState={this.handleChangeTaskState}
              deleteTask={this.handleDeleteTask}
              showUpdateForm={this.handleShowUpdateForm}
              updateTask={this.handleUpdateTask}
              isUpdate={task.update}
              {...task}
            />
          </li>
        ))}
      </ul>
    );
  };

  handleDeleteTask = (id) => {
    if (confirm("Supprimer la tâche ?")) {
      const newTasks = this.state.tasks.filter((task) => task.id !== id);
      this.setState({ tasks: newTasks });
    }
  };

  handleUpdateTask = (id, newTitle) => {
    const newTask = { ...this.state.tasks.filter((task) => task.id === id) };
    const newTaskIndex = this.state.tasks.findIndex((task) => task.id === id);
    newTask.title = newTitle;
    newTask.update = false;

    const newTasks = [...this.state.tasks];
    newTasks[newTaskIndex] = newTask;

    this.setState({ tasks: newTasks });
  };

  handleShowUpdateForm = (id) => {
    const newTask = { ...this.state.tasks.find((task) => task.id === id) };
    newTask.update = true;

    const newTaskIndex = this.state.tasks.findIndex((task) => task.id === id);
    const newTasks = [...this.state.tasks];
    newTasks[newTaskIndex] = newTask;

    this.setState({ tasks: newTasks });
  };

  render() {
    return (
      <>
        {/* Titre */}
        <Title css="mb-3">
          ToDoList App <i className="fa fa-tasks" aria-hidden="true"></i>
        </Title>
        {/* Formulaire d'ajout de tâche */}
        <Form validation={this.handleAddTask} />
        {/* Système de filtrage des tâche */}
        <Filter filterTask={this.handleChangeFilterTask} />
        {/* Les tâches */}
        {this.handleShowTask(this.state.filter)}
      </>
    );
  }
}

export default Tasks;
