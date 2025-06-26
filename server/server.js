import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import friendRoutes from './routes/friendRoutes.js';
import groupRouter from './routes/groupRoutes.js';

import http from 'http'; 
import { Server } from 'socket.io'; 

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: ['https://sharewalletmern-frontend.onrender.com'],
    credentials: true
  }
});


export { io };
const PORT = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173','https://sharewalletmern-frontend.onrender.com'];


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));




app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/friends', friendRoutes);
app.use('/api/groups', groupRouter)



const userSocketMap = new Map(); 

io.on('connection', (socket) => {
  socket.on('register', (userId) => {
    userSocketMap.set(userId, socket.id);
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of userSocketMap) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  });
});

app.set('userSocketMap', userSocketMap); 
app.set('io', io);


server.listen(PORT,()=>console.log(`Server is running on port ${PORT}`)
)

