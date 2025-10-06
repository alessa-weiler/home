import * as THREE from 'three';

// Portfolio data
const experiences = [
    { year: '2025', title: 'Getting a hobby', position: { x: 0, z: 0 } },
    { year: '2025', title: 'Learning how to socialise', position: { x: 15, z: -5 } },
    { year: '2025', title: 'Flopping to find myself', position: { x: 30, z: 0 } },
    { year: '2025', title: 'nGENEsis', position: { x: 45, z: -5 } },
    { year: '2024', title: 'The gene network pivot that wasn\'t', position: { x: 60, z: 0 } },
    { year: '2024', title: 'Computational gene drive project with the Windbichler Lab', position: { x: 75, z: -5 } },
    { year: '2023', title: 'Raising my Bernese Mountain Dog puppy Moose', position: { x: 90, z: 0 } },
    { year: '2023', title: 'Brain organoids!', position: { x: 105, z: -5 } },
    { year: '2022', title: 'First Public Health Project for the Indian Government', position: { x: 120, z: 0 } },
    { year: '2022', title: 'First wet and dry lab project investigating the role of Smg1 in stem cell differentiation with the Senner Lab', position: { x: 135, z: -5 } },
    { year: '2021', title: 'Literature review for entheon biomedical', position: { x: 150, z: 0 } },
    { year: '2020', title: 'Tour du Mont Blanc (10 day hike)', position: { x: 165, z: -5 } },
    { year: '2019', title: 'Building a mind controlled video game with arduino', position: { x: 180, z: 0 } },
    { year: '2018', title: 'Hatching autistic quail', position: { x: 195, z: -5 } }
];

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue
scene.fog = new THREE.Fog(0x87CEEB, 50, 200);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

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

// Ground
const groundGeometry = new THREE.PlaneGeometry(250, 50);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x90EE90,
    roughness: 0.8
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Path
const pathGeometry = new THREE.PlaneGeometry(250, 8);
const pathMaterial = new THREE.MeshStandardMaterial({
    color: 0xD2B48C,
    roughness: 0.9
});
const path = new THREE.Mesh(pathGeometry, pathMaterial);
path.rotation.x = -Math.PI / 2;
path.position.y = 0.01;
path.position.z = -2.5;
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

    // Vary building types
    let buildingMesh;
    const colors = [0x8B4513, 0xA0522D, 0xCD853F, 0xD2691E, 0xDEB887];
    const color = colors[index % colors.length];

    if (index % 3 === 0) {
        // Tower
        const geometry = new THREE.BoxGeometry(3, 6, 3);
        const material = new THREE.MeshStandardMaterial({ color });
        buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.position.y = 3;

        // Roof
        const roofGeometry = new THREE.ConeGeometry(2.5, 2, 4);
        const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 7;
        roof.castShadow = true;
        buildingGroup.add(roof);
    } else if (index % 3 === 1) {
        // Wide building
        const geometry = new THREE.BoxGeometry(4, 4, 3);
        const material = new THREE.MeshStandardMaterial({ color });
        buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.position.y = 2;

        const roofGeometry = new THREE.BoxGeometry(4.5, 0.5, 3.5);
        const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 4.5;
        roof.castShadow = true;
        buildingGroup.add(roof);
    } else {
        // Cylinder building
        const geometry = new THREE.CylinderGeometry(1.5, 1.5, 5, 8);
        const material = new THREE.MeshStandardMaterial({ color });
        buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.position.y = 2.5;

        const roofGeometry = new THREE.ConeGeometry(2, 1.5, 8);
        const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 5.5;
        roof.castShadow = true;
        buildingGroup.add(roof);
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
const closeBtn = document.getElementById('close-btn');
const instructions = document.getElementById('instructions');
const progressBar = document.getElementById('progress-bar');

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
            infoPanel.classList.add('visible');
        }
    }
});

// Zoom controls
let zoomLevel = 10;
const minZoom = 5;
const maxZoom = 20;

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
