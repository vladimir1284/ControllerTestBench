<script lang="ts">
	import { onMount } from 'svelte';

	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
	import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

	let camera, scene, renderer, controls, model;

	const antennaPivot = new THREE.Group();

	export let azimuth = 20;
	export let elevation = 0;
	export let width = 300;
	let height;
	let loaded = false;

	$: {
		height = width;
		if (loaded) {
			onWindowResize();
		}
	}

	$: {
		positionAntenna(azimuth, elevation);
	}

	function positionAntenna(azimuth: number, elevation: number) {
		if (model != undefined) {
			antennaPivot.rotation.y = azimuth;
			antennaPivot.rotation.z = elevation;
			render();
		}
	}

	function init() {
		const container = document.getElementById('scene');
		// document.body.appendChild(container);

		camera = new THREE.PerspectiveCamera(95, width / height, 2.5, 150);
		camera.position.set(50, 0, 50);

		scene = new THREE.Scene();

		// new RGBELoader().load("/landscape-169026466.hdr", function (texture) {
		// new RGBELoader().load("/download.hdr", function (texture) {
		new RGBELoader().load(
			// "/4591021-landscape-nature-fisheye-lens-sky-trees-mountains-panorama.hdr",
			'/cloudy-landscape-nature-fisheye-lens-sky-trees-mountains-panorama.hdr',
			function (texture) {
				// texture.mapping = THREE.EquirectangularReflectionMapping;
				// texture.mapping = THREE.EquirectangularReflectionMapping;

				scene.background = texture;
				// scene.environment = texture;
				// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
				// scene.add(directionalLight);
				render();

				// model
				// var geometry = new THREE.SphereBufferGeometry(6, 32, 32);
				// var material = new THREE.MeshNormalMaterial();

				// sun
				// var sun = new THREE.Mesh(geometry, material);
				// scene.add(sun);

				// Light
				var light = new THREE.DirectionalLight(0xffffff, 1);
				light.position.set(50, 0, 50);
				scene.add(light);

				const loader = new GLTFLoader();
				loader.load('Antenna-mirror.glb', function (gltf) {
					model = gltf.scene;
					model.position.set(10, 0, 0);
					// Set material
					var newMaterial = new THREE.MeshStandardMaterial({
						color: 0xffffff,
						roughness: 0.7,
						metalness: 0.5,
						reflectivity: 0.7
					});
					model.traverse((o) => {
						if (o.isMesh) o.material = newMaterial;
					});
					// scene.add(model);
					antennaPivot.add(model);
					scene.add(antennaPivot);
					// sun.add(antennaPivot);
					positionAntenna(azimuth, elevation);
				}).setMaterials;
			}
		);

		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width, height);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1;
		renderer.outputEncoding = THREE.sRGBEncoding;
		container.appendChild(renderer.domElement);

		controls = new OrbitControls(camera, renderer.domElement);
		// controls.addEventListener('change', render); // use if there is no animation loop
		// controls.minDistance = 2;
		// controls.maxDistance = 100;
		controls.target.set(0, 0, -0.2);
		// controls.update();
	}

	function onWindowResize() {
		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize(width, height);

		render();
	}

	//

	function render() {
		renderer.render(scene, camera);
		// console.log(camera.position)
		// console.log(controls.target)
	}

	onMount(() => {
		init();
		render();
		loaded = true;
	});
</script>

<div id="scene" />
