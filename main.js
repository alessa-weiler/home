import * as THREE from 'three';

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

// Three.js Point Cloud Face Setup
let scene, camera, renderer, pointCloud;
let mouse, center;

function initThreeJS() {
  const container = document.getElementById('three-container');

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 0, 500);

  center = new THREE.Vector3();
  center.z = -1000;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Create Point Cloud Face
  createPointCloudFace();

  // Mouse movement
  mouse = new THREE.Vector3(0, 0, 1);
  document.addEventListener('mousemove', onMouseMove);

  // Window resize
  window.addEventListener('resize', onWindowResize);

  // Start animation
  animate();
}

function createPointCloudFace() {
  const width = 320;
  const height = 240;

  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];

  // Create a depth map for a face-like shape
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Normalize coordinates to -1 to 1
      const nx = (x / width) * 2 - 1;
      const ny = (y / height) * 2 - 1;

      // Create face-like depth based on distance from center and features
      let depth = 0;

      // Head shape (ellipsoid)
      const headDist = Math.sqrt((nx * nx * 0.8) + (ny * ny * 1.2));
      if (headDist < 0.7) {
        depth = (1 - headDist / 0.7) * 200;

        // Eyes (depressions)
        const leftEyeDist = Math.sqrt(Math.pow(nx + 0.25, 2) + Math.pow(ny - 0.15, 2));
        const rightEyeDist = Math.sqrt(Math.pow(nx - 0.25, 2) + Math.pow(ny - 0.15, 2));

        if (leftEyeDist < 0.12) {
          depth -= (1 - leftEyeDist / 0.12) * 40;
        }
        if (rightEyeDist < 0.12) {
          depth -= (1 - rightEyeDist / 0.12) * 40;
        }

        // Nose (protrusion)
        const noseDist = Math.sqrt(Math.pow(nx, 2) * 4 + Math.pow(ny + 0.05, 2) * 2);
        if (noseDist < 0.3 && ny > -0.2) {
          depth += (1 - noseDist / 0.3) * 60;
        }

        // Mouth (depression)
        const mouthDist = Math.sqrt(Math.pow(nx, 2) * 2 + Math.pow(ny + 0.35, 2) * 8);
        if (mouthDist < 0.3 && ny < 0) {
          depth -= (1 - mouthDist / 0.3) * 30;
        }

        // Add some noise for texture
        depth += (Math.random() - 0.5) * 10;
      }

      // Only add points where there's depth
      if (depth > 0) {
        vertices.push(
          (x - width / 2) * 2,
          (y - height / 2) * 2,
          -depth
        );

        // Color based on depth
        const colorIntensity = depth / 200;
        colors.push(
          0.0 + colorIntensity * 0.3, // R - slight green
          1.0 * colorIntensity, // G - main green
          0.0 + colorIntensity * 0.5  // B - slight cyan
        );
      }
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false
  });

  pointCloud = new THREE.Points(geometry, material);
  pointCloud.rotation.y = Math.PI; // Face forward
  scene.add(pointCloud);
}

function onMouseMove(event) {
  mouse.x = (event.clientX - window.innerWidth / 2) * 8;
  mouse.y = (event.clientY - window.innerHeight / 2) * 8;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // Camera follows mouse smoothly
  camera.position.x += (mouse.x - camera.position.x) * 0.05;
  camera.position.y += (-mouse.y - camera.position.y) * 0.05;
  camera.lookAt(center);

  // Gentle floating/breathing animation
  if (pointCloud) {
    pointCloud.rotation.y = Math.PI + Math.sin(Date.now() * 0.0005) * 0.1;
    pointCloud.position.z = Math.sin(Date.now() * 0.0008) * 20;
  }

  renderer.render(scene, camera);
}

// Initialize Three.js on load
initThreeJS();

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

// Terminal Logic
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
