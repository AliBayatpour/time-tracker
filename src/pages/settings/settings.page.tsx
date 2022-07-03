import { Button } from "react-bootstrap";

const Settings: React.FC = () => {
  const onSetRestTime = (event: any) => {
    event.preventDefault();
    console.log(event.target.elements.rest.value);
    localStorage.setItem("restTime", event.target.elements.rest.value);
  };
  return (
    <div className="container-lg text-light">
      <h1 className="mb-4">Settings</h1>
      <div className="row">
        <form onSubmit={onSetRestTime}>
          <div className="col-12 col-lg-2">
            <div className="form-group">
              <label htmlFor="restInput">Rest Time (min)</label>
              <input
                type="number"
                name="rest"
                className="form-control"
                id="restInput"
                placeholder="Rest Time (min)"
                defaultValue={5}
              />
            </div>
          </div>
          <div className="col-12">
            <Button type="submit" variant="primary" className="mt-3">
              Change rest time
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Settings;
