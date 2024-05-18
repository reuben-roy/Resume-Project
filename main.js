import "./style.css";
import { setupCounter } from "./counter.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Mesh } from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import * as TWEEN from "@tweenjs/tween.js";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { typeText } from "./components/textTyper.js";
import { fetchAndDisplayHabiticaUser } from './components/habiticaUser.js';

var camera;
var scene;
var renderer;
var loader;

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

const headers = new Headers({
  "x-api-user": import.meta.env["VITE_USER_ID"],
  "x-api-key": import.meta.env["VITE_API_KEY"],
});

// Uncomment to render habitica component
// fetchAndDisplayHabiticaUser(headers);

function init() {
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
}

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(
  window.innerWidth,
  window.innerHeight
); /* makes the renderer full screen */

camera.position.setZ(30);

renderer.render(scene, camera);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onResize, false);

const geometry = new THREE.TorusGeometry(10, 3, 30, 100);
// const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true});
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
material.metalness = 1;
material.roughness = 0.4;
material.flatShading = true;
const torus = new THREE.Mesh(geometry, material);
torus.position.set(-10, 0, 0);
scene.add(torus);

const geometry2 = new THREE.TorusGeometry(16, 3, 30, 100);
const material2 = new THREE.MeshStandardMaterial({ color: 0x696969 });
material2.metalness = 1;
material2.roughness = 0.4;
material2.flatShading = true;
const torus2 = new THREE.Mesh(geometry2, material2);
torus2.position.set(-10, 0, 0);
scene.add(torus2);

const geometry3 = new THREE.TorusGeometry(22, 3, 30, 100);
const material3 = new THREE.MeshStandardMaterial({ color: 0x66b3ff });
material3.metalness = 1;
material3.roughness = 0.4;
material3.flatShading = true;
const torus3 = new THREE.Mesh(geometry3, material3);
torus3.position.set(-10, 0, 0);
scene.add(torus3);

const geometry4 = new THREE.TorusGeometry(28, 3, 30, 100);
const material4 = new THREE.MeshStandardMaterial({ color: 0x000033 });
material4.metalness = 1;
material4.roughness = 0.4;
material4.flatShading = true;
const torus4 = new THREE.Mesh(geometry4, material4);
torus4.position.set(-10, 0, 0);
scene.add(torus4);

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

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load(
  "https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
);
scene.background = spaceTexture;

loader = new FontLoader();
loader.load("./fonts/Times New Roman Cyr_Regular.json", function (font) {
  const geometry = new TextGeometry("Hi! \nHow are you?", {
    font: font,
    size: 6,
    height: 2,
  });

  const toolsMesh = new THREE.Mesh(tools, [
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // front
    new THREE.MeshPhongMaterial({ color: 0x000000 }), //side
  ]);
  toolsMesh.position.y = 30;
  toolsMesh.position.z = -30;
  scene.add(toolsMesh);

  const textMesh = new THREE.Mesh(geometry, [
    new THREE.MeshPhongMaterial({ color: 0xfffff }), // front
    new THREE.MeshPhongMaterial({ color: 0x5c2301 }), //side
  ]);

  textMesh.position.x = 0;
  textMesh.position.y = 0;
  textMesh.position.z = 0;

  scene.add(textMesh);
});

// Animated Moving Ring
// renderer.render(scene, camera)
function animate(t) {
  TWEEN.update(t);
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus2.rotation.x -= 0.02;
  torus3.rotation.x += 0.01;
  torus4.rotation.x -= 0.005;
  torus.rotation.y += 0.005;
  torus2.rotation.y -= 0.005;
  torus3.rotation.y += 0.001;
  torus4.rotation.y -= 0.01;
  torus.rotation.z += 0.01;
  torus2.rotation.z -= 0.05;
  torus3.rotation.z += 0.01;
  torus4.rotation.z -= 0.03;

  controls.update();

  renderer.render(scene, camera);
}

animate();

let tweenTorus = new TWEEN.Tween({ x: -20, y: 0, z: 0 })
  .to({ x: 20, y: 0, z: 0 }, 500)
  .onUpdate((coords) => {
    torus.position.x = coords.x;
    torus2.position.x = coords.x;
    torus3.position.x = coords.x;
    torus4.position.x = coords.x;
    torus.position.y = coords.y;
    torus2.position.y = coords.y;
    torus3.position.y = coords.y;
    torus4.position.y = coords.y;
    torus.position.z = coords.z;
    torus2.position.z = coords.z;
    torus3.position.z = coords.z;
    torus4.position.z = coords.z;
    console.log(coords.x, coords.y, coords.z);
    // console.log( torus.getWorldPosition(target).x, torus.getWorldPosition(target).y, torus.getWorldPosition(target).z);
    // console.log(torus.getWorldPosition(target).x);
  })
  .easing(TWEEN.Easing.Linear.None);
// tweenTorus.start();

let tweenTorusR = new TWEEN.Tween({ x: 20, y: 0, z: 0 })
  .to({ x: -20, y: 0, z: 0 }, 500)
  .onUpdate((coords) => {
    torus.position.x = coords.x;
    torus2.position.x = coords.x;
    torus3.position.x = coords.x;
    torus4.position.x = coords.x;
    torus.position.y = coords.y;
    torus2.position.y = coords.y;
    torus3.position.y = coords.y;
    torus4.position.y = coords.y;
    torus.position.z = coords.z;
    torus2.position.z = coords.z;
    torus3.position.z = coords.z;
    torus4.position.z = coords.z;
  })
  .easing(TWEEN.Easing.Linear.None);

let cameraAngles = {
  one: [0, 10, 30],
  two: [10, 20, 30],
  three: [10, 20, 30],
  four: [20, 20, 30],
  five: [10, 20, 30],
  six: [10, 20, 30],
  seven: [10, 20, 30],
  eight: [10, 20, 30],
};

let cards = [];
let arr = [
  "#one",
  '#spotify',
  "#two",
  "#three",
  "#four",
  "#five",
  "#six",
  "#seven",
  "#eight",
];
for (let i = 0; i < 8; i++) {
  cards.push(document.querySelector(arr[i]));
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.target.id === "one") {
        if (entry.isIntersecting) {
          tweenTorus.start();
          controls.update();
        } else {
          tweenTorusR.start();
        }
      } else if (entry.target.id === "two") {
      } else if (entry.target.id === "three") {
        if (entry.isIntersecting) {
          tweenTorus.start();
          controls.update();
        } else {
          tweenTorusR.start();
        }
      } else if (entry.target.id === "four") {
      } else if (entry.target.id === "five") {
        if (entry.isIntersecting) {
          tweenTorus.start();
          controls.update();
        } else {
          tweenTorusR.start();
        }
      } else if (entry.target.id === "six") {
      } else if (entry.target.id === "seven") {
        if (entry.isIntersecting) {
          tweenTorus.start();
          controls.update();
        } else {
          tweenTorusR.start();
        }
      } else {
      }
    });
  },
  {
    threshold: 0.5,
  }
);

typeText("FullStack | NIT Calicut", "designation", 100, "string");
typeText("Welcome to my random crappy unresponsive, unfinished website", "intro1", 100, "string");
typeText(
  "Below you can find my spotify. I added it here for absolutely no ducking reason",
  "intro2",
  100,
  "string"
);
typeText(
  "I want to learn more and make cool things",
  "manifestol1",
  100,
  "string"
);
typeText("And I wanna do it real fast", "manifestol2", 100, "string");