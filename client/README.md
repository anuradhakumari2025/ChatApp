# ChatProject3Parts - Frontend

This is the frontend for the **ChatProject3Parts** application, a chat-based platform that includes features like user management, chat management, and real-time messaging. The frontend is built using React and Material-UI.

---

## Features

- **User Management**: Manage users with features like viewing user details, avatars, and more.
- **Chat Management**: Manage chats, including group chats and individual chats.
- **Real-Time Messaging**: Send and receive messages in real-time.
- **Responsive Design**: Fully responsive UI built with Material-UI.
- **Dashboard**: View user statistics, chat statistics, and other analytics.

---

## Folder Structure
```bash
client/ ├── public/ # Static assets (e.g., images, icons)
├── src/ │
  ├── components/ # Reusable React components │ │
    ├── auth/ProtectRoute.jsx │ │
    ├── dialogs/ # Dialog components (e.g., FileMenu,AddMemberDialog) │ │
    ├── layout/ # Layout components (e.g., AdminSidebar, AppLayout) │ │
    ├── shared/ # Shared components (e.g., AvatarCard, Table) │ │
    ├── specific/ # Feature-specific components (e.g., ChatList, Chart) │
    ├── styles/StyledComponents.jsx │ │
  ├── constants/ # Static data and configuration (e.g., dummyChats.js) │
  ├── lib/ # Utility functions (e.g., transformImage) │
  ├── hooks/  │
  ├── utils/validator.js  │
  ├── pages/ # Page components (e.g., UserManagement, ChatManagement) │
  ├── App.jsx # Main application component │
├── index.html # Entry point for the React app
├── .gitignore # Files and folders to ignore in Git
├── package.json # Project dependencies and scripts
└── README.md # Project documentation

```


---

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system.
- **npm** or **yarn**: Package manager for installing dependencies.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ChatProject3Parts.git
   cd ChatProject3Parts/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or feedback, please contact:

- **Name**: Anuradha Kumari
- **Email**: krianuradha4321@gmail.com
- **GitHub**: anuradhakumari2025


