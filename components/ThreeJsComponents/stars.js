// stars.js
import * as THREE from 'three';

export function createStars(scene, count = 200) {
    Array(count).fill().forEach(() => {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
        const star = new THREE.Mesh(geometry, material);

        // Randomize position within a specified range
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
        star.position.set(x, y, z);
        scene.add(star);
    });
}