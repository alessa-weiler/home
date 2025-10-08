import * as THREE from 'three';

// Portfolio data - Design Projects
const projects = [
    {
        title: 'Pont B2B - AI-Powered Therapist Matching Platform',
        year: '2025',
        position: { x: 0, z: 0 },
        role: 'Product Designer & Developer',
        problem: 'How do people find therapists they\'ll actually click with? Current solutions rely on filters, not compatibility.',
        process: [
            { phase: 'Research', description: 'Conducted 15+ clinician interviews to understand matching needs and accessibility barriers' },
            { phase: 'Ideation', description: 'Prototyped GPT-based conversation simulation to predict therapeutic compatibility' },
            { phase: 'Design', description: 'Created user flows, matching algorithm visualization, and onboarding sequences from scratch' },
            { phase: 'Testing', description: 'Iterated based on therapist feedback; pivoted when adoption risk was too high' }
        ],
        finalDesign: [
            'Dashboard with clinician-focused interface',
            'AI-powered compatibility matching system',
            'User profile setup with therapeutic preference mapping',
            'Results display with match reasoning visualization',
            'Stripe integration for seamless booking'
        ],
        tech: 'TypeScript, CSS, HTML, Flask, GPT-4 integration, Stripe API',
        outcomes: [
            'Built full-stack prototype with recommender system',
            'Learned to design developer-facing features (API docs, config interfaces)',
            'Pivoted core compatibility engine to friend-matching platform when therapists found it too risky'
        ]
    },
    {
        title: 'Pont D2C - Friend Matching Platform',
        year: '2025',
        position: { x: 30, z: 0 },
        role: 'Product Designer & Developer',
        problem: 'Same fundamental challenge as B2B version: predicting human connection. How do you help people find friends they\'ll genuinely connect with?',
        process: [
            { phase: 'Research', description: 'Adapted insights from therapist matching to friendship compatibility' },
            { phase: 'Ideation', description: 'Repurposed compatibility engine for social connection instead of therapeutic fit' },
            { phase: 'Design', description: 'Simplified interface for consumer use; reduced cognitive load while maintaining depth' },
            { phase: 'Testing', description: 'Currently iterating based on user feedback and usage patterns' }
        ],
        finalDesign: [
            'Consumer-friendly onboarding flow',
            'Compatibility scoring based on social simulation principles',
            'Match explanation interface',
            'Profile creation optimized for neurodivergent users'
        ],
        tech: 'TypeScript, CSS, HTML, Flask, GPT-4 integration',
        outcomes: [
            'Successfully pivoted B2B product to D2C market',
            'Learned to balance technical complexity with user simplicity',
            'Applied universal design principles from Spectrum Socials volunteer work'
        ]
    },
    {
        title: 'Entheon Biomedical - Psychedelic Dosing Gene Test',
        year: '2021',
        position: { x: 60, z: 0 },
        role: 'Product Research & Design Contributor',
        problem: 'How do we personalize psychedelic-assisted therapy dosing based on genetic profiles? Post-merger product needed refinement.',
        process: [
            { phase: 'Research', description: 'In-depth literature review of pharmacogenomics and psychedelic metabolism' },
            { phase: 'Ideation', description: 'Constructed comprehensive list of relevant genes, relevance levels, and drug interactions' },
            { phase: 'Design', description: 'Collaborated with design team on pitch decks and product positioning' },
            { phase: 'Testing', description: 'Presented findings to CEOs; research directly modified gene test kit design' }
        ],
        finalDesign: [
            'Refined gene panel for psychedelic metabolism',
            'Clear documentation of gene-drug interactions',
            'Pitch materials communicating complex science to investors'
        ],
        tech: 'Literature synthesis, scientific communication, stakeholder presentation',
        outcomes: [
            'Research directly resulted in modification of gene test kit',
            'Learned to synthesize complex scientific literature into product decisions',
            'Gained experience balancing science, business, and regulatory priorities in startup environment'
        ]
    }
];

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // White background
scene.fog = new THREE.Fog(0xffffff, 50, 200);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '1';
document.body.insertBefore(renderer.domElement, document.body.firstChild);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(50, 50, 50);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

// Ground - white to match background
const groundGeometry = new THREE.PlaneGeometry(300, 50);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.8
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.x = 75; // Center it over the path
ground.receiveShadow = true;
scene.add(ground);

// Path - subtle gray line
const pathGeometry = new THREE.PlaneGeometry(300, 8);
const pathMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.9
});
const path = new THREE.Mesh(pathGeometry, pathMaterial);
path.rotation.x = -Math.PI / 2;
path.position.y = 0.01;
path.position.z = -2.5;
path.position.x = 75;
path.receiveShadow = true;
scene.add(path);

// Character (simple capsule)
const characterGroup = new THREE.Group();
const bodyGeometry = new THREE.CapsuleGeometry(0.5, 1.5, 4, 8);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.castShadow = true;
body.position.y = 1.5;
characterGroup.add(body);

// Character head indicator
const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
const headMaterial = new THREE.MeshStandardMaterial({ color: 0xFFDBAC });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.castShadow = true;
head.position.y = 2.5;
characterGroup.add(head);

characterGroup.position.set(0, 0, 0);
scene.add(characterGroup);

// Create buildings/structures for each experience
const buildings = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

projects.forEach((project, index) => {
    const buildingGroup = new THREE.Group();

    // CSG-style geometric shapes with clean, minimal colors
    let buildingMesh;
    const colors = [0x4A90E2, 0x50C878, 0xF5A623];
    const color = colors[index % colors.length];

    // Material with clean, solid look
    const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.1,
        roughness: 0.4,
        flatShading: true // CSG-style flat shading
    });

    if (index === 0) {
        // Sphere for Pont B2B
        const geometry = new THREE.SphereGeometry(2, 16, 16);
        buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.position.y = 2.5;
    } else if (index === 1) {
        // Torus for Pont D2C
        const geometry = new THREE.TorusGeometry(1.5, 0.6, 16, 32);
        buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.position.y = 2;
        buildingMesh.rotation.x = Math.PI / 2;
    } else {
        // Octahedron for Entheon
        const geometry = new THREE.OctahedronGeometry(2);
        buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.position.y = 2.5;
    }

    buildingMesh.castShadow = true;
    buildingMesh.receiveShadow = true;
    buildingGroup.add(buildingMesh);

    buildingGroup.position.set(project.position.x, 0, project.position.z);
    buildingGroup.userData = { project: project, index };
    scene.add(buildingGroup);
    buildings.push(buildingGroup);
});

// UI Elements
const infoPanel = document.getElementById('info-panel');
const experienceTitle = document.getElementById('experience-title');
const experienceYear = document.getElementById('experience-year');
const experienceDescription = document.getElementById('experience-description');
const closeBtn = document.getElementById('close-btn');
const instructions = document.getElementById('instructions');
const progressBar = document.getElementById('progress-bar');
const labelsContainer = document.getElementById('labels-container');

// Create labels for each building
const buildingLabels = [];
buildings.forEach((building) => {
    const label = document.createElement('div');
    label.className = 'building-label';
    label.innerHTML = `
        <span class="label-year">${building.userData.project.year}</span>
        <span class="label-title">${building.userData.project.title}</span>
    `;
    labelsContainer.appendChild(label);
    buildingLabels.push({ element: label, building });
});

closeBtn.addEventListener('click', () => {
    infoPanel.classList.remove('visible');
});

// Controls
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false
};

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) keys[key] = true;
    if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        instructions.style.display = 'none';
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) keys[key] = false;
});

// Mouse click interaction
document.addEventListener('click', (event) => {
    if (infoPanel.classList.contains('visible')) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(buildings, true);

    if (intersects.length > 0) {
        let parent = intersects[0].object;
        while (parent.parent && !parent.userData.project) {
            parent = parent.parent;
        }

        if (parent.userData.project) {
            const project = parent.userData.project;

            // Build portfolio-style content
            let processHTML = project.process.map(p =>
                `<div class="process-step"><strong>${p.phase}:</strong> ${p.description}</div>`
            ).join('');

            let designHTML = project.finalDesign.map(item =>
                `<li>${item}</li>`
            ).join('');

            let outcomesHTML = project.outcomes.map(item =>
                `<li>${item}</li>`
            ).join('');

            experienceTitle.innerHTML = `
                <h2>${project.title}</h2>
                <p class="project-role">${project.role} (${project.year})</p>

                <h3>THE PROBLEM</h3>
                <p>${project.problem}</p>

                <h3>THE PROCESS</h3>
                ${processHTML}

                <h3>FINAL DESIGN</h3>
                <ul>${designHTML}</ul>

                <h3>TECHNICAL IMPLEMENTATION</h3>
                <p><strong>Built with:</strong> ${project.tech}</p>

                <h3>OUTCOMES</h3>
                <ul>${outcomesHTML}</ul>
            `;
            experienceYear.textContent = '';
            experienceDescription.textContent = '';
            infoPanel.classList.add('visible');
        }
    }
});

// Zoom controls
let zoomLevel = 25;
const minZoom = 5;
const maxZoom = 40;

document.addEventListener('wheel', (e) => {
    e.preventDefault();
    zoomLevel += e.deltaY * 0.01;
    zoomLevel = Math.max(minZoom, Math.min(maxZoom, zoomLevel));
}, { passive: false });

// Animation loop
const moveSpeed = 0.15;
const turnSpeed = 0.05;
let characterRotation = 0;

function updateProgress() {
    const progress = (characterGroup.position.x / 195) * 100;
    progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
}

function animate() {
    requestAnimationFrame(animate);

    // Character movement
    const speed = keys.shift ? moveSpeed * 1.5 : moveSpeed;

    if (keys.w) {
        characterGroup.position.x += Math.cos(characterRotation) * speed;
        characterGroup.position.z += Math.sin(characterRotation) * speed;
    }
    if (keys.s) {
        characterGroup.position.x -= Math.cos(characterRotation) * speed;
        characterGroup.position.z -= Math.sin(characterRotation) * speed;
    }
    if (keys.a) {
        characterRotation += turnSpeed;
    }
    if (keys.d) {
        characterRotation -= turnSpeed;
    }

    // Constrain character to path
    characterGroup.position.z = Math.max(-7, Math.min(2, characterGroup.position.z));
    characterGroup.position.x = Math.max(-5, Math.min(200, characterGroup.position.x));

    // Update character rotation
    characterGroup.rotation.y = characterRotation;

    // Camera follows character with zoom
    const cameraOffset = new THREE.Vector3(0, zoomLevel * 0.4, zoomLevel * 0.8);
    cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), characterRotation);
    camera.position.x = characterGroup.position.x + cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = characterGroup.position.z + cameraOffset.z;
    camera.lookAt(characterGroup.position);

    // Highlight nearby buildings
    buildings.forEach(building => {
        const distance = building.position.distanceTo(characterGroup.position);
        if (distance < 8) {
            building.children.forEach(child => {
                if (child.material) {
                    child.material.emissive = new THREE.Color(0x333333);
                }
            });
        } else {
            building.children.forEach(child => {
                if (child.material) {
                    child.material.emissive = new THREE.Color(0x000000);
                }
            });
        }
    });

    // Update building labels positions
    buildingLabels.forEach(({ element, building }) => {
        const position = new THREE.Vector3(
            building.position.x,
            8, // Above building
            building.position.z
        );

        // Project 3D position to 2D screen position
        position.project(camera);

        // Convert to screen coordinates
        const x = (position.x * 0.5 + 0.5) * window.innerWidth;
        const y = (position.y * -0.5 + 0.5) * window.innerHeight;

        // Hide labels that are behind the camera or too far
        const distance = building.position.distanceTo(characterGroup.position);
        if (position.z > 1 || distance > 50) {
            element.style.display = 'none';
        } else {
            element.style.display = 'block';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            // Fade out labels when far away
            const opacity = Math.max(0, Math.min(1, 1 - (distance - 20) / 30));
            element.style.opacity = opacity;
        }
    });

    updateProgress();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
