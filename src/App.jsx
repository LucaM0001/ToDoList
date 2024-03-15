import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/all.min.css";
import "./assets/js/all.min.js";
import Tasks from "./containers/Tasks/Tasks";

const app = (props) => {
  return (
    <div className="container py-3">
      <Tasks />
    </div>
  );
};

export default app;
