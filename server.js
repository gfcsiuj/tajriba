const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// تخزين الغرف والمستخدمين
const rooms = new Map();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('مستخدم جديد متصل:', socket.id);

    socket.on('join-room', (data) => {
        const { roomId, mode } = data;
        
        socket.join(roomId);
        
        if (!rooms.has(roomId)) {
            rooms.set(roomId, new Set());
        }
        
        rooms.get(roomId).add({
            id: socket.id,
            mode: mode
        });
        
        console.log(`المستخدم ${socket.id} انضم للغرفة ${roomId} في وضع ${mode}`);
        
        socket.emit('room-joined', { roomId, userCount: rooms.get(roomId).size });
        io.to(roomId).emit('user-connected', { userId: socket.id, mode });
    });

    socket.on('send-image', (data) => {
        const { roomId, image } = data;
        
        // إرسال الصورة لجميع المستخدمين في الغرفة عدا المرسل
        socket.to(roomId).emit('image-received', {
            image: image,
            senderId: socket.id,
            timestamp: new Date().toISOString()
        });
        
        console.log(`صورة مرسلة من ${socket.id} إلى الغرفة ${roomId}`);
    });

    socket.on('disconnect', () => {
        console.log('مستخدم غادر:', socket.id);
        
        // إزالة المستخدم من جميع الغرف
        rooms.forEach((users, roomId) => {
            users.forEach(user => {
                if (user.id === socket.id) {
                    users.delete(user);
                    io.to(roomId).emit('user-disconnected', { userId: socket.id });
                }
            });
            
            if (users.size === 0) {
                rooms.delete(roomId);
            }
        });
    });
});

http.listen(PORT, () => {
    console.log(`الخادم يعمل على المنفذ ${PORT}`);
});