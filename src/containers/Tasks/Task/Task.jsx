import Button from "../../../components/Button/Button";
import { Component } from "react";
import FormUpdate from "../Form/FormUpdate";

class Task extends Component {
  state = {
    id: this.props.id,
    title: this.props.title,
    completed: this.props.completed,
  };

  render() {
    const inputCheckBox = this.state.completed ? (
      <input
        className="form-check-input me-1"
        type="checkbox"
        checked
        onChange={(event) => this.props.taskState(event, this.state.id)}
        value={this.state.title}
      />
    ) : (
      <input
        className="form-check-input me-1"
        type="checkbox"
        onChange={(event) => this.props.taskState(event, this.state.id)}
        value={this.state.title}
      />
    );

    return (
      <>
        <>
          {inputCheckBox}
          {this.state.title}
          <Button
            typeBtn="btn-warning btn-sm float-end"
            css="mx-2"
            clic={() => this.props.showUpdateForm(this.state.id)}
          >
            <i className="fa fa-edit" aria-hidden="true"></i>
          </Button>
          <Button
            typeBtn="btn-danger btn-sm float-end"
            clic={() => this.props.deleteTask(this.state.id)}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </Button>
        </>
        {this.props.isUpdate && (
          <FormUpdate update={this.props.updateTask} {...this.state} />
        )}
      </>
    );
  }
}

export default Task;
