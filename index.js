import * as THREE from 'three';

// Project cards configuration
const cards = [
    {
        id: 'scene-pont',
        geometry: 'torus',
        color: 0x3B82F6,
        link: 'https://pont.world'
    },
    {
        id: 'scene-ngenesis',
        geometry: 'icosahedron',
        color: 0x8B5CF6,
        link: 'https://www.loom.com/share/40badefe50b94b0399a806d8b330cedf?sid=a7ea7273-fa60-47c8-ac0a-a65ea3666bcd'
    },
    {
        id: 'scene-gene-drives',
        geometry: 'box',
        color: 0x10B981,
        link: 'about.html'
    }
];

const scenes = [];

// Create a scene for each card
cards.forEach((cardConfig) => {
    const container = document.getElementById(cardConfig.id);
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create geometry based on config
    let geometry;
    switch (cardConfig.geometry) {
        case 'torus':
            geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
            break;
        case 'icosahedron':
            geometry = new THREE.IcosahedronGeometry(1.2, 0);
            break;
        case 'box':
            geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            break;
        default:
            geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    const material = new THREE.MeshStandardMaterial({
        color: cardConfig.color,
        metalness: 0.3,
        roughness: 0.4,
        emissive: cardConfig.color,
        emissiveIntensity: 0.1
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Store scene data
    scenes.push({
        scene,
        camera,
        renderer,
        mesh,
        container,
        material,
        baseColor: cardConfig.color
    });
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    scenes.forEach((sceneData) => {
        // Rotate mesh
        sceneData.mesh.rotation.x += 0.005;
        sceneData.mesh.rotation.y += 0.01;

        // Render scene
        sceneData.renderer.render(sceneData.scene, sceneData.camera);
    });
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    scenes.forEach((sceneData) => {
        const width = sceneData.container.clientWidth;
        const height = sceneData.container.clientHeight;

        sceneData.camera.aspect = width / height;
        sceneData.camera.updateProjectionMatrix();

        sceneData.renderer.setSize(width, height);
    });
});

// Card click and hover handlers
document.querySelectorAll('.project-card').forEach((card, index) => {
    const link = card.getAttribute('data-link');
    const sceneData = scenes[index];

    // Make card clickable
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
        if (link) {
            window.open(link, link.startsWith('http') ? '_blank' : '_self');
        }
    });

    // Hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        if (sceneData) {
            sceneData.material.emissiveIntensity = 0.3;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        if (sceneData) {
            sceneData.material.emissiveIntensity = 0.1;
        }
    });
});
