export const dummyChat = [
  {
    avatar: ["/anuradha.png"],
    name: "Anuradha",
    _id: "1",
    groupChat: false,
    members: ["1", "2", "3"],
  },
  {
    avatar: ["/aniket.png"],
    name: "Aniket",
    _id: "2",
    groupChat: false,
    members: ["1", "2", "3"],
  },
  {
    avatar: ["/ojas.png"],
    name: "Ojas",
    _id: "3",
    groupChat: false,
    members: ["1", "2", "3"],
  },
  {
    avatar: ["/sujal.png"],
    name: "Sujal",
    _id: "4",
    groupChat: false,
    members: ["1", "2", "3"],
  },
  {
    avatar: ["/pallavi.png"],
    name: "Pallavi",
    _id: "5",
    groupChat: false,
    members: ["1", "2", "3"],
  },
  {
    avatar: ["/ashwini.png"],
    name: "Ashwini",
    _id: "6",
    groupChat: false,
    members: ["1", "2", "3"],
  },
  {
    avatar: ["/omkar.png"],
    name: "Omkar",
    _id: "7",
    groupChat: false,
    members: ["1", "2", "3"],
  },
  {
    avatar: ["/aakanksha.png"],
    name: "Aakanksha",
    _id: "8",
    groupChat: false,
    members: ["1", "2", "3"],
  },
  {
    avatar: ["/chandan.png"],
    name: "Chandan",
    _id: "9",
    groupChat: false,
    members: ["1", "2", "3"],
  },
  {
    avatar: ["/gauri.png"],
    name: "Gauri",
    _id: "10",
    groupChat: false,
    members: ["1", "2", "3"],
  },
];

export const sampleUsers = [
  {
    avatar: "/vite.svg",
    name: "Anuradha",
    _id: "1",
  },
  {
    avatar: "/vite.svg",
    name: "Anuradha Kumari",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: "/vite.svg",
      name: "Anuradha",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: "/vite.svg",
      name: "Anuradha Kumari",
    },
    _id: "2",
  },
];

export const sampleMessages = [
  {
    attachments: [],
    content: "ojas gavar kaisa hi",
    _id: "ojasbidkar",
    sender: {
      _id: "user._id",
      name: "Anu",
    },
    chat: "chatId",
    createdAt: "2025-04-15T18:30:00.000Z",
  },
  {
    attachments: [{ public_id: "abbu", url: "/anuradha.png" }],
    _id: "ojasbid",
    sender: {
      _id: "askkdlf",
      name: "beautiful",
    },
    chat: "chatId",
    createdAt: "2025-04-17T18:30:00.000Z",
  },
];

export const dashboardData = {
  users: [
    {
      avatar: ["/anuradha.png"],
      name: "Anuradha",
      _id: "1",
      username: "anu",
      friends: 20,
      groups: 5,
    },
    {
      avatar: ["/aniket.png"],
      name: "Aniket",
      _id: "2",
      username: "anu",
      friends: 20,
      groups: 5,
    },
    {
      avatar: ["/ojas.png"],
      name: "Ojas",
      _id: "3",
      username: "anu",
      friends: 20,
      groups: 5,
    },
  ],
  chats: [
    {
      avatar: ["/anuradha.png"],
      name: "Anuradha",
      _id: "1",
      groupChat: false,
      members: [
        { avatar: ["/ojas.png"], _id: "1" },
        {
          avatar: ["/anuradha.png"],
          _id: "2",
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        avatar: ["/anuradha.png"],
        name: "Anuradha",
      },
    },

    {
      avatar: ["/aniket.png"],
      name: "Aniket",
      _id: "2",
      groupChat: false,
      members: [
        { avatar: ["/aniket.png"], _id: "1" },
        {
          avatar: ["/vite.svg"],
          _id: "2",
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Aniket",
        avatar: ["/aniket.png"],
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "Gadhe ka msg hi",
      _id: "anikete",
      groupChat: false,
      sender: {
        avatar: "/aniket.png",
        name: "Ojas",
      },
      chat: "krlo",
      createdAt: "2025-04-20T18:30:00.000Z",
    },
    {
      attachments: [
        {
          public_id: "hjklg",
          url: "/ojas.png",
        },
      ],
      content: "Gavar ka msg hi",
      _id: "baklol",
      groupChat: false,
      sender: {
        avatar: "/ojas.png",
        name: "Oja",
      },
      chat: "krlo abhi just",
      createdAt: "2025-04-20T18:30:00.000Z",
    },
  ],
};
