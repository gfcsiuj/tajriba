<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نقل الصور بإشارة اليد</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .main-panel {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        /* قسم اختيار الوضع */
        .mode-selector {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            justify-content: center;
        }

        .mode-btn {
            flex: 1;
            max-width: 300px;
            padding: 20px;
            font-size: 1.3em;
            border: 3px solid #e0e0e0;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: white;
            color: #333;
        }

        .mode-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .mode-btn.active {
            border-color: #667eea;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }

        .mode-btn.send-mode.active {
            background: linear-gradient(135deg, #00c853, #64dd17);
            border-color: #00c853;
        }

        .mode-btn.receive-mode.active {
            background: linear-gradient(135deg, #2196f3, #03a9f4);
            border-color: #2196f3;
        }

        /* قسم الاتصال */
        .connection-section {
            display: none;
            padding: 25px;
            background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
            border-radius: 15px;
            margin-bottom: 30px;
            animation: slideDown 0.5s ease;
        }

        .connection-section.show {
            display: block;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .send-connection {
            text-align: center;
        }

        .code-display {
            background: white;
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .code-label {
            font-size: 1.1em;
            color: #666;
            margin-bottom: 10px;
        }

        .code-value {
            font-size: 2.5em;
            font-weight: bold;
            color: #667eea;
            font-family: 'Courier New', monospace;
            letter-spacing: 8px;
            padding: 15px;
            background: #f0f0f0;
            border-radius: 10px;
            margin: 10px 0;
            user-select: all;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .code-value:hover {
            background: #e0e0e0;
            transform: scale(1.02);
        }

        .copy-btn-large {
            padding: 15px 40px;
            font-size: 1.2em;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px;
        }

        .copy-btn-large:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .receive-connection {
            text-align: center;
        }

        .code-input-group {
            display: flex;
            gap: 15px;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
        }

        .code-input {
            padding: 15px 25px;
            font-size: 1.5em;
            text-align: center;
            border: 3px solid #e0e0e0;
            border-radius: 10px;
            width: 300px;
            font-family: 'Courier New', monospace;
            letter-spacing: 5px;
            transition: all 0.3s ease;
        }

        .code-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .connect-btn-large {
            padding: 15px 40px;
            font-size: 1.2em;
            background: linear-gradient(135deg, #4caf50, #45a049);
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .connect-btn-large:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.4);
        }

        .connect-btn-large:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }

        /* حالة الاتصال */
        .connection-status-box {
            display: none;
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
            text-align: center;
            font-size: 1.2em;
            animation: pulse 2s infinite;
        }

        .connection-status-box.show {
            display: block;
        }

        .connection-status-box.connected {
            background: linear-gradient(135deg, #d4edda, #c3e6cb);
            color: #155724;
            border: 2px solid #28a745;
        }

        .connection-status-box.waiting {
            background: linear-gradient(135deg, #fff3cd, #ffeeba);
            color: #856404;
            border: 2px solid #ffc107;
        }

        .connection-status-box.error {
            background: linear-gradient(135deg, #f8d7da, #f5c6cb);
            color: #721c24;
            border: 2px solid #dc3545;
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.8;
            }
        }

        /* منطقة المحتوى */
        .content-area {
            display: none;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 30px;
        }

        .content-area.show {
            display: grid;
        }

        @media (max-width: 768px) {
            .content-area {
                grid-template-columns: 1fr;
            }
            
            .mode-selector {
                flex-direction: column;
            }
            
            .code-input-group {
                flex-direction: column;
                width: 100%;
            }
            
            .code-input {
                width: 100%;
            }
        }

        .video-section, .image-section {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 20px;
        }

        .section-title {
            font-size: 1.3em;
            color: #333;
            margin-bottom: 15px;
        }

        .video-container {
            position: relative;
            width: 100%;
            border-radius: 15px;
            overflow: hidden;
            background: #000;
            aspect-ratio: 4/3;
        }

        #canvas {
            width: 100%;
            height: 100%;
            display: block;
        }

        .hand-status {
            position: absolute;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            color: white;
            backdrop-filter: blur(10px);
            z-index: 10;
        }

        .hand-status.open {
            background: rgba(76, 175, 80, 0.9);
        }

        .hand-status.closed {
            background: rgba(244, 67, 54, 0.9);
        }

        .hand-status.waiting {
            background: rgba(255, 152, 0, 0.9);
        }

        .image-preview {
            width: 100%;
            aspect-ratio: 4/3;
            border-radius: 15px;
            background: #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            border: 3px dashed #999;
        }

        .upload-area {
            text-align: center;
            padding: 40px;
            cursor: pointer;
        }

        #fileInput {
            display: none;
        }

        /* الإشعارات */
        .notification {
            position: fixed;
            top: 30px;
            right: 30px;
            padding: 20px 30px;
            border-radius: 15px;
            color: white;
            font-size: 1.1em;
            font-weight: bold;
            display: none;
            animation: slideInRight 0.5s ease;
            z-index: 2000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .notification.show {
            display: block;
        }

        .notification.success {
            background: linear-gradient(135deg, #4caf50, #45a049);
        }

        .notification.error {
            background: linear-gradient(135deg, #f44336, #e53935);
        }

        .notification.info {
            background: linear-gradient(135deg, #2196f3, #1976d2);
        }

        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        /* عداد الأجهزة المتصلة */
        .devices-counter {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(255, 255, 255, 0.9);
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .devices-counter .count {
            color: #4caf50;
            font-size: 1.2em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✋ نقل الصور بإشارة اليد 📸</h1>
            <p>انقل الصور بين الأجهزة بحركة يدك</p>
        </div>

        <div class="main-panel">
            <!-- اختيار الوضع -->
            <div class="mode-selector">
                <div class="mode-btn send-mode" onclick="setMode('send')">
                    <div style="font-size: 3em; margin-bottom: 10px;">📤</div>
                    <div>وضع الإرسال</div>
                    <small style="opacity: 0.7; font-size: 0.8em;">لإرسال الصور لجهاز آخر</small>
                </div>
                <div class="mode-btn receive-mode" onclick="setMode('receive')">
                    <div style="font-size: 3em; margin-bottom: 10px;">📥</div>
                    <div>وضع الاستقبال</div>
                    <small style="opacity: 0.7; font-size: 0.8em;">لاستقبال الصور من جهاز آخر</small>
                </div>
            </div>

            <!-- قسم الاتصال للإرسال -->
            <div class="connection-section send-connection" id="sendConnection">
                <h2>🔗 كود الاتصال</h2>
                <div class="code-display">
                    <div class="code-label">شارك هذا الكود مع الجهاز المستقبل:</div>
                    <div class="code-value" id="sessionCode" onclick="copyCode()">------</div>
                    <button class="copy-btn-large" onclick="copyCode()">
                        📋 نسخ الكود
                    </button>
                </div>
                <div class="connection-status-box waiting" id="senderStatus">
                    ⏳ في انتظار اتصال الجهاز المستقبل...
                </div>
            </div>

            <!-- قسم الاتصال للاستقبال -->
            <div class="connection-section receive-connection" id="receiveConnection">
                <h2>🔗 الاتصال بالمرسل</h2>
                <div class="code-input-group">
                    <input type="text" 
                           class="code-input" 
                           id="receiverCodeInput" 
                           placeholder="أدخل الكود"
                           maxlength="6">
                    <button class="connect-btn-large" onclick="connectToSender()">
                        🔗 اتصال
                    </button>
                </div>
                <div class="connection-status-box" id="receiverStatus"></div>
            </div>

            <!-- منطقة المحتوى الرئيسية -->
            <div class="content-area" id="contentArea">
                <!-- عداد الأجهزة -->
                <div class="devices-counter">
                    👥 الأجهزة المتصلة: <span class="count" id="devicesCount">0</span>
                </div>

                <!-- قسم الكاميرا -->
                <div class="video-section">
                    <h3 class="section-title">📹 كاميرا التعرف على اليد</h3>
                    <div class="video-container">
                        <video id="video" autoplay playsinline style="display: none;"></video>
                        <canvas id="canvas"></canvas>
                        <div class="hand-status waiting" id="handStatus">
                            في انتظار اليد...
                        </div>
                    </div>
                </div>

                <!-- قسم الصورة -->
                <div class="image-section">
                    <h3 class="section-title" id="imageSectionTitle">🖼️ منطقة الصورة</h3>
                    <div class="image-preview">
                        <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
                            <div style="font-size: 3em;">📁</div>
                            <p>اضغط لتحميل صورة</p>
                            <p style="font-size: 0.9em; opacity: 0.7;">أو اسحب الصورة هنا</p>
                        </div>
                        <img id="displayImage" style="display: none; width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <input type="file" id="fileInput" accept="image/*" onchange="handleFileSelect(event)">
                </div>
            </div>
        </div>
    </div>

    <!-- الإشعارات -->
    <div class="notification" id="notification"></div>

    <!-- المكتبات -->
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"></script>
    <script src="/socket.io/socket.io.js"></script>

    <script>
        // المتغيرات الأساسية
        let currentMode = null;
        let socket = null;
        let sessionCode = null;
        let isConnected = false;
        let currentImage = null;
        let lastHandState = null;
        let gestureSequence = [];
        let connectedDevices = 0;

        // توليد كود جلسة عشوائي
        function generateSessionCode() {
            return Math.random().toString(36).substring(2, 8).toUpperCase();
        }

        // تحديد الوضع
        function setMode(mode) {
            currentMode = mode;
            
            // إعادة تعيين الأزرار
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // إخفاء جميع الأقسام
            document.querySelectorAll('.connection-section').forEach(section => {
                section.classList.remove('show');
            });
            
            if (mode === 'send') {
                // وضع الإرسال
                document.querySelector('.send-mode').classList.add('active');
                document.getElementById('sendConnection').classList.add('show');
                document.getElementById('uploadArea').style.display = 'block';
                document.getElementById('imageSectionTitle').textContent = '📤 الصورة المراد إرسالها';
                
                // توليد كود جديد
                sessionCode = generateSessionCode();
                document.getElementById('sessionCode').textContent = sessionCode;
                
                // الاتصال بالخادم
                connectToServer('sender');
                
                showNotification('تم توليد كود الجلسة: ' + sessionCode, 'info');
                
            } else if (mode === 'receive') {
                // وضع الاستقبال
                document.querySelector('.receive-mode').classList.add('active');
                document.getElementById('receiveConnection').classList.add('show');
                document.getElementById('uploadArea').style.display = 'none';
                document.getElementById('imageSectionTitle').textContent = '📥 الصورة المستلمة';
                
                showNotification('أدخل كود الجلسة للاتصال', 'info');
            }
        }

        // الاتصال بالخادم
        function connectToServer(role) {
            // الاتصال بالخادم المحلي
            socket = io();
            
            socket.on('connect', () => {
                console.log('متصل بالخادم');
                
                if (role === 'sender') {
                    // إنشاء غرفة جديدة
                    socket.emit('create-room', { code: sessionCode });
                }
            });
            
            // استقبال تأكيد إنشاء الغرفة
            socket.on('room-created', (data) => {
                console.log('تم إنشاء الغرفة:', data.code);
                document.getElementById('senderStatus').innerHTML = 
                    '⏳ في انتظار اتصال الجهاز المستقبل...<br>كود الجلسة: ' + data.code;
            });
            
            // عندما ينضم جهاز للغرفة
            socket.on('device-joined', (data) => {
                isConnected = true;
                connectedDevices = data.deviceCount;
                updateConnectionStatus();
                showNotification('✅ تم اتصال جهاز جديد!', 'success');
                
                // عرض منطقة المحتوى
                document.getElementById('contentArea').classList.add('show');
                document.getElementById('devicesCount').textContent = connectedDevices;
                
                if (currentMode === 'send') {
                    document.getElementById('senderStatus').className = 'connection-status-box connected show';
                    document.getElementById('senderStatus').innerHTML = 
                        '✅ متصل بنجاح! يمكنك الآن إرسال الصور';
                }
            });
            
            // استقبال صورة
            socket.on('image-received', (data) => {
                if (currentMode === 'receive') {
                    displayReceivedImage(data.image);
                    showNotification('📸 تم استلام صورة جديدة!', 'success');
                }
            });
            
            // عند انقطاع الاتصال
            socket.on('device-disconnected', (data) => {
                connectedDevices = data.deviceCount;
                document.getElementById('devicesCount').textContent = connectedDevices;
                showNotification('⚠️ انقطع اتصال أحد الأجهزة', 'error');
                
                if (connectedDevices === 0) {
                    isConnected = false;
                    updateConnectionStatus();
                }
            });
            
            socket.on('disconnect', () => {
                isConnected = false;
                showNotification('❌ انقطع الاتصال بالخادم', 'error');
            });
            
            // خطأ في الاتصال
            socket.on('error', (error) => {
                showNotification('❌ خطأ: ' + error, 'error');
            });
        }

        // الاتصال بالمرسل (للمستقبل)
        function connectToSender() {
            const code = document.getElementById('receiverCodeInput').value.toUpperCase().trim();
            
            if (!code) {
                showNotification('⚠️ الرجاء إدخال كود الجلسة', 'error');
                return;
            }
            
            sessionCode = code;
            
            // الاتصال بالخادم
            socket = io();
            
            socket.on('connect', () => {
                // الانضمام للغرفة
                socket.emit('join-room', { code: sessionCode });
                
                document.getElementById('receiverStatus').classList.add('show', 'waiting');
                document.getElementById('receiverStatus').innerHTML = '⏳ جاري الاتصال...';
            });
            
            // تأكيد الانضمام
            socket.on('joined-room', (data) => {
                isConnected = true;
                connectedDevices = data.deviceCount;
                
                document.getElementById('receiverStatus').className = 'connection-status-box connected show';
                document.getElementById('receiverStatus').innerHTML = 
                    '✅ متصل بنجاح! في انتظار الصور...';
                
                document.getElementById('contentArea').classList.add('show');
                document.getElementById('devicesCount').textContent = connectedDevices;
                
                showNotification('✅ تم الاتصال بنجاح!', 'success');
            });
            
            // خطأ في الكود
            socket.on('room-not-found', () => {
                document.getElementById('receiverStatus').className = 'connection-status-box error show';
                document.getElementById('receiverStatus').innerHTML = 
                    '❌ كود الجلسة غير صحيح أو منتهي الصلاحية';
                showNotification('❌ كود الجلسة غير صحيح', 'error');
            });
            
            // نفس معالجات الأحداث السابقة
            socket.on('device-joined', (data) => {
                connectedDevices = data.deviceCount;
                document.getElementById('devicesCount').textContent = connectedDevices;
                showNotification('👥 انضم جهاز جديد للجلسة', 'info');
            });
            
            socket.on('image-received', (data) => {
                displayReceivedImage(data.image);
                showNotification('📸 تم استلام صورة جديدة!', 'success');
            });
        }

        // نسخ الكود
        function copyCode() {
            const code = document.getElementById('sessionCode').textContent;
            if (code !== '------') {
                navigator.clipboard.writeText(code).then(() => {
                    showNotification('✅ تم نسخ الكود: ' + code, 'success');
                }).catch(() => {
                    // طريقة بديلة
                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNodeContents(document.getElementById('sessionCode'));
                    selection.removeAllRanges();
                    selection.addRange(range);
                    document.execCommand('copy');
                    showNotification('✅ تم نسخ الكود', 'success');
                });
            }
        }

        // معالجة اختيار الصورة
        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentImage = e.target.result;
                    document.getElementById('displayImage').src = currentImage;
                    document.getElementById('displayImage').style.display = 'block';
                    document.getElementById('uploadArea').style.display = 'none';
                    showNotification('✅ تم تحميل الصورة', 'success');
                };
                reader.readAsDataURL(file);
            }
        }

        // عرض الصورة المستلمة
        function displayReceivedImage(imageData) {
            document.getElementById('displayImage').src = imageData;
            document.getElementById('displayImage').style.display = 'block';
            document.getElementById('uploadArea').style.display = 'none';
        }

        // إرسال الصورة
        function sendImage() {
            if (!isConnected || !socket) {
                showNotification('⚠️ لا يوجد اتصال', 'error');
                return;
            }
            
            if (!currentImage) {
                showNotification('⚠️ الرجاء تحميل صورة أولاً', 'error');
                return;
            }
            
            socket.emit('send-image', {
                code: sessionCode,
                image: currentImage
            });
            
            showNotification('✅ تم إرسال الصورة بنجاح!', 'success');
        }

        // تحديث حالة الاتصال
        function updateConnectionStatus() {
            if (isConnected) {
                // تحديث الواجهة عند الاتصال
            } else {
                // تحديث الواجهة عند انقطاع الاتصال
            }
        }

        // عرض الإشعارات
        function showNotification(message, type = 'info') {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification ${type} show`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 4000);
        }

        // إعداد السحب والإفلات
        const imagePreview = document.querySelector('.image-preview');
        
        imagePreview.addEventListener('dragover', (e) => {
            e.preventDefault();
            imagePreview.style.background = 'rgba(103, 126, 234, 0.1)';
        });
        
        imagePreview.addEventListener('dragleave', () => {
            imagePreview.style.background = '#e0e0e0';
        });
        
        imagePreview.addEventListener('drop', (e) => {
            e.preventDefault();
            imagePreview.style.background = '#e0e0e0';
            
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    currentImage = event.target.result;
                    document.getElementById('displayImage').src = currentImage;
                    document.getElementById('displayImage').style.display = 'block';
                    document.getElementById('uploadArea').style.display = 'none';
                    showNotification('✅ تم تحميل الصورة', 'success');
                };
                reader.readAsDataURL(file);
            }
        });

        // MediaPipe Hands للتعرف على اليد
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        const hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        // التحقق من حالة اليد
        function checkHandState(landmarks) {
            const fingers = [];
            
            // الإبهام
            if (landmarks[4].x < landmarks[3].x) {
                fingers.push(1);
            } else {
                fingers.push(0);
            }
            
            // باقي الأصابع
            const fingerTips = [8, 12, 16, 20];
            const fingerPips = [6, 10, 14, 18];
            
            for (let i = 0; i < fingerTips.length; i++) {
                if (landmarks[fingerTips[i]].y < landmarks[fingerPips[i]].y) {
                    fingers.push(1);
                } else {
                    fingers.push(0);
                }
            }
            
            const openFingers = fingers.reduce((a, b) => a + b, 0);
            return openFingers >= 4 ? 'open' : 'closed';
        }

        // معالجة نتائج التعرف على اليد
        hands.onResults((results) => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

            if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                const landmarks = results.multiHandLandmarks[0];
                const handState = checkHandState(landmarks);
                
                // تحديث حالة اليد
                const handStatus = document.getElementById('handStatus');
                if (handState === 'open') {
                    handStatus.className = 'hand-status open';
                    handStatus.textContent = '✋ اليد مفتوحة';
                } else {
                    handStatus.className = 'hand-status closed';
                    handStatus.textContent = '✊ اليد مغلقة';
                }
                
                // تتبع الحركات
                if (lastHandState !== handState) {
                    gestureSequence.push(handState);
                    
                    // التحقق من نمط الإرسال
                    if (gestureSequence.length >= 4) {
                        const lastFour = gestureSequence.slice(-4);
                        if (lastFour[0] === 'closed' && 
                            lastFour[1] === 'open' && 
                            lastFour[2] === 'closed' && 
                            lastFour[3] === 'open') {
                            
                            if (currentMode === 'send') {
                                sendImage();
                            }
                            gestureSequence = [];
                        }
                    }
                    
                    if (gestureSequence.length > 10) {
                        gestureSequence.shift();
                    }
                }
                
                lastHandState = handState;
                
                // رسم الخطوط على اليد
                const connections = [
                    [0, 1], [1, 2], [2, 3], [3, 4],
                    [0, 5], [5, 6], [6, 7], [7, 8],
                    [0, 9], [9, 10], [10, 11], [11, 12],
                    [0, 13], [13, 14], [14, 15], [15, 16],
                    [0, 17], [17, 18], [18, 19], [19, 20],
                    [5, 9], [9, 13], [13, 17]
                ];

                ctx.strokeStyle = handState === 'open' ? '#00FF00' : '#FF0000';
                ctx.lineWidth = 3;
                
                connections.forEach(([start, end]) => {
                    ctx.beginPath();
                    ctx.moveTo(landmarks[start].x * canvas.width, landmarks[start].y * canvas.height);
                    ctx.lineTo(landmarks[end].x * canvas.width, landmarks[end].y * canvas.height);
                    ctx.stroke();
                });

                // رسم النقاط
                landmarks.forEach((landmark) => {
                    ctx.beginPath();
                    ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = handState === 'open' ? '#00FF00' : '#FF0000';
                    ctx.fill();
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                });
            } else {
                document.getElementById('handStatus').className = 'hand-status waiting';
                document.getElementById('handStatus').textContent = 'في انتظار اليد...';
                lastHandState = null;
            }

            ctx.restore();
        });

        // بدء الكاميرا
        const camera = new Camera(video, {
            onFrame: async () => {
                await hands.send({image: video});
            },
            width: 640,
            height: 480
        });

        camera.start().catch((err) => {
            showNotification('⚠️ لا يمكن الوصول للكاميرا', 'error');
        });
    </script>
</body>
</html>
