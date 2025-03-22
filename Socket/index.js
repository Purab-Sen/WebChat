import { Server } from "socket.io";
import { configDotenv } from "dotenv";

configDotenv();

const io = new Server(9000, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

let activeUsers = new Map();

const addUser = (userData, socketId) => {
  activeUsers.set(userData.sub,{...userData,socketId});
};

const getSocketIdOfUser = (usersub)=>{
    const user = activeUsers.get(usersub); //if user is offline then user entry won't be present.
    return user? activeUsers.get(usersub).socketId: null;
}

io.on("connection", (socket) => {
  console.log(`user connected`);

  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id); //socked.id is new for different user, it is not same.
    io.emit("getUsers",[...activeUsers.values()]);
  });

  socket.on("sendMessage",(message)=>{
    const receiverSocketId = getSocketIdOfUser(message.receiverId);
    if(receiverSocketId && receiverSocketId !== socket.id)
        io.to(receiverSocketId).emit('getMessage',message);
  });

  socket.on("disconnect",()=>{
    console.log("client disconnected");
    for(let [key,value] of activeUsers){
      if(value.socketId === socket.id){
        activeUsers.delete(key);
        break;
      }
    }
    io.emit("getUsers",[...activeUsers.values()]);
  })
});
