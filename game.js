import * as THREE from 'three';

// Portfolio data
const experiences = [
    { year: '2025', title: 'Building Pont', position: { x: 0, z: 0 }, description: 'Started with a problem I\'d been living: How do you find the right therapist? I\'ve spent most of my life trying to systematize human interaction because otherwise I feel like an alien. So I built a prototype where two GPT agents with pre-defined personalities talked to each other—essentially simulating therapeutic conversations to predict compatibility. It was fun but expensive as hell. So I turned it into something real: combined social simulation principles with recommender systems, built a full-stack Flask app with TypeScript, designed the entire interface from scratch (user flows, matching algorithm visualization, onboarding sequences), and integrated Stripe for booking. Conducted 15+ clinician interviews to refine the matching algorithm and improve accessibility. When therapists said it was too risky to adopt early-stage, I pivoted the core compatibility engine into a friend-matching platform. Same fundamental challenge—predicting human connection—different use case. Currently iterating based on user feedback. What I learned: How to design developer-facing features (API documentation, configuration interfaces), how to balance technical complexity with user simplicity, and that the best research happens when you\'re solving your own problem.' },
    { year: '2025', title: 'Learning to design for neurodivergent users', position: { x: 15, z: -5 }, description: 'Started volunteering with Spectrum Socials, helping run friendship-building sessions for autistic kids (ages 5-16). I\'m essentially event coordinator and conversation moderator—designing social experiences that help kids learn interaction patterns in a safe environment. Loneliness is a massive theme here. Watching real connections form between kids who struggle socially has fundamentally changed how I think about interface design. When you\'re designing for people who interpret the world differently, every micro-interaction matters. Every transition needs to be predictable. Every error message needs to be kind. This experience directly influences how I approach UX: clear feedback loops, reduced cognitive load, multiple pathways to the same outcome. Universal design isn\'t just accessible design—it\'s better design for everyone.' },
    { year: '2024', title: 'nGENEsis Diagnostics', position: { x: 30, z: 0 }, description: 'Applied solo to Y Combinator with a gene network psychiatry idea—made it to the top 10%. The concept: use whole-genome sequencing to analyze complete gene networks for psychiatric treatment optimization. Did hours of user interviews with clinicians and people at gene-testing companies. Here\'s what killed it: The tests people actually need are expensive and hard to access. The "affordable" ones subsidize costs by selling user data. The only model that penciled out was to either sell patient data or charge obscene fees. The business model was fundamentally about hiking up the price of data rather than helping people. Hard pass. I\'m parking it until whole-genome sequencing is cheap and boring. Kept my ethics, lost the pitch. Worth it. What I learned: Sometimes the most important design decision is knowing when not to build something. Also learned how to conduct systematic user research, synthesize conflicting stakeholder needs, and present complex technical concepts to non-technical decision-makers.' },
    { year: '2024', title: 'Computational gene drives', position: { x: 45, z: -5 }, description: 'Part of my MRes at Imperial. Built a computational pipeline from scratch to extract and quantify guide RNA sequences from different gene drives, then fed that into a multivariate model to see if gRNA sequence scores influenced inheritance rates. Also quantified promoter expression levels using RNAseq data to understand how timing affects gene drive success. Used Bash, R, and Python. Collaborated with my supervisor Seb via GitHub—learned proper version control, code review processes, and how to write documentation that future-me wouldn\'t hate. What I learned: How to build data analysis workflows, how to debug complex multi-step pipelines, and that good documentation is a love letter to your future self. Also: scientists desperately need better tools. Every analysis required duct-taping together three different scripts in different languages. There\'s so much room for better developer experience in research computing.' },
    { year: '2022', title: 'India medication adherence project', position: { x: 60, z: 0 }, description: 'Worked on a public health project analyzing population census data to understand what factors influence medication adherence in India. Helped with data analysis in R and contributed to the published paper. This was my first experience working with messy, real-world data at scale. Census data is gloriously chaotic—missing fields, inconsistent formatting, data entry errors. Had to design cleaning pipelines that were robust enough to handle edge cases but flexible enough to preserve legitimate outliers. What I learned: How to work with large datasets, how to communicate statistical findings to policymakers, and that the most important question in data analysis is "what decision will this inform?"' },
    { year: '2021', title: 'Entheon Biomedical', position: { x: 75, z: -5 }, description: 'First time working for a startup. Absolutely loved it. Had to wear many different hats: helped design pitch decks with the design team, took meeting minutes, did market research. But my main task was to refine the product after a merger—a gene test kit for dosing psychedelics in psychedelic-assisted therapy. I constructed a list of all relevant genes to be tested, their level of relevance, and which drugs they affected. Conducted an in-depth literature review, presented findings to the CEOs of both companies. Delighted that my research resulted in a modification of the gene test kit. What I learned: How to synthesize complex scientific literature into actionable product decisions, how to communicate with stakeholders who have different priorities (science vs. business vs. regulatory), and that startups move fast—you need to be comfortable making decisions with incomplete information.' },
    { year: '2020-2021', title: 'Autism Research Centre', position: { x: 90, z: 0 }, description: 'Worked with Varun Warrier and Armandina Almanza-Gutierrez to analyze data in R, investigating differences in masking behavior between autistic girls and autistic boys. This was my first real experience with behavioral data analysis and working in a research environment. What I learned: How to work independently on long-term projects, how to ask good questions when stuck, and that understanding human behavior requires both quantitative rigor and qualitative empathy. You can\'t reduce people to data points.' },
    { year: '2019', title: 'Mind-controlled video game with Arduino', position: { x: 105, z: -5 }, description: 'Built (or attempted to build) a mind-controlled video game using EEG probes and Arduino. Honestly can\'t remember if we got it fully working, but it made me deeply skeptical of consumer EEG devices. If I needed to focus that hard to get a signal, it\'s not really "passive brain monitoring," is it? Made me realize that a lot of consumer neurotech is selling the aesthetic of science rather than actual functionality. EEG needs way more sensitivity before it\'s useful outside controlled lab settings. What I learned: How to prototype with hardware, how to debug sensor data, and the importance of honest evaluation—sometimes the most valuable outcome is learning what doesn\'t work.' }
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

experiences.forEach((exp, index) => {
    const buildingGroup = new THREE.Group();

    // CSG-style geometric shapes with clean, minimal colors
    let buildingMesh;
    const colors = [0x4A90E2, 0x50C878, 0xF5A623, 0xE94B3C, 0x9013FE, 0x00D084, 0xFF6B6B, 0x4ECDC4];
    const color = colors[index % colors.length];

    // Material with clean, solid look
    const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.1,
        roughness: 0.4,
        flatShading: true // CSG-style flat shading
    });

    if (index % 5 === 0) {
        // Sphere
        const geometry = new THREE.SphereGeometry(2, 16, 16);
        buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.position.y = 2.5;
    } else if (index % 5 === 1) {
        // Torus
        const geometry = new THREE.TorusGeometry(1.5, 0.6, 16, 32);
        buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.position.y = 2;
        buildingMesh.rotation.x = Math.PI / 2;
    } else if (index % 5 === 2) {
        // Octahedron
        const geometry = new THREE.OctahedronGeometry(2);
        buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.position.y = 2.5;
    } else if (index % 5 === 3) {
        // Tetrahedron
        const geometry = new THREE.TetrahedronGeometry(2.5);
        buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.position.y = 2.5;
    } else {
        // Dodecahedron
        const geometry = new THREE.DodecahedronGeometry(2);
        buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.position.y = 2.5;
    }

    buildingMesh.castShadow = true;
    buildingMesh.receiveShadow = true;
    buildingGroup.add(buildingMesh);

    buildingGroup.position.set(exp.position.x, 0, exp.position.z);
    buildingGroup.userData = { experience: exp, index };
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
        <span class="label-year">${building.userData.experience.year}</span>
        <span class="label-title">${building.userData.experience.title}</span>
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
        while (parent.parent && !parent.userData.experience) {
            parent = parent.parent;
        }

        if (parent.userData.experience) {
            const exp = parent.userData.experience;
            experienceTitle.textContent = exp.title;
            experienceYear.textContent = exp.year;
            experienceDescription.textContent = exp.description;
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
