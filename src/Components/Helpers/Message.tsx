const Message = (props: { message: string; type: string }) => {
  if (props.type == "error") {
    return <div style={{ color: "red" }}>{props.message}</div>;
  } else {
    return <div style={{ color: "blue" }}>{props.message}</div>;
  }
};

export default Message;
