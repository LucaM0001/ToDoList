import { Component } from "react";
import Title from "../../components/Title/Tilte";
import Form from "./Form/FormAdd";
import Filter from "./Filter/Filter";
import Task from "./Task/Task";

class Tasks extends Component {
  state = {
    tasks: [],
    lastIdTask: 1,
    filter: "all",
  };

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
        lastIdTask: oldState.lastIdTask + 1,
      };
    });

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
        {tasksArray.map((task) => (
          <Task
            taskState={this.handleChangeTaskState}
            key={task.id}
            deleteTask={this.handleDeleteTask}
            updateTask={this.handleUpdateTask}
            {...task}
          />
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

  handleUpdateTask = (id) => {
    console.log(id);
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
