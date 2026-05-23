// SoniSight core logic
const state = {
    mode: explore, // explore or read
    isAnalyzing: false
};

const elements = {
    video: document.getElementById(camera-stream),
    canvas: document.getElementById(capture-canvas),
    captureBtn: document.getElementById(capture-btn),
    modeToggle: document.getElementById(mode-toggle),
    modeIndicator: document.getElementById(mode-indicator),
    statusBar: document.getElementById(status-bar)
};

async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: environment }, 
            audio: false 
        });
        elements.video.srcObject = stream;
        updateStatus(Camera Active);
    } catch (err) {
        updateStatus(Camera Error:  + err.message);
        console.error(err);
    }
}

function updateStatus(text) {
    elements.statusBar.innerText = text;
}

async function triggerHaptic(pattern = default) {
    if (!("vibrate" in navigator)) return;
    
    if (pattern === start) {
        navigator.vibrate(50); // Short sharp pulse
    } else if (pattern === success) {
        navigator.vibrate([100, 50, 100]); // Double pulse
    } else if (pattern === error) {
        navigator.vibrate([500, 100, 500]); // Long warning pulses
    } else {
        navigator.vibrate(100);
    }
}

async function captureAndAnalyze() {
    if (state.isAnalyzing) return;
    
    state.isAnalyzing = true;
    updateStatus(Analyzing...);
    await triggerHaptic(start);
    
    const context = elements.canvas.getContext(2d);
    elements.canvas.width = elements.video.videoWidth;
    elements.canvas.height = elements.video.videoHeight;
    context.drawImage(elements.video, 0, 0);
    
    // Convert canvas to blob for multipart/form-data
    elements.canvas.toBlob(async (blob) => {
        try {
            const description = await analyzeWithGemma(blob);
            await triggerHaptic(success);
            speak(description);
            updateStatus(Analysis complete);
        } catch (err) {
            await triggerHaptic(error);
            updateStatus(Analysis failed);
            speak(Sorry sweetheart, I had trouble seeing that.);
            console.error(err);
        } finally {
            state.isAnalyzing = false;
        }
    }, image/jpeg);
}

async function analyzeWithGemma(imageBlob) {
    const formData = new FormData();
    formData.append(image, imageBlob, capture.jpg);
    formData.append(mode, state.mode);

    const response = await fetch(https://clock-captive-hybrid.ngrok-free.dev/api/gemma, {
        method: POST,
        body: formData
    });

    if (!response.ok) throw new Error(API request failed);
    
    const data = await response.json();
    return data.description;
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

elements.captureBtn.addEventListener(click, captureAndAnalyze);
elements.modeToggle.addEventListener(click, () => {
    state.mode = state.mode === explore ? read : explore;
    elements.modeIndicator.innerText = `Mode: ${state.mode.charAt(0).toUpperCase() + state.mode.slice(1)}`;
    updateStatus(`Switched to ${state.mode} mode`);
    triggerHaptic(); 
});

initCamera();

