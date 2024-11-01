// lights.js
import * as THREE from 'three';

export function addLights(scene) {
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 0, 60);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff0000);
    pointLight2.position.set(0, 0, 0);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x0000ff);
    pointLight3.position.set(40, 0, 10);
    scene.add(pointLight3);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
}