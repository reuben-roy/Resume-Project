import "./style.css";
import javascriptLogo from "./javascript.svg";
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
// const bodyChanUrl = new URL('person_sculpture.glb', import.meta.url);
// const hornGuy = new URL('faceted_character_locomotion_animation.glb', import.meta.url);

var camera;
var scene;
var renderer;
var loader;
// var target = new THREE.Vector3();

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

// const iframe = document.getElementsByClassName("frame");
// [...iframe].forEach((x) => {
//   x.width = window.innerWidth * 0.8;
//   x.height = window.innerHeight * 0.8;
// });

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

  //  loader = new FontLoader();
  //  loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
  // 	const color = 0xffffff;
  // 	const matDark = new THREE.LineBasicMaterial( { color: color, side: THREE.DoubleSide } );
  //  const matLite = new THREE.MeshBasicMaterial( { color: color, transparent: false, opacity: 1,side: THREE.DoubleSide } );
  // 	const message = '   Three.js\nSimple text.\nSimple text.\nSimple text.\nSimple text.\nSimple text.';
  // 	const shapes = font.generateShapes( message, 100 );
  // 	const geometry = new THREE.ShapeGeometry( shapes );
  // 	geometry.computeBoundingBox();
  // 	const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
  // 	geometry.translate( xMid, 0, 0 );
  // 	// make shape ( N.B. edge view not visible )
  //  const text = new THREE.Mesh( geometry, matLite );
  //  text.position.z = 10; text.position.x = 20; text.position.y = 10;
  //  scene.add( text );
  // 	// make line shape ( N.B. edge view remains visible )
  //  const holeShapes = [];
  //  for ( let i = 0; i < shapes.length; i ++ ) {
  // 	const shape = shapes[ i ];
  // 	if ( shape.holes && shape.holes.length > 0 ) {
  // 		for ( let j = 0; j < shape.holes.length; j ++ ) {
  // const hole = shape.holes[ j ]; holeShapes.push( hole );
  // 		}
  // 	}
  // }

  // 	shapes.push.apply( shapes, holeShapes );
  // 	const lineText = new THREE.Object3D();
  // 	for ( let i = 0; i < shapes.length; i ++ ) {
  // 		const shape = shapes[ i ];
  // 		const points = shape.getPoints();
  // 		const geometry = new THREE.BufferGeometry().setFromPoints( points );
  // 		geometry.translate( xMid, 0, 0 );
  // 		const lineMesh = new THREE.Line( geometry, matDark );
  // 		lineText.add( lineMesh );
  // 	}
  // 	scene.add( lineText );
  // 	renderer.render();
  // } ); //end load function
}

function newFunction() {
  console.log("soemthing new");
}

newFunction();
function toggleSections() {
  console.log("three");
  //   var section = document.getElementById(sectionId);
  //   if (section.style.display === "none") {
  //     section.style.display = "block";
  //   } else {
  //     section.style.display = "none";
  //   }
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

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);
// scene.add(lightHelper, gridHelper);

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

// const reubenTexture = new THREE.TextureLoader().load('reuben.jpg');
// const reuben = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial({map: reubenTexture})
// );
// reuben.position.set(20, 10, 10);
// scene.add(reuben);

// Moon
// const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');
// const moon = new Mesh(
//   new THREE.SphereGeometry(3,32,32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//     normalMap: normalTexture
//   })
// );
// scene.add(moon);
// moon.position.z = 30;
// moon.position.setX(-10);

// const message = '   Three.js\nSimple text.\nSimple text.\nSimple text.\nSimple text.\nSimple text.';
// const shapes = font.generateShapes( message, 100 );
// const geometry = new THREE.ShapeGeometry( shapes );

// const assetLoader = new GLTFLoader();
// const rgbeLoader = new RGBELoader();
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 4;

// rgbeLoader.load('MR_INT-005_WhiteNeons_NAD.hdr', function(texture){
// 	texture.mapping = THREE.EquirectangularReflectionMapping;
// 	scene.environment = texture;

// 	// assetLoader.load(bodyChanUrl.href, function(gltf){
// 	// 	const model = gltf.scene;
// 	// 	model.position.set(20, 0, 0);
// 	// 	scene.add(model);
// 	// }, undefined, function(error){
// 	// 	console.error(error);
// 	// });
// });
// let model;
// assetLoader.load(hornGuy.href, function(gltf){
// 	model = gltf.scene;
// 	model.position.set(20, 0, 5);
// 	model.scale.setLength(0.2);
// 	scene.add(model);
// }, undefined, function(error){
// 	console.error(error);
// });

loader = new FontLoader();
loader.load("./fonts/Times New Roman Cyr_Regular.json", function (font) {
  const geometry = new TextGeometry("Hi! \nHow are you?", {
    font: font,
    size: 6,
    height: 2,
  });

  // const techlang = new TextGeometry("Technologies/Languages::\nSpring Boot/Java\nPostgreSQL\nMicroservices/REST API\nMockito\nMaven\nPython3\nRedis\nCMS\nReactJS\nThreeJs\nNodeJS\nJavaScript\nHTML/CSS/Bootstrap/MUI", {
  // 	font: font, size: 1, height: 1,
  // });
  // const techlangMesh = new THREE.Mesh(techlang, [
  // 	new THREE.MeshPhongMaterial({ color: 0xffffff }), // front
  // 	new THREE.MeshPhongMaterial({ color: 0x000000 }) //side
  // ]);
  // techlangMesh.position.x = -70; techlangMesh.position.y = 30; techlangMesh.position.z = -30; techlangMesh.rotation.y = 3.14/4;
  // scene.add(techlangMesh);
  // const tools = new TextGeometry("Tools/Methodologies::\nIntelliJ IDEA/Visual Studio Code\nDBeaver\nGit/GitHub\nRESTful services\nPostman\nOpenAPI/ Swagger\nSonarQube\nGithub Actions DevOps\nJira Boards/ Kanban Boards\nConfluence/ Service Now\nTerminal/Bash/CLI\nDocker\nHeroku/RailwayApp", {
  // font: font, size: 1, height: 1,
  // });

  const toolsMesh = new THREE.Mesh(tools, [
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // front
    new THREE.MeshPhongMaterial({ color: 0x000000 }), //side
  ]);
  toolsMesh.position.y = 30;
  toolsMesh.position.z = -30;
  scene.add(toolsMesh);

  // const welcome = new TextGeometry("Hi there!\nWelcome to mediocre my Resume", {
  // 	font: font,	size: 6, height: 2,
  // });
  // const welcomeMesh = new THREE.Mesh(welcome, [
  // 	new THREE.MeshPhongMaterial({ color: 0xffffff }), new THREE.MeshPhongMaterial({ color: 0x000000 }) //side
  // ]);
  // welcomeMesh.position.x = 0; welcomeMesh.position.y = 0;
  // welcomeMesh.position.z = -10; welcomeMesh.rotation.x = -3.14/2;
  // scene.add(welcomeMesh);

  const textMesh = new THREE.Mesh(geometry, [
    new THREE.MeshPhongMaterial({ color: 0xfffff }), // front
    new THREE.MeshPhongMaterial({ color: 0x5c2301 }), //side
  ]);

  textMesh.position.x = 0;
  textMesh.position.y = 0;
  textMesh.position.z = 0;

  scene.add(textMesh);
});

// // Move camera
// function moveCamera(){
//   const t = document.body.getBoundingClientRect().top;
//   moon.rotation.x += 0.05; moon.rotation.y += 0.075; moon.rotation.z += 0.05;
//   moon.rotateZ(0.05);
//   reuben.rotation.y += 0.01; reuben.rotation.z += 0.01; camera.position.z = (t-10) * -0.01;
//   camera.position.x = (t) * -0.02;
// }
// document.body.onscroll = moveCamera;
// moveCamera();

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

function typeText(text, elementId, delay, type) {
  var i = 0;
  var element = document.getElementById(elementId);
  switch (type) {
    case "string":
      var intervalId = setInterval(function () {
        // element.textContent += text.charAt(i);
        element.innerHTML += text.charAt(i);
        i++;
        if (i > text.length) {
          clearInterval(intervalId);
        }
      }, delay);
      break;
  }
}

typeText("FullStack | NIT Calicut", "designation", 100, "string");
typeText("Welcome to my resume website attempt 1!", "intro1", 100, "string");
typeText(
  "This is my mediocre attempt at telling you why you should hire me",
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

// function typeWriter(line, elementId1, index = 0) {
//   // if (index >= lines.length) {
//   //   return;
//   // }

//   // const line = lines[index];
//   const speed = 50; // Adjust this value to change the typing speed
//   const container = document.getElementById("five");

//   // Print each character of the line with a delay
//   for (let i = 0; i < line.length; i++) {
//     setTimeout(() => {
//       container.innerHTML += line.charAt(i);
//     }, i * speed);
//   }
// }

// // Example usage
// const lines = [
//   "This is the first line",
//   "This is the second line",
//   "This is the third line",
// ];

// typeWriter(lines, "five");

// for (let j = 0; j < 8; j++) {
//   observer.observe(cards[j]);
// }
