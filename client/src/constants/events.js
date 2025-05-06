const ALERT = "ALERT";
const REFETCH_CHATS = "REFETCH_CHATS";

const NEW_ATTACHMENT = "NEW_ATTACHMENT";
const NEW_MESSAGE_ALERT = "NEW_MESSAGE_ALERT";

const NEW_REQUEST = "NEW_REQUEST";
const NEW_MESSAGE = "NEW_MESSAGE";

const START_TYPING = "START_TYPING";
const STOP_TYPING = "STOP_TYPING";

const CHAT_JOINED = "CHAT_JOINED";
const CHAT_LEAVED = "CHAT_LEAVED";

const ONLINE_USERS = "ONLINE_USERS";

export {
  ALERT,
  REFETCH_CHATS,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
  CHAT_JOINED,
  CHAT_LEAVED,
  ONLINE_USERS,
};

// ✅ This code is a module that exports constants representing various events in a chat application. These constants are used to identify specific actions or notifications that can occur within the application, such as sending messages, receiving alerts, and managing chat states. By using constants, the code improves readability and maintainability, making it easier to manage event-driven interactions in the chat system.