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

// تخزين الغرف
const rooms = new Map();

// تقديم الملفات الثابتة
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('مستخدم جديد متصل:', socket.id);

    // إنشاء غرفة جديدة (للمرسل)
    socket.on('create-room', (data) => {
        const { code } = data;
        
        // إنشاء الغرفة
        if (!rooms.has(code)) {
            rooms.set(code, {
                sender: socket.id,
                receivers: new Set(),
                createdAt: Date.now()
            });
            
            socket.join(code);
            socket.roomCode = code;
            socket.role = 'sender';
            
            socket.emit('room-created', { 
                code: code,
                message: 'تم إنشاء الغرفة بنجاح' 
            });
            
            console.log(`غرفة جديدة: ${code} - المرسل: ${socket.id}`);
        }
    });

    // الانضمام لغرفة (للمستقبل)
    socket.on('join-room', (data) => {
        const { code } = data;
        
        if (rooms.has(code)) {
            const room = rooms.get(code);
            room.receivers.add(socket.id);
            
            socket.join(code);
            socket.roomCode = code;
            socket.role = 'receiver';
            
            const deviceCount = room.receivers.size + 1; // +1 للمرسل
            
            // إخبار المستقبل
            socket.emit('joined-room', { 
                code: code,
                deviceCount: deviceCount,
                message: 'تم الانضمام للغرفة بنجاح'
            });
            
            // إخبار جميع الأجهزة في الغرفة
            io.to(code).emit('device-joined', {
                deviceId: socket.id,
                deviceCount: deviceCount,
                message: 'انضم جهاز جديد'
            });
            
            console.log(`انضم ${socket.id} للغرفة ${code} - عدد الأجهزة: ${deviceCount}`);
        } else {
            socket.emit('room-not-found', {
                message: 'كود الغرفة غير صحيح'
            });
        }
    });

    // إرسال صورة
    socket.on('send-image', (data) => {
        const { code, image } = data;
        
        if (rooms.has(code)) {
            // إرسال الصورة لجميع المستقبلين
            socket.to(code).emit('image-received', {
                image: image,
                senderId: socket.id,
                timestamp: Date.now()
            });
            
            console.log(`صورة مرسلة من ${socket.id} في الغرفة ${code}`);
        }
    });

    // قطع الاتصال
    socket.on('disconnect', () => {
        console.log('مستخدم غادر:', socket.id);
        
        if (socket.roomCode) {
            const room = rooms.get(socket.roomCode);
            
            if (room) {
                if (socket.role === 'sender') {
                    // إذا غادر المرسل، حذف الغرفة
                    io.to(socket.roomCode).emit('sender-disconnected', {
                        message: 'غادر المرسل - تم إنهاء الجلسة'
                    });
                    rooms.delete(socket.roomCode);
                } else {
                    // إذا غادر مستقبل
                    room.receivers.delete(socket.id);
                    const deviceCount = room.receivers.size + 1;
                    
                    io.to(socket.roomCode).emit('device-disconnected', {
                        deviceId: socket.id,
                        deviceCount: deviceCount,
                        message: 'غادر أحد الأجهزة'
                    });
                }
            }
        }
    });
});

// تنظيف الغرف القديمة كل 5 دقائق
setInterval(() => {
    const now = Date.now();
    const timeout = 30 * 60 * 1000; // 30 دقيقة
    
    rooms.forEach((room, code) => {
        if (now - room.createdAt > timeout) {
            io.to(code).emit('session-expired', {
                message: 'انتهت صلاحية الجلسة'
            });
            rooms.delete(code);
            console.log(`حذف الغرفة المنتهية: ${code}`);
        }
    });
}, 5 * 60 * 1000);

http.listen(PORT, () => {
    console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`);
    console.log('📱 افتح هذا الرابط على الأجهزة المختلفة');
});
