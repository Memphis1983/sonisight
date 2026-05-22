// SoniSight core logic
const state = {
    mode: 'explore', // 'explore' or 'read'
    isAnalyzing: false
};

const elements = {
    video: document.getElementById('camera-stream'),
    canvas: document.getElementById('capture-canvas'),
    captureBtn: document.getElementById('capture-btn'),
    modeToggle: document.getElementById('mode-toggle'),
    modeIndicator: document.getElementById('mode-indicator'),
    statusBar: document.getElementById('status-bar')
};

async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' }, 
            audio: false 
        });
        elements.video.srcObject = stream;
        updateStatus('Camera Active');
    } catch (err) {
        updateStatus('Camera Error: ' + err.message);
        console.error(err);
    }
}

function updateStatus(text) {
    elements.statusBar.innerText = text;
}

async function captureAndAnalyze() {
    if (state.isAnalyzing) return;
    
    state.isAnalyzing = true;
    updateStatus('Analyzing...');
    
    // Draw current video frame to canvas
    const context = elements.canvas.getContext('2d');
    elements.canvas.width = elements.video.videoWidth;
    elements.canvas.height = elements.video.videoHeight;
    context.drawImage(elements.video, 0, 0);
    
    const imageData = elements.canvas.toDataURL('image/jpeg');
    
    try {
        // Placeholder for Gemma 4 API call
        const description = await mockGemmaAnalysis(imageData);
        speak(description);
        updateStatus('Analysis complete');
    } catch (err) {
        updateStatus('Analysis failed');
    } finally {
        state.isAnalyzing = false;
    }
}

async function mockGemmaAnalysis(img) {
    // This will be replaced by the real API integration
    return new Promise(resolve => {
        setTimeout(() => resolve("I see a room with a wooden table and a laptop on it."), 1500);
    });
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

elements.captureBtn.addEventListener('click', captureAndAnalyze);
elements.modeToggle.addEventListener('click', () => {
    state.mode = state.mode === 'explore' ? 'read' : 'explore';
    elements.modeIndicator.innerText = `Mode: ${state.mode.charAt(0).toUpperCase() + state.mode.slice(1)}`;
    updateStatus(`Switched to ${state.mode} mode`);
});

initCamera();
