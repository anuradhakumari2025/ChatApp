import { userSocketIDs } from "../app.js";

export const getOtherMembers = (members, userId) => {
  return members.find((member) => member._id.toString() !== userId.toString());
};

export const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIDs.get(user.toString()));
  // console.log("Mapped Sockets:", sockets); ✅
  return sockets;
};

export const getBase64 = (file) => {
 return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};
