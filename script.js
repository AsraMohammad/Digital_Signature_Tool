const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
const textColorPicker = document.getElementById('textColor');
const bgColorPicker = document.getElementById('bgColor');
const fontSizeInput = document.getElementById('fontSize');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const downloadButton = document.getElementById('downloadButton');

let isDrawing = false;
let savedSignatures = [];

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

clearButton.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', saveSignature);
downloadButton.addEventListener('click', downloadSignature);

function startDrawing(event) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

function draw(event) {
    if (!isDrawing) return;

    ctx.strokeStyle = textColorPicker.value;
    ctx.lineWidth = fontSizeInput.value / 10;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

function clearCanvas() {
    ctx.fillStyle = bgColorPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveSignature() {
    const dataURL = canvas.toDataURL();
    savedSignatures.push(dataURL);
    alert('Signature saved!');
}

function downloadSignature() {
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Initial canvas background color
clearCanvas();
