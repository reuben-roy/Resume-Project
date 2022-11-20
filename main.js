import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Mesh } from 'three';

var camera;
var scene;
var renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
}

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight); /* makes the renderer full screen */

camera.position.setZ(30);

renderer.render(scene, camera);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize, false);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true});
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347});
const torus = new THREE.Mesh( geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5,5,5);
// pointLight.position.set(20, 20, 20);
// scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls( camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set( x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const reubenTexture = new THREE.TextureLoader().load('reuben.jpg');
const reuben = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: reubenTexture})
);
reuben.position.set(20, 10, 10);
scene.add(reuben);

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);


// Move camera
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
  // moon.rotateZ(0.05);

  reuben.rotation.y += 0.01;
  reuben.rotation.z += 0.01;

  camera.position.z = (t-10) * -0.01;
  // camera.position.x = (t) * -0.02;
  camera.position.y = (t) * -0.001;
}
document.body.onscroll = moveCamera;
moveCamera();

// Animated Moving Ring
// renderer.render(scene, camera)
function animate(){
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01; 

  controls.update();

  renderer.render( scene, camera );
}

animate();


// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank"><img src="/vite.svg" class="logo" alt="Vite logo" /></a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"><img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" /></a>
//     <h1>Hello Vite!</h1>
//     <div class="card"><button id="counter" type="button"></button></div>
//     <p class="read-the-docs">Click on the Vite logo to learn more</p>
//   </div>
// `
// setupCounter(document.querySelector('#counter'))
