import { withFormik } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";

import { Component } from "react";

class Form extends Component {
  render() {
    return (
      <form id="form">
        <div className="row">
          <div className="form-group mb-3 col-8">
            <input
              type="text"
              name="newTask"
              className="form-control"
              value={this.props.values.titre}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              placeholder="Faire un to do list..."
            />
            {this.props.touched.newTask && this.props.errors.newTask && (
              <span style={{ color: "red" }}>{this.props.errors.newTask}</span>
            )}
          </div>
          <div className="col-4">
            <Button
              type="submit"
              typeBtn="btn-success"
              clic={this.props.handleSubmit}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    newTask: "",
  }),
  validationSchema: Yup.object().shape({
    newTask: Yup.string()
      .min(4, "La tâche doit être >= 4 caractères")
      .max(40, "La tâche doit être <= 40 caractères")
      .required("Veuillez entrez une tâche !"),
  }),
  handleSubmit: (values, { props }) => {
    props.validation(values.newTask);
  },
})(Form);
