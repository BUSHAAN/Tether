# 📡 Tether – Real-Time Chat App

<p>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/></a>
  <a href="https://socket.io/"><img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.IO"/></a>
  <a href="https://cloudinary.com/"><img src="https://img.shields.io/badge/Cloudinary-0033CC?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary"/></a>
</p>

Tether is a simple real-time chat application built with the MERN stack. Originally started as a practice project to learn **Socket.IO**, it evolved into a fully functional messaging app with real-time capabilities and a responsive UI.

🌐 **Live Demo:** [https://tether.ip-ddns.com](https://tether.ip-ddns.com)

---

## ✨ Features

- 🔒 User Authentication (JWT-based)
- 👥 Contact Management (search and add contacts; sidebar shows your contacts only)
- 💬 Real-Time Messaging (Socket.IO)
- 🖼️ Image Sharing (via Cloudinary)
- 🟢 Online/Offline Presence Indicators
- 🕓 Message History Persistence
- 📬 Unread Message Counts (badges in the sidebar)
- 👤 Unknown Sender Privacy (non-contacts appear by email until you add them)
- 📱 Fully Responsive UI (Mobile-friendly)
- 🔜 Group Chats (coming soon)

---

## 🛠️ Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS  
- Zustand (State Management)

**Backend**  
- Node.js  
- Express.js  
- MongoDB  
- Socket.IO  
- Cloudinary (Image uploads)  
- JWT (Authentication)

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas or local MongoDB
- Cloudinary Account

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tether.git
cd tether
```

#### 2. Setup Backend

```
cd backend
npm install
```

Create a .env file in /backend directory with the following:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV = development
```

Start the backend server:

```
npm run dev
```

#### 3. Setup Frontend

```
cd ../frontend
npm install
npm run dev
```

## 📅 Roadmap

 - ✅ 1-on-1 private messaging
 - ✅ Image messaging
 - ✅ Online/offline presence
 - ✅ Contact management
 - ✅ Unread message counts
 - 🟩 Typing indicators
 - 🟩 Group chats
 - 🟩 Emoji reactions
 - 🟩 Message seen/delivery status


The frontend will run by default on http://localhost:5173

## 📄 License

This project is licensed under the MIT License.

## 🙌 Acknowledgements

Special thanks to the platforms that made this project possible:

- [Socket.IO](https://socket.io/) – Real-time messaging
- [Cloudinary](https://cloudinary.com/) – Image uploads
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) – Cloud database
