import Button from "../../../components/Button/Button";

const filter = (props) => {
  return (
    <div className="btn-group mb-3">
      <Button
        typeBtn="btn-outline-success"
        clic={() => props.filterTask("all")}
      >
        <i className="fa fa-tasks" aria-hidden="true"></i>
      </Button>
      <Button
        typeBtn="btn-outline-success"
        clic={() => props.filterTask("todo")}
      >
        <i className="fa fa-close" aria-hidden="true"></i>
      </Button>
      <Button
        typeBtn="btn-outline-success"
        clic={() => props.filterTask("done")}
      >
        <i className="fa fa-check-circle" aria-hidden="true"></i>
      </Button>
    </div>
  );
};

export default filter;
