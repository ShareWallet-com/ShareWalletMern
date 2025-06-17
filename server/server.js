import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import friendRoutes from './routes/friendRoutes.js';
import http from 'http'; 
import { Server } from 'socket.io'; 

const app = express();
const server = http.createServer(app); // ✅ Create server manually
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

// const allowedOrigins = ['http://localhost:5173', 'https://your-frontend-domain.com'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

//api Endpoints


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/friends', friendRoutes);




io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Emit a notification (you can replace this with dynamic logic)
  socket.emit("notification", {
    message: "You have a new notification!",
    timestamp: new Date(),
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});


server.listen(PORT,()=>console.log(`Server is running on port ${PORT}`)
)

