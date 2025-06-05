// toruses.js
import * as THREE from 'three';

export function addToruses(scene) {
    // Define torus configurations in an array for easy modification
    const torusConfigs = [
        { radius: 10, color: 0x000000 },
        { radius: 16, color: 0x000000 },
        { radius: 22, color: 0x000000 },
        { radius: 28, color: 0x000000 }
    ];

    // Create each torus and add to scene
    torusConfigs.forEach((config, index) => {
        const geometry = new THREE.TorusGeometry(config.radius, 3, 30, 100);
        const material = new THREE.MeshStandardMaterial({
            color: config.color,
            metalness: 1,
            roughness: 0.4,
            flatShading: true,
        });
        const torus = new THREE.Mesh(geometry, material);
        torus.position.set(-10, 0, 0); // Position all toruses at initial position
        scene.add(torus);

        // Optional: Add rotation animation to each torus for a dynamic effect
        animateTorus(torus, index);
    });
}

// Optional function to animate torus rotations
function animateTorus(torus, index) {
    function rotate() {
        requestAnimationFrame(rotate);
        torus.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1);  // Alternate direction
        torus.rotation.y += 0.005 * (index % 2 === 0 ? 1 : -1);
        torus.rotation.z += 0.01 * (index % 2 === 0 ? 1 : -1);
    }
    rotate();
}