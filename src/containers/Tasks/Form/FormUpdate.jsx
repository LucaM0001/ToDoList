import { Component } from "react";
import Button from "../../../components/Button/Button";
import { withFormik } from "formik";
import * as Yup from "yup";

class FormUpdate extends Component {
  render() {
    return (
      <form id="form" className="mt-3">
        <div className="row">
          <div className="form-group mb-3 col-8">
            <input
              type="text"
              name="newTitle"
              value={this.props.values.newTitle}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              className="form-control"
              placeholder="Faire un to do list..."
            />
            {this.props.touched.newTitle && this.props.errors.newTitle && (
              <span style={{ color: "red" }}>{this.props.errors.newTitle}</span>
            )}
          </div>
          <div className="col-4">
            <Button typeBtn="btn-warning" clic={this.props.handleSubmit}>
              <i className="fa fa-edit" aria-hidden="true"></i>
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default withFormik({
  mapPropsToValues: (props) => ({
    id: props.id,
    newTitle: props.title,
  }),
  validationSchema: Yup.object().shape({
    newTitle: Yup.string()
      .min(4, "La tâche doit être >= 4 caractères")
      .max(40, "La tâche doit être <= 40 caractères"),
  }),
  handleSubmit: (values, { props }) => {
    props.update(values.id, values.newTitle);
  },
})(FormUpdate);
