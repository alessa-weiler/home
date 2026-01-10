// DOM Elements
const content = document.getElementById('terminal-content');
const input = document.getElementById('user-input');
const voiceToggle = document.getElementById('voice-toggle');
const micBtn = document.getElementById('mic-btn');

// State
let messages = [];
let isLoading = false;
let voiceModeEnabled = false;
let recognition;

// ASCII Art Logo
const asciiArt = `
    ▄▄▄       ██▓    ▓█████   ██████   ██████  ▄▄▄
   ▒████▄    ▓██▒    ▓█   ▀ ▒██    ▒ ▒██    ▒ ▒████▄
   ▒██  ▀█▄  ▒██░    ▒███   ░ ▓██▄   ░ ▓██▄   ▒██  ▀█▄
   ░██▄▄▄▄██ ▒██░    ▒▓█  ▄   ▒   ██▒  ▒   ██▒░██▄▄▄▄██
    ▓█   ▓██▒░██████▒░▒████▒▒██████▒▒▒██████▒▒ ▓█   ▓██▒
    ▒▒   ▓▒█░░ ▒░▓  ░░░ ▒░ ░▒ ▒▓▒ ▒ ░▒ ▒▓▒ ▒ ░ ▒▒   ▓▒█░
     ▒   ▒▒ ░░ ░ ▒  ░ ░ ░  ░░ ░▒  ░ ░░ ░▒  ░ ░  ▒   ▒▒ ░
     ░   ▒     ░ ░      ░   ░  ░  ░  ░  ░  ░    ░   ▒
         ░  ░    ░  ░   ░  ░      ░        ░        ░  ░
`;

// Boot Sequence
function bootSequence() {
  const lines = [
    'Initializing terminal...',
    'Loading AI modules...',
    'Connecting to Claude API...',
    'System ready.',
    '',
  ];

  lines.forEach((line, i) => {
    setTimeout(() => {
      addLine(line, 'system');
      if (i === lines.length - 1) {
        showAsciiArt();
        setTimeout(showWelcome, 500);
      }
    }, i * 400);
  });
}

function showAsciiArt() {
  const artDiv = document.createElement('div');
  artDiv.className = 'ascii-art';
  artDiv.textContent = asciiArt;
  content.appendChild(artDiv);
  content.scrollTop = content.scrollHeight;
}

function showWelcome() {
  addLine('', 'system');
  addLine('Welcome! I\'m an AI version of Alessa.', 'system');
  addLine('Ask me anything about my work, background, or what I\'m up to.', 'system');
  addLine('', 'system');
  setTimeout(showStarterPrompts, 300);
}

function addLine(text, type = 'system') {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.textContent = text;
  content.appendChild(div);
  content.scrollTop = content.scrollHeight;
  return div;
}

function showStarterPrompts() {
  const promptsContainer = document.createElement('div');
  promptsContainer.className = 'starter-prompts';

  const prompts = [
    'tell me about yourself',
    'what\'s most important to you in life?',
    'what are you working on right now?'
  ];

  prompts.forEach((prompt, i) => {
    const btn = document.createElement('button');
    btn.className = 'starter-prompt';
    btn.textContent = `${i + 1}. ${prompt}`;
    btn.onclick = () => handleSend(prompt);
    promptsContainer.appendChild(btn);
  });

  content.appendChild(promptsContainer);
  content.scrollTop = content.scrollHeight;
}

async function handleSend(message) {
  if (isLoading) return;
  if (!message) message = input.value.trim();
  if (!message) return;

  input.value = '';

  // Remove starter prompts on first interaction
  const starterPrompts = document.querySelector('.starter-prompts');
  if (starterPrompts) {
    starterPrompts.remove();
  }

  // Display user message
  addLine(`visitor $ ${message}`, 'user');

  // Show loading
  isLoading = true;
  const loadingDiv = addLoadingIndicator();

  try {
    // Send to backend
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...messages, { role: 'user', content: message }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Remove loading
    loadingDiv.remove();

    // Display AI response
    addLine(`alessa $ ${data.message}`, 'assistant');

    // Update message history
    messages.push(
      { role: 'user', content: message },
      { role: 'assistant', content: data.message }
    );

    // If voice mode, play response
    if (voiceModeEnabled) {
      playVoiceResponse(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    loadingDiv.remove();
    addLine('Error: Could not connect to server. Make sure the backend is running on http://localhost:3000', 'error');
  } finally {
    isLoading = false;
  }
}

function addLoadingIndicator() {
  const div = document.createElement('div');
  div.className = 'message loading';
  div.textContent = 'alessa is typing...';
  content.appendChild(div);
  content.scrollTop = content.scrollHeight;
  return div;
}

// Voice Mode Toggle
voiceToggle.addEventListener('click', () => {
  voiceModeEnabled = !voiceModeEnabled;
  voiceToggle.querySelector('.voice-label').textContent = `Voice: ${voiceModeEnabled ? 'ON' : 'OFF'}`;
  voiceToggle.classList.toggle('active', voiceModeEnabled);

  if (voiceModeEnabled) {
    addLine('Voice mode enabled. Click the microphone to speak or toggle voice output.', 'system');
  } else {
    addLine('Voice mode disabled.', 'system');
  }
});

// Voice Input (Speech-to-Text)
function initVoiceInput() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.error('Speech recognition not supported');
    micBtn.disabled = true;
    micBtn.style.opacity = '0.5';
    micBtn.title = 'Speech recognition not supported in this browser';
    return;
  }

  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    micBtn.classList.add('recording');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
    handleSend(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    micBtn.classList.remove('recording');
    if (event.error === 'not-allowed') {
      addLine('Microphone permission denied. Please allow microphone access.', 'error');
    } else {
      addLine(`Speech recognition error: ${event.error}`, 'error');
    }
  };

  recognition.onend = () => {
    micBtn.classList.remove('recording');
  };
}

micBtn.addEventListener('click', () => {
  if (recognition) {
    try {
      recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
    }
  }
});

// Voice Output (Text-to-Speech)
async function playVoiceResponse(text) {
  try {
    const response = await fetch('http://localhost:3000/api/voice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Voice API error: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
    };

    await audio.play();
  } catch (error) {
    console.error('Voice playback error:', error);
    addLine('Voice synthesis not available. Check ElevenLabs API configuration.', 'error');
  }
}

// Enter key to send
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !isLoading) {
    handleSend();
  }
});

// Focus input on load
input.focus();

// Easter eggs
input.addEventListener('input', (e) => {
  const val = e.target.value.toLowerCase();
  if (val === 'clear' || val === 'cls') {
    e.target.value = '';
    content.innerHTML = '';
    bootSequence();
  }
});

// Initialize
initVoiceInput();
bootSequence();
