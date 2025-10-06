import * as THREE from 'three';

// Portfolio data
const experiences = [
    { year: '2025', title: 'Getting a hobby', position: { x: 0, z: 0 }, description: 'After reading Rest, decided to get a hobby to be more effective and happier overall. Tried a two-month belly dance course, climbing, salsa, bachata, long and short distance running, pilates, and got my 200-hour yoga teacher training (I lost my first certificate). Then had a major life event and ended up on stage doing stand-up. Turns out I\'m actually pretty funny.' },
    { year: '2025', title: 'Learning how to socialise', position: { x: 15, z: -5 }, description: 'Started volunteering with autistic kids, helping run friendship-building sessions. Essentially events and conversation moderating to help kids learn social rules in a safe environment. Loneliness is a big theme here. Watching real connections form has been one of the best parts of my year.' },
    { year: '2025', title: 'Flopping to find myself', position: { x: 30, z: 0 }, description: 'After various talks with clinicians about a vague proof-of-concept I was half-pitching (journal entries and Apple Health data to track what happens between sessions - first proper Expo/React Native app with Typescript, CSS, HTML), I realized it wasn\'t all that useful. Unless it was an eating disorder or addiction, most clinicians just weren\'t that interested. I wasn\'t that married to it anyway—it was basically a cheaper, friendlier spin-off of the gene-testing idea. Then March happened. I had a bunch of meetings with investors, looked at my deck, and had a full-on night-before-pitch epiphany. I scrapped everything and decided to go with a problem I\'d actually been living: How do you find the right therapist? How do you predict which people someone will actually click with? I\'ve spent most of my life trying to systematize human interaction because otherwise I feel like an alien. So I built a terminal prototype where two GPT-3s with pre-defined personalities talked to each other. It was fun but expensive as hell. So I turned it into a whole thing—combined social simulation principles and recommender systems into a custom algorithm, then built it into a full-stack Flask app with login, booking, and Stripe. Tried to get clinicians onboard. Too risky, too early. So I repurposed the core engine to build a second app: this time, for finding friends you actually vibe with.' },
    { year: '2025', title: 'nGENEsis', position: { x: 45, z: -5 }, description: 'Applied solo to YC with a gene network psychiatry idea—made it to the top 10% (woot!). Surbhi said get a cofounder. Great advice that I ignored after doing hours of user interviews and speaking with people who work in gene-testing companies. Turns out the tests people actually need are expensive and hard to access, and the "affordable" ones are usually subsidized by selling user data. Whole-genome sequencing was the level I\'d need to analyze complete gene networks, and it\'s still pricey. Plus a couple of datasets I was counting on fell through. The only model that penciled out was to sell patient data or charge obscene fees (or water down the science to avoid WGS). Even then, it would be hard to know what to charge for the data to break even, let alone make a profit. The business model was more about hiking up the price of data than actually helping people. Hard pass. I\'m parking it until WGS is cheap and boring. Kept my ethics, lost the pitch. Worth it.' },
    { year: '2024', title: 'The gene network pivot that wasn\'t', position: { x: 60, z: 0 }, description: 'Gene network exploration that didn\'t quite pan out as expected.' },
    { year: '2024', title: 'Computational gene drive project', position: { x: 75, z: -5 }, description: 'This project was the first of two projects in my master\'s. It\'s where I truly put my coding skills to use to build a computational pipeline, where I wrote code to extract and quantify guide RNA sequences from different gene drives, in order to input it into a multivariate model to see whether gRNA sequence scores significantly influenced the inheritance rate of the overall gene drive. I then quantified the expression levels as measured by RNAseq of different promoters, to see if the expression of promoters at different life stages significantly influenced the inheritance rates of gene drives. Coding languages used include bash, R and Python. Code sharing with my supervisor Seb was done in GitHub.' },
    { year: '2023', title: 'Raising Moose', position: { x: 90, z: 0 }, description: 'Ah - Moose. I put a deposit for him in January. He was born end of April, I picked him in May and picked him up literally the week after my exams were done (after the May Ball and a fun trip to Spain of course). When I first got him I didn\'t feel the \'click\' I expected, and I struggled a lot with seemingly everything. Potty training took months because he refused to go to the toilet on anything that wasn\'t carpet. I tried sitting outside waiting for hours with a book, but he would hold it for literal hours until we went inside and he would immediately go on the carpet. It was exhausting. I took him outside every two hours - including in the middle of the night, and stood outside for about an hour at the very least each time. Quickly figured out that he\'s happy going on a carpet outside, so that\'s what I did for a month. Right when he was potty trained, I had a lab placement at the MRC-LMB to work on brain organoids which I was hyped about, but that meant he would have to be home alone for hours at a time. Ended up making it work by cycling back and forth over lunch to check in on him and take him out. Moved back to London to start my masters and he picked up a parasite. The parasite made him super aggressive. Suggestion to use a muzzle. Really helped my confidence to walk him without fear. Had a feeling he had a parasite. Treated the parasite. He stopped biting but started having problems with Scooby and other dogs. Got him fixed. He is much better but still a work in progress. Training in progress.' },
    { year: '2023', title: 'Brain organoids!', position: { x: 105, z: -5 }, description: 'Lab placement at the MRC-LMB working on brain organoids.' },
    { year: '2022', title: 'Indian Government Health Project', position: { x: 120, z: 0 }, description: 'Honestly have always been a bit of a social justice warrior. As a kid in suburbian Canada I would write to my local MP to present my solutions for global warming. They didn\'t really want to hear a 9-year-old\'s opinion so I presented it to my primary school instead, and put posters around my neighbourhood. So when the opportunity to work on a public health project cropped up at university I feel like my inner child squealed a little bit. Helped with the data analysis of population census data and paper writing to better understand what factors influence medication adherence in India.' },
    { year: '2022', title: 'Smg1 Research', position: { x: 135, z: -5 }, description: 'Found it really difficult to get this first placement. Applied around the board to about 50 labs - my interest was more in translational science, women\'s health and neurobiology, so this one was a little out of my comfort zone (hardcore molecular biology). Still took it one step at a time, read a textbook and a couple reviews to wrap my head around things and then I delved straight in. Really enjoyed my time there and my supervisor was really supportive, so I stayed on for the rest of the year for my bachelor\'s thesis as well.' },
    { year: '2021', title: 'Entheon Biomedical', position: { x: 150, z: 0 }, description: 'First time working for a startup. Absolutely loved it. Obsessed. Had to wear many different hats, so to speak. Helped with the design and building of pitch decks in coordination with the design team, taking meeting minutes - all that schnazz. But my main task was to fine tune the product after a merger. It was a gene test kit for the dosage of psychedelics for psychedelic assisted therapy. I was to construct a list - according to an in-depth literature review - of all relevant genes to be tested as part of the kit, as well as their level of relevance and to which drugs in particular. Presented my findings to the CEOs of both companies. Delighted that this resulted in a modification of the gene test kit. Learnt not only how to build a product and refine it but also how to communicate with a team and with key stakeholders. That was super fun.' },
    { year: '2020', title: 'Tour du Mont Blanc', position: { x: 165, z: -5 }, description: 'Graduated from high school during covid, started my first year at the beginning of the pandemic. Not crazy fun all the time, but this instance was. After completing my first half marathon two weeks prior, I packed my bags and walked through Switzerland, France and Italy over the course of 10 days, climbing on average one mountain a day and carrying a massive heavy bag of random things ranging from clothes to snacks to a ukelele and a nikon camera. Had to send the ukelele back home halfway through after having twisted my ankle and not being able to support as much weight. Rather unfortunate to not be able to bless the Swiss with my lovely musicality skills but it\'s probably for the best as they probably would have deported me. Continued the last five days on a twisted ankle. Completed the hike and enjoyed a lovely warm shower (I was very stinky).' },
    { year: '2019', title: 'Mind-controlled video game', position: { x: 180, z: 0 }, description: 'Honestly can\'t remember much about this project, although it was quite cool. Unsure if we ended up getting this to work, but got some EEG probes and followed a guide to try to make a mind controlled video game. To be honest I think it made me believe less in the ability to sense information from EEG headsets and made me skeptical of all those EEG headsets on line to \'track brain waves\' - why did I need to focus so hard for it to work if it should just pick up information in the background. Definitely EEG needs much more sensitivity for it to be an accurate tool in the future.' },
    { year: '2018', title: 'Hatching autistic quail', position: { x: 195, z: -5 }, description: 'I think this is often what people remember me for but it was actually one of my older projects. At this point I had hatched ducks and chickens the two years prior. Started with an incubator made out of two wineboxes, a lamp and some styrofoam insulation with a cup of water - which was rather unsuccessful unfortunately (RIP Jimmy 1.0 - name of the first egg from this incubator that never hatched). Upgraded to a Brinsea octagon 20 and never looked back - that thing incubated like a real bird. Probably near 80% hatch rate, including jimmy 2.0 - who ended up imprinting on me and running around the house. Was reading a lot of Simon Baron-Cohen\'s stuff at the time and had just finished his book prenatal testosterone in mind which was actually really persuasive to my easily influenced teenage brain. Wrote an article on Medium on how we need to embrace female-male brain differences. Got loads of praise from men. Was skeptical - worried about spreading misinformation accidentally so naturally tried it at home. Bought some quail eggs off ebay and 3-5 business days later I was doing my science. Instead of water I added humidity with soy milk which has phytoestrogens. Given the permeability of eggs the phytoestrogens should go straight to the growing chick, and I could monitor growth during development by candling the eggs. Then I could look at behavioural outcomes. N=3 and results were null (no difference) but it was still fun so heyo.' }
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

// Ground - extended to cover all buildings
const groundGeometry = new THREE.PlaneGeometry(300, 50);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x90EE90,
    roughness: 0.8
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.x = 75; // Center it over the path
ground.receiveShadow = true;
scene.add(ground);

// Path
const pathGeometry = new THREE.PlaneGeometry(300, 8);
const pathMaterial = new THREE.MeshStandardMaterial({
    color: 0xD2B48C,
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
