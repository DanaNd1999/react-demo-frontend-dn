import Error from "../Helpers/Error";

const PermissionsForm = (props: {
  error: string;
  nameRef: any;
  handler: any;
  name?: string;
  fieldHandler?: any;
}) => {
  return (
    <div className="card-body">
      <form
        onSubmit={(event) => {
          props.handler(event);
        }}
      >
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            ref={props.nameRef}
            value={props.name}
            onChange={(e) => {
              props.fieldHandler(e);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <Error message={props.error} />
    </div>
  );
};

export default PermissionsForm;
