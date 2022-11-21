import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Mesh } from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

var camera;
var scene;
var renderer;
var loader;

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

  
//   loader = new FontLoader();
//   loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

// 	const color = 0xffffff;

// 	const matDark = new THREE.LineBasicMaterial( {
// 		color: color,
// 		side: THREE.DoubleSide
// 	} );

// 	const matLite = new THREE.MeshBasicMaterial( {
// 		color: color,
// 		transparent: false,
// 		opacity: 1,
// 		side: THREE.DoubleSide
// 	} );

// 	const message = '   Three.js\nSimple text.\nSimple text.\nSimple text.\nSimple text.\nSimple text.';

// 	const shapes = font.generateShapes( message, 100 );

// 	const geometry = new THREE.ShapeGeometry( shapes );

// 	geometry.computeBoundingBox();

// 	const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

// 	geometry.translate( xMid, 0, 0 );

// 	// make shape ( N.B. edge view not visible )

// 	const text = new THREE.Mesh( geometry, matLite );
// 	text.position.z = 10;
// 	text.position.x = 20;
// 	text.position.y = 10;
// 	scene.add( text );

// 	// make line shape ( N.B. edge view remains visible )

// 	const holeShapes = [];

// 	for ( let i = 0; i < shapes.length; i ++ ) {

// 		const shape = shapes[ i ];

// 		if ( shape.holes && shape.holes.length > 0 ) {

// 			for ( let j = 0; j < shape.holes.length; j ++ ) {

// 				const hole = shape.holes[ j ];
// 				holeShapes.push( hole );

// 			}

// 		}

// 	}

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

// const message = '   Three.js\nSimple text.\nSimple text.\nSimple text.\nSimple text.\nSimple text.';
// const shapes = font.generateShapes( message, 100 );
// const geometry = new THREE.ShapeGeometry( shapes );

loader = new FontLoader();
loader.load('./fonts/Times New Roman Cyr_Regular.json', function(font){
	const geometry = new TextGeometry("Hi! \nHow are you?", {
		font: font,
		size: 6,
		height: 2,
});

const techlang = new TextGeometry("Technologies/Languages::\nSpring Boot/Java\nPostgreSQL\nMicroservices/REST API\nMockito\nMaven\nPython3\nRedis\nCMS\nReactJS\nThreeJs\nNodeJS\nJavaScript\nHTML/CSS/Bootstrap/MUI", {
	font: font,
	size: 1,
	height: 1,
});
const techlangMesh = new THREE.Mesh(techlang, [
	new THREE.MeshPhongMaterial({ color: 0xffffff }), // front
	new THREE.MeshPhongMaterial({ color: 0x000000 }) //side
]);
techlangMesh.position.x = -70;
techlangMesh.position.y = 30;
techlangMesh.position.z = -30;
techlangMesh.rotation.y = 3.14/4;
scene.add(techlangMesh);

const tools = new TextGeometry("Tools/Methodologies::\nIntelliJ IDEA/Visual Studio Code\nDBeaver\nGit/GitHub\nRESTful services\nPostman\nOpenAPI/ Swagger\nSonarQube\nGithub Actions DevOps\nJira Boards/ Kanban Boards\nConfluence/ Service Now\nTerminal/Bash/CLI\nDocker\nHeroku/RailwayApp", {
	font: font,
	size: 1,
	height: 1,
});
const toolsMesh = new THREE.Mesh(tools, [
	new THREE.MeshPhongMaterial({ color: 0xffffff }), // front
	new THREE.MeshPhongMaterial({ color: 0x000000 }) //side
]);
// toolsMesh.position.x = -70;
toolsMesh.position.y = 30;
toolsMesh.position.z = -30;
// toolsMesh.rotation.y = 3.14/4;
scene.add(toolsMesh);

const welcome = new TextGeometry("Hi there!\nWelcome to mediocre my Resume", {
	font: font,
	size: 6,
	height: 2,
});
const welcomeMesh = new THREE.Mesh(welcome, [
	new THREE.MeshPhongMaterial({ color: 0xffffff }), // front
	new THREE.MeshPhongMaterial({ color: 0x000000 }) //side
]);
welcomeMesh.position.x = 0;
welcomeMesh.position.y = 0;
welcomeMesh.position.z = -10;
welcomeMesh.rotation.x = -3.14/2;
scene.add(welcomeMesh);

const textMesh = new THREE.Mesh(geometry, [
	new THREE.MeshPhongMaterial({ color: 0xfffff }), // front
	new THREE.MeshPhongMaterial({ color: 0x5c2301 }) //side
]);

textMesh.position.x = 0;
textMesh.position.y = 0;
textMesh.position.z = 0;

scene.add(textMesh);
});


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
  camera.position.y = 1;
  // camera.position.y = (t) * -0.001;
}
document.body.onscroll = moveCamera;
moveCamera();


			// import * as THREE from 'three';
			// import { TWEEN } from 'three/addons/libs/tween.module.min.js';
			// import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
			// import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

			// const table = [
			// 	'Reuben', 'Hydrogen', '1.00794', 1, 1
			// ];

			// // let camera, scene, renderer;
			// let controls;

			// const objects = [];
			// const targets = { table: [], sphere: [], helix: [], grid: [] };

			// // init();
			// // animate();

			// function init() {

			// 	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
			// 	camera.position.z = 3000;

			// 	scene = new THREE.Scene();

			// 	// table

			// 	for ( let i = 0; i < table.length; i += 5 ) {

			// 		const element = document.createElement( 'div' );
			// 		element.className = 'element';
			// 		element.style.backgroundColor = 'rgba(0,127,127,' +  ')';

			// 		const symbol = document.createElement( 'div' );
			// 		symbol.className = 'symbol';
			// 		symbol.textContent = table[ i ];
			// 		element.appendChild( symbol );
          
			// 		const objectCSS = new CSS3DObject( element );
			// 		objectCSS.position.x = - 20;
			// 		// objectCSS.position.y = 4000 - 2000;
			// 		objectCSS.position.z = 30;
			// 		scene.add( objectCSS );

			// 		objects.push( objectCSS );

			// 		//

			// 		const object = new THREE.Object3D();
			// 		object.position.x = ( table[ i + 3 ] * 140 ) - 1330;
			// 		object.position.y = - ( table[ i + 4 ] * 180 ) + 990;


			// 		targets.table.push( object );

			// 	}

			// 	//
			// 	renderer1 = new CSS3DRenderer();

			// 	document.getElementById( 'container' ).appendChild( renderer1.domElement );

			// 	//
			// 	controls = new TrackballControls( camera, renderer1.domElement );
			// 	controls.minDistance = 500;
			// 	controls.maxDistance = 6000;
			// 	controls.addEventListener( 'change', render );

			// 	const buttonTable = document.getElementById( 'table' );

				

			// 	window.addEventListener( 'resize', onWindowResize );

			// }

			// function onWindowResize() {

			// 	camera.aspect = window.innerWidth / window.innerHeight;
			// 	camera.updateProjectionMatrix();

			// 	renderer1.setSize( window.innerWidth, window.innerHeight );

			// 	render();

			// }

			// function animate1() {

			// 	requestAnimationFrame( animate );

			// 	controls.update();

			// }

			// function render() {

			// 	renderer1.render( scene, camera );

			// }

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


			// function init( ) {

			// 	// camera.position.set( 0, - 400, 600 );

			// 	renderer = new THREE.WebGLRenderer( { antialias: true } );
			// 	renderer.setPixelRatio( window.devicePixelRatio );
			// 	renderer.setSize( window.innerWidth, window.innerHeight );
			// 	document.body.appendChild( renderer.domElement );

			// 	const controls = new OrbitControls( camera, renderer.domElement );
			// 	controls.target.set( 0, 0, 0 );
			// 	controls.update();

			// 	controls.addEventListener( 'change', render );

			// 	window.addEventListener( 'resize', onWindowResize );

			// } // end init

			// function onWindowResize() {

			// 	camera.aspect = window.innerWidth / window.innerHeight;
			// 	camera.updateProjectionMatrix();

			// 	renderer.setSize( window.innerWidth, window.innerHeight );

			// 	render();

			// }

			// function render() {

			// 	renderer.render( scene, camera );

			// }