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
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];

  // Create dense point cloud for realistic human face
  // Using parametric surface modeling similar to 3D scan data
  const latSegments = 60;
  const lonSegments = 60;

  for (let lat = 0; lat < latSegments; lat++) {
    const theta = (lat / latSegments) * Math.PI; // 0 to PI

    for (let lon = 0; lon < lonSegments; lon++) {
      const phi = (lon / lonSegments) * Math.PI * 2; // 0 to 2PI

      // Parametric equations for human face shape
      const u = (lat / latSegments) * 2 - 1; // -1 to 1 (top to bottom)
      const v = (lon / lonSegments) * 2 - 1; // -1 to 1 (left to right)

      // Create anatomically-inspired face geometry
      let radius = 100;
      let x = 0, y = 0, z = 0;

      // Overall head shape - front half of ellipsoid
      if (Math.abs(v) < 0.9 && Math.abs(u) < 1.1) {
        // Base ellipsoid shape
        const baseRadius = Math.sqrt(Math.max(0, 1 - v * v * 0.8 - u * u * 0.5)) * radius;

        x = v * radius * 0.9;
        y = u * radius * 1.2;
        z = baseRadius;

        // Forehead flattening
        if (u < -0.4) {
          z *= 0.7 + (u + 0.4) * 0.5;
        }

        // Eye sockets - indentations
        const leftEyeU = u + 0.25;
        const leftEyeV = v + 0.3;
        const leftEyeDist = Math.sqrt(leftEyeU * leftEyeU * 3 + leftEyeV * leftEyeV * 4);

        const rightEyeU = u + 0.25;
        const rightEyeV = v - 0.3;
        const rightEyeDist = Math.sqrt(rightEyeU * rightEyeU * 3 + rightEyeV * rightEyeV * 4);

        if (leftEyeDist < 0.5) {
          z -= (1 - leftEyeDist / 0.5) * 30;
        }
        if (rightEyeDist < 0.5) {
          z -= (1 - rightEyeDist / 0.5) * 30;
        }

        // Nose bridge and tip
        if (Math.abs(v) < 0.2 && u > -0.1 && u < 0.4) {
          const noseU = (u - 0.15) * 3;
          const noseV = v * 5;
          const noseDist = Math.sqrt(noseU * noseU + noseV * noseV);

          if (noseDist < 1.2) {
            const noseProtrusion = (1 - noseDist / 1.2) * 40;
            z += noseProtrusion * (1 + Math.sin(noseU * 2) * 0.3);
          }
        }

        // Cheekbones
        const cheekU = u - 0.1;
        const leftCheekV = v + 0.45;
        const rightCheekV = v - 0.45;

        const leftCheekDist = Math.sqrt(cheekU * cheekU * 4 + leftCheekV * leftCheekV * 3);
        const rightCheekDist = Math.sqrt(cheekU * cheekU * 4 + rightCheekV * rightCheekV * 3);

        if (leftCheekDist < 0.6) {
          z += (1 - leftCheekDist / 0.6) * 15;
        }
        if (rightCheekDist < 0.6) {
          z += (1 - rightCheekDist / 0.6) * 15;
        }

        // Mouth area
        if (Math.abs(v) < 0.35 && u > 0.4 && u < 0.7) {
          const mouthU = (u - 0.55) * 4;
          const mouthV = v * 3;
          const mouthDist = Math.sqrt(mouthU * mouthU + mouthV * mouthV);

          if (mouthDist < 0.8) {
            z -= (1 - mouthDist / 0.8) * 20;
          }
        }

        // Chin definition
        if (u > 0.7) {
          const chinFade = Math.max(0, 1 - (u - 0.7) / 0.4);
          z *= chinFade * 0.7 + 0.3;

          // Chin bulge
          if (Math.abs(v) < 0.25 && u > 0.75 && u < 0.95) {
            const chinU = (u - 0.85) * 8;
            const chinV = v * 4;
            const chinDist = Math.sqrt(chinU * chinU + chinV * chinV);
            if (chinDist < 0.8) {
              z += (1 - chinDist / 0.8) * 18;
            }
          }
        }

        // Add realistic surface noise
        z += (Math.random() - 0.5) * 3;

        // Only add points with positive depth
        if (z > 5) {
          vertices.push(x, y, z);

          // Gradient coloring based on depth
          const depthNorm = Math.min(1, z / radius);
          const r = depthNorm * 0.15;
          const g = 0.4 + depthNorm * 0.6;
          const b = depthNorm * 0.3;

          colors.push(r, g, b);
        }
      }
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  // Center the geometry
  geometry.computeBoundingBox();
  const center = new THREE.Vector3();
  geometry.boundingBox.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);

  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false
  });

  pointCloud = new THREE.Points(geometry, material);
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
