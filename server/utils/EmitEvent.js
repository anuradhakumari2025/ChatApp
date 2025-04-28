const emitEvent = (req, event, users, data) => {
  console.log(
    "emmitting event",
    event,
    "data are :- ",
    data,
    "Users are:- ",
    users
  );
};
export default emitEvent;
