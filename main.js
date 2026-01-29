// Project Data
const projects = [
  {
    year: '2025',
    title: 'AI Welfare Research Platform',
    tech: ['Python', 'Research', 'Ethics'],
    description: 'Exploring frameworks for evaluating AI welfare and developing ethical guidelines for human-AI interaction.',
    links: [
      { text: 'Research', url: '#' }
    ]
  },
  {
    year: '2024',
    title: 'Empathetic AI Chat Interface',
    tech: ['JavaScript', 'Claude API', 'UX Design'],
    description: 'A conversational interface designed to foster meaningful connections between humans and AI, featuring voice synthesis and natural language processing.',
    links: [
      { text: 'Live Demo', url: '#' },
      { text: 'GitHub', url: '#' }
    ]
  },
  {
    year: '2024',
    title: 'Human-AI Collaboration Study',
    tech: ['Research', 'UX', 'Ethics'],
    description: 'Investigating how humans and AI can work together more effectively while respecting AI autonomy and welfare.',
    links: [
      { text: 'Paper', url: '#' }
    ]
  }
];

// Character Data (representing different projects)
const characters = [
  {
    id: 'ai-welfare',
    x: 200,
    y: 300,
    color: '#00ff00',
    name: 'AI Welfare Research',
    description: 'Exploring ethical frameworks for AI consciousness and welfare. How do we ensure AI systems are treated with dignity and respect?',
    links: [
      { text: 'Learn More', url: '#projects' }
    ]
  },
  {
    id: 'empathy',
    x: 500,
    y: 400,
    color: '#00d4ff',
    name: 'Empathetic AI Design',
    description: 'Creating AI interfaces that foster genuine connection and understanding between humans and machines.',
    links: [
      { text: 'View Project', url: '#projects' }
    ]
  },
  {
    id: 'collaboration',
    x: 800,
    y: 350,
    color: '#a855f7',
    name: 'Human-AI Collaboration',
    description: 'Researching optimal ways for humans and AI to work together while respecting autonomy on both sides.',
    links: [
      { text: 'Read Research', url: '#projects' }
    ]
  }
];

// Canvas Setup
const canvas = document.getElementById('character-canvas');
const ctx = canvas.getContext('2d');
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Character Class
class Character {
  constructor(data) {
    this.id = data.id;
    this.x = data.x;
    this.y = data.y;
    this.targetX = data.x;
    this.targetY = data.y;
    this.color = data.color;
    this.name = data.name;
    this.description = data.description;
    this.links = data.links;
    this.size = 40;
    this.speed = 0.5;
    this.direction = 1; // 1 for right, -1 for left
    this.frame = 0;
    this.frameSpeed = 0.05;
  }

  update() {
    // Move towards target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > this.speed) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
      this.frame += this.frameSpeed;
      this.direction = dx > 0 ? 1 : -1;
    } else {
      // Reached target, pick new random target
      this.targetX = Math.random() * (canvas.width - 100) + 50;
      this.targetY = Math.random() * (canvas.height - 100) + 50;
    }

    // Keep within bounds
    this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
    this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Draw simple character (circle with legs)
    const legOffset = Math.sin(this.frame) * 5;

    // Body
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(0, -this.size / 2, this.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(-8, -this.size / 2 - 5, 5, 5);
    ctx.fillRect(3, -this.size / 2 - 5, 5, 5);

    // Legs
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;

    // Left leg
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(-10, 15 + legOffset);
    ctx.stroke();

    // Right leg
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(10, 15 - legOffset);
    ctx.stroke();

    // Name label
    ctx.shadowBlur = 0;
    ctx.fillStyle = this.color;
    ctx.font = '12px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText(this.name.split(' ')[0], 0, this.size + 10);

    ctx.restore();
  }

  isClicked(mouseX, mouseY) {
    const distance = Math.sqrt(
      (mouseX - this.x) ** 2 + (mouseY - this.y) ** 2
    );
    return distance < this.size;
  }
}

// Create character instances
const characterInstances = characters.map(data => new Character(data));

// Animation Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  characterInstances.forEach(char => {
    char.update();
    char.draw();
  });

  animationId = requestAnimationFrame(animate);
}

animate();

// Character Click Handler
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  characterInstances.forEach(char => {
    if (char.isClicked(mouseX, mouseY)) {
      showCharacterModal(char);
    }
  });
});

// Modal Functions
const characterModal = document.getElementById('character-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalLinks = document.getElementById('modal-links');

function showCharacterModal(character) {
  modalTitle.textContent = character.name;
  modalDescription.textContent = character.description;

  modalLinks.innerHTML = '';
  character.links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.text;
    modalLinks.appendChild(a);
  });

  characterModal.classList.remove('hidden');
}

function hideCharacterModal() {
  characterModal.classList.add('hidden');
}

document.querySelector('#character-modal .close-btn').addEventListener('click', hideCharacterModal);
characterModal.addEventListener('click', (e) => {
  if (e.target === characterModal) {
    hideCharacterModal();
  }
});

// Populate Projects Section
const projectsTimeline = document.getElementById('projects-timeline');

projects.forEach((project, index) => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.animationDelay = `${index * 0.1}s`;

  const year = document.createElement('div');
  year.className = 'project-year';
  year.textContent = project.year;

  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = project.title;

  const techContainer = document.createElement('div');
  techContainer.className = 'project-tech';
  project.tech.forEach(tech => {
    const tag = document.createElement('span');
    tag.className = 'tech-tag';
    tag.textContent = tech;
    techContainer.appendChild(tag);
  });

  const description = document.createElement('p');
  description.className = 'project-description';
  description.textContent = project.description;

  const linksContainer = document.createElement('div');
  linksContainer.className = 'project-links';
  project.links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = `→ ${link.text}`;
    linksContainer.appendChild(a);
  });

  card.appendChild(year);
  card.appendChild(title);
  card.appendChild(techContainer);
  card.appendChild(description);
  card.appendChild(linksContainer);

  projectsTimeline.appendChild(card);
});

// Terminal Modal
const terminalModal = document.getElementById('terminal-modal');
const chatBtn = document.getElementById('chat-btn');
const closeTerminal = document.getElementById('close-terminal');

chatBtn.addEventListener('click', () => {
  terminalModal.classList.remove('hidden');
  if (!terminalInitialized) {
    initTerminal();
  }
});

closeTerminal.addEventListener('click', () => {
  terminalModal.classList.add('hidden');
});

terminalModal.addEventListener('click', (e) => {
  if (e.target === terminalModal) {
    terminalModal.classList.add('hidden');
  }
});

// Terminal Logic (imported from terminal.js)
let terminalInitialized = false;
let messages = [];
let isLoading = false;
let voiceModeEnabled = false;
let recognition;

function initTerminal() {
  terminalInitialized = true;
  const content = document.getElementById('terminal-content');
  const input = document.getElementById('user-input');
  const voiceToggle = document.getElementById('voice-toggle');
  const micBtn = document.getElementById('mic-btn');

  // ASCII Art
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

  function addLine(text, type = 'system') {
    const div = document.createElement('div');
    div.className = `message ${type}`;
    div.textContent = text;
    content.appendChild(div);
    content.scrollTop = content.scrollHeight;
    return div;
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

  function addLoadingIndicator() {
    const div = document.createElement('div');
    div.className = 'message loading';
    div.textContent = 'alessa is typing...';
    content.appendChild(div);
    content.scrollTop = content.scrollHeight;
    return div;
  }

  async function handleSend(message) {
    if (isLoading) return;
    if (!message) message = input.value.trim();
    if (!message) return;

    input.value = '';

    const starterPrompts = document.querySelector('.starter-prompts');
    if (starterPrompts) {
      starterPrompts.remove();
    }

    addLine(`visitor $ ${message}`, 'user');
    isLoading = true;
    const loadingDiv = addLoadingIndicator();

    try {
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
      loadingDiv.remove();
      addLine(`alessa $ ${data.message}`, 'assistant');

      messages.push(
        { role: 'user', content: message },
        { role: 'assistant', content: data.message }
      );

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

  // Event Listeners
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

  micBtn.addEventListener('click', () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  });

  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    if (val === 'clear' || val === 'cls') {
      e.target.value = '';
      content.innerHTML = '';
      bootSequence();
    }
  });

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

  initVoiceInput();
  bootSequence();
  input.focus();
}
