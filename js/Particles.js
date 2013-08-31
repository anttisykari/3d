var THREE = require('three');

var particleCount = 100;

function Particles(scene) {
	this.scene = scene;

	if (!(this instanceof Particles)) {
		return new Particles();
	}

	this.particles = new THREE.Geometry(),
	this.material = new THREE.ParticleBasicMaterial({
		color: 0xFFFFFF,
		size: 0.4
	});

	for (var p = 0; p < particleCount; p++) {
		var pX = Math.random() * 10;
		var pY = Math.random() * 10;
		var pZ = Math.random() * 10;
		var particle = new THREE.Vector3(pX, pY, pZ);
		particle.velocity = new THREE.Vector3(
			.3 * (Math.random() - .5),
			.1 * (0.5 + Math.random()),
			.3 * (Math.random() - .5));

		this.particles.vertices.push(particle);
	}

	this.system = new THREE.ParticleSystem(
		this.particles,
		this.material);
	
	this.scene.add(this.system);
}

Particles.prototype.update = function() {
	for (var i = 0; i < particleCount; i++) {
		var p = this.particles.vertices[i];
		if (p.y < 0) {
			p.y = 0;
			p.velocity.multiply({ x: .8, y: -.8, z: .8 });
		}
		p.velocity.y -= 0.01;
		p.add(p.velocity);
	}
	this.particles.verticesNeedUpdate = true;
};

module.exports.Particles = Particles;

