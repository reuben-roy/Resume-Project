import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
import { typeText } from "./components/textTyper.js";
import { fetchAndDisplayHabiticaUser } from './components/habiticaUser.js';
import { createStars } from './components/ThreeJsComponents/stars.js';
import { addLights } from "./components/ThreeJsComponents/lights.js";
import { addToruses } from "./components/ThreeJsComponents/toruses.js";

var camera;
var scene;
var renderer;

const headers = new Headers({
  "x-api-user": import.meta.env["VITE_USER_ID"],
  "x-api-key": import.meta.env["VITE_API_KEY"],
});

// Uncomment to render habitica component
fetchAndDisplayHabiticaUser(headers);

// initializeThreeJS();

typeText("My name is Reuben", "name", 50, "string");
typeText("FullStack | ASU | NIT Calicut", "title", 50, "string");
typeText("I'm a FullStack Web Developer, with more than a couple of years of work experience. I'm presently doing a Masters program at Arizona State University and I did my Undergraduate degree from NIT Calicut before this.", "intro", 20, "string");
typeText("But as you can expect, a person is more than just their job title", "caveat", 150, "string");

// Add this function to populate LinkedIn data
function updateLinkedInCard() {
  // Replace with your actual LinkedIn data or API integration
  const linkedinData = {
    name: "Reuben Roy",
    headline: "FullStack Web Developer | ASU Graduate Student | NIT Calicut Alumnus",
    profilePicture: "./media/reuben-profile.jpg",
    location: "Tempe, United States",
    profileUrl: "https://www.linkedin.com/in/reuben-roy/"
  };

  document.getElementById('linkedinName').textContent = linkedinData.name;
  document.getElementById('linkedinHeadline').textContent = linkedinData.headline;
  document.getElementById('linkedinProfilePic').src = linkedinData.profilePicture;
  document.getElementById('linkedinConnections').textContent = linkedinData.connections;
  document.getElementById('linkedinLocation').textContent = linkedinData.location;
  document.getElementById('linkedinProfileLink').href = linkedinData.profileUrl;
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateLinkedInCard);


function initializeThreeJS() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

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
  renderer.setSize(0, 0);

  // renderer.setSize(
  //   window.innerWidth,
  //   window.innerHeight
  // );
  camera.position.setZ(30);

  renderer.render(scene, camera);

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onResize, false);

  addToruses(scene);
  addLights(scene);
  createStars(scene, 50);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  // Animated Moving Ring
  // renderer.render(scene, camera)
  function animate(t) {
    TWEEN.update(t);
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
  }

  animate();
}