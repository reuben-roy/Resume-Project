import "./blog.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createStars } from '../../components/ThreeJsComponents/stars.js';
import { addLights } from "../../components/ThreeJsComponents/lights.js";
import { initBlog } from "./blogController.js";

// Initialize the blog when the page loads
document.addEventListener('DOMContentLoaded', initBlog);

var camera;
var scene;
var renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

camera.position.setZ(30);

renderer.render(scene, camera);

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onResize, false);

addLights(scene);
createStars(scene, 200);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

const spaceTexture = new THREE.TextureLoader().load(
    "https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
);
scene.background = spaceTexture;

function animate(t) {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();