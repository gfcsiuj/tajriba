window.addEventListener('load', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const clearCanvasBtn = document.getElementById('clearCanvas');
    const saveCanvasBtn = document.getElementById('saveCanvas');
    const eraserBtn = document.getElementById('eraserBtn'); // Get the eraser button
    const toolbar = document.querySelector('.toolbar');

    // --- Canvas and Toolbar Sizing ---
    function resizeCanvas() {
        const toolbarWidth = toolbar.offsetWidth;
        canvas.width = window.innerWidth - toolbarWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial size calculation


    // --- Drawing Logic ---
    let isDrawing = false;
    let isErasing = false;
    let lastX = 0;
    let lastY = 0;
    let lastBrushColor = colorPicker.value; // Store the last used color

    function draw(e) {
        if (!isDrawing) return;

        ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    // --- Control Logic ---
    function updateBrushColor() {
        if (!isErasing) {
            lastBrushColor = colorPicker.value;
            ctx.strokeStyle = colorPicker.value;
        }
    }

    function updateBrushSize() {
        ctx.lineWidth = brushSize.value;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveCanvas() {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'لوحة-حرة.png';
        link.click();
    }

    function toggleEraser() {
        isErasing = !isErasing;
        eraserBtn.classList.toggle('active', isErasing);
        if (isErasing) {
            // No need to set strokeStyle, as destination-out doesn't use it
        } else {
            ctx.strokeStyle = lastBrushColor;
        }
    }

    colorPicker.addEventListener('change', updateBrushColor);
    brushSize.addEventListener('input', updateBrushSize);
    clearCanvasBtn.addEventListener('click', clearCanvas);
    saveCanvasBtn.addEventListener('click', saveCanvas);
    eraserBtn.addEventListener('click', toggleEraser);

    // --- Initial Brush Properties ---
    updateBrushColor();
    updateBrushSize();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
});
