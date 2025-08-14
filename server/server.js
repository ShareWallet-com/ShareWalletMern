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

const allowedOrigins = ['https://sharewalletmern-frontend.onrender.com'];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true)
        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        } else {
            return callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}
app.options('*', cors(corsOptions))

app.use(cors(corsOptions))


app.use(express.json());
app.use(cookieParser());




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

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    next();
  }
});


server.listen(PORT,()=>console.log(`Server is running on port ${PORT}`)
)

