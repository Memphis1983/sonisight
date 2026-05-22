# 👁️ SoniSight - Multimodal Accessibility PWA

SoniSight is an inclusive, high-contrast Progressive Web App (PWA) designed to provide "sight to the blind and ears to the deaf." By leveraging the multimodal capabilities of **Gemma 4**, SoniSight transforms the visual world into audible descriptions and haptic feedback.

## 🚀 Core Features

- **🌍 Explore Mode**: Analyzes the environment in real-time, describing obstacles, objects, and the general layout of a room for visually impaired users.
- **📖 Read Mode**: Specifically tuned for high-precision OCR (Optical Character Recognition) to read signs, menus, and documents aloud.
- **🖐️ Haptic Nervous System**: Uses the Vibration API to provide physical feedback:
    - *Short Pulse*: Analysis started.
    - *Double Pulse*: Successful analysis.
    - *Long Pulses*: Error/Unable to see.
- **📱 PWA Architecture**: Fully installable on mobile devices with offline support via Service Workers, ensuring accessibility wherever the user is.
- **🎙️ Text-to-Speech (TTS)**: an integrated voice engine that narrates the scene descriptions immediately.

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3 (Custom High-Contrast Theme), JavaScript (ES6+)
- **AI Model**: Gemma 4 (Multimodal)
- **Deployment**: Netlify (Static Hosting)
- **PWA**: Web App Manifest & Service Workers

## 📖 How it Works

1. **Capture**: The app captures a frame from the mobile device's environment camera.
2. **Processing**: The image is sent to the Gemma 4 API with a context-aware prompt based on the active mode (Explore vs. Read).
3. **Output**: The model's textual description is passed to the browser's Speech Synthesis API for immediate audio feedback.
4. **Feedback**: Concurrent haptic pulses notify the user of the system state without requiring visual or audio cues.

## 📦 Installation

Since this is a PWA, simply visit the deployed URL on your mobile browser and select **"Add to Home Screen"** from the browser menu.
