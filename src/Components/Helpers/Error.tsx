const Error = (props: { message: string }) => {
  return <div style={{ color: "red" }}>{props.message}</div>;
};

export default Error;
