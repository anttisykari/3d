//// Basic three.js init

var width = window.innerWidth - 10;
var height = window.innerHeight - 10;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
var renderer = new THREE.WebGLRenderer(); 
renderer.setSize(width, height);

scene.add(camera);

camera.position.z = 15;
camera.position.y = 2;

document.body.appendChild(renderer.domElement);



//// Keyboard handling

var keyname = require('keyname');
var keynameOrLetter = function(keyCode) {
	// Map 65-90 to [a-z]
	if (65 <= keyCode && keyCode <= 90) {
		return String.fromCharCode(keyCode + 32);
	}
	return keyname(keyCode);
}

// Keys that are down.
var keys = {};

window.onkeyup = function(e) {
	var key = keynameOrLetter(e.keyCode);
	if (key) {
		keys[key] = false;
	}
}

window.onkeydown = function(e) {
	var key = keynameOrLetter(e.keyCode);
	console.log('down', key);
	if (key) {
		keys[key] = true;
	}
}



//// Objects

function Plane() {
	var n = 20;
	var geometry = new THREE.PlaneGeometry(n, n, n, n);
	var material = new THREE.MeshBasicMaterial(
		{ color: 0x00ff00, wireframe: true });
	var plane = new THREE.Mesh(geometry, material);
	plane.rotation.x += Math.PI / 2;

	scene.add(plane);

	return plane;
}

function Ship() {
	var geometry = new THREE.Geometry();
	function vec(x, y, z) {
		geometry.vertices.push(new THREE.Vector3(x, y, z));
	}

	vec(0, 0, -2);
	vec(-1, 0, 0);
	vec(0, 1, 0);
	vec(1, 0, 0);

	function face(a, b, c) {
		geometry.faces.push(new THREE.Face3(a, b, c));
	}

	face(0, 1, 2);
	face(0, 2, 3);
	face(0, 3, 1);
	face(3, 2, 1);

	var material = new THREE.MeshBasicMaterial(
		{ color: 0xff0000, wireframe: true });
	var ship = new THREE.Mesh(geometry, material);

	ship.position.y = 0.5;
	scene.add(ship);

	return ship;
}

var plane = Plane();
var ship = Ship();



//// Camera

var turnSpeed = 0.02;
var moveSpeed = 0.08;

function frame() {
	requestAnimationFrame(frame);

	// FPS-style camera

	var fps = false;
	if (fps) {
		if (keys.left) {
			camera.rotation.y += turnSpeed;
		}

		if (keys.right) {
			camera.rotation.y -= turnSpeed;
		}

		if (keys.up) {
			camera.rotation.x += turnSpeed;
		}

		if (keys.down) {
			camera.rotation.x -= turnSpeed;
		}

		if (keys.a) {
			camera.position.x -= moveSpeed;
		}

		if (keys.d) {
			camera.position.x += moveSpeed;
		}

		if (keys.w) {
			camera.position.z -= moveSpeed;
		}

		if (keys.s) {
			camera.position.z += moveSpeed;
		}
	}

	if (keys.left) {
		ship.rotation.y += turnSpeed;
	}

	if (keys.right) {
		ship.rotation.y -= turnSpeed;
	}

	if (keys.up) {
		ship.rotation.x += turnSpeed;
	}

	if (keys.down) {
		ship.rotation.x -= turnSpeed;
	}

	if (keys.a) {
		ship.position.x -= moveSpeed;
	}

	if (keys.d) {
		ship.position.x += moveSpeed;
	}

	if (keys.w) {
		ship.position.z -= moveSpeed;
	}

	if (keys.s) {
		ship.position.z += moveSpeed;
	}

	camera.lookAt(ship.position);

	// render
	renderer.render(scene, camera);
}

frame();

