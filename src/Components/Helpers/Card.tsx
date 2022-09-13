const Card = (props: any) => {
  return (
    <div className="row d-flex justify-content-center align-items-top mt-5">
      <div className="card" style={{ width: "80%", height: "auto" }}>
        <div className="col-md-12">
          <div className="card-body">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
