# 📡 Tether – Real-Time Chat App

Tether is a simple real-time chat application built with the MERN stack. Originally started as a practice project to learn **Socket.IO**, it evolved into a fully functional messaging app with real-time capabilities and a responsive UI.

🌐 **Live Demo:** [https://tether.ip-ddns.com](https://tether.ip-ddns.com)

---

## ✨ Features

- 🔒 User Authentication (JWT-based)
- 💬 Real-Time Messaging (Socket.IO)
- 🖼️ Image Sharing (via Cloudinary)
- 🟢 Online/Offline Presence Indicators
- 🕓 Message History Persistence
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
