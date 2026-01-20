import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

((d, w) => {
	let scene, camera, renderer, pointLight, controls;

	const init = () => {
		// シーンを追加
		scene = new THREE.Scene();

		// カメラを追加
		camera = new THREE.PerspectiveCamera(
			50, // 視野角
			w.innerWidth / w.innerHeight, // アスペクト比
			0.1, // 開始距離
			1000, // 終了距離
		);
		camera.position.set(0, 0, +500);

		// レンダラーを追加
		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(w.innerWidth, w.innerHeight);
		renderer.setPixelRatio(w.devicePixelRatio);
		d.body.appendChild(renderer.domElement);

		// テクスチャを追加
		const texture = new THREE.TextureLoader().load("./textures/earth.jpg");

		// ジオメトリ（骨格：形）を作成
		const ballGeometry = new THREE.SphereGeometry(
			100, // 半径
			64, // 横分割数
			32, // 縦分割数
		);
		// マテリアル（表面の質感）を作成
		const ballMaterial = new THREE.MeshPhysicalMaterial({ map: texture });
		// メッシュ化（ジオメトリとマテリアルを結合）
		const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
		// シーンに追加
		scene.add(ballMesh);

		// 平行光源を追加
		const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
		directionalLight.position.set(1, 1, 1);
		scene.add(directionalLight);

		// ポイント光源を追加
		pointLight = new THREE.PointLight(0xffffff, 1);
		pointLight.position.set(-200, -200, -200);
		scene.add(pointLight);
		pointLight.decay = 1;
		pointLight.power = 1000;

		// ポイント光源の位置を特定
		const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
		scene.add(pointLightHelper);

		pointLight.position.set(
			200 * Math.sin(Date.now() / 500),
			200 * Math.sin(Date.now() / 1000),
			200 * Math.cos(Date.now() / 500),
		);

		// マウス操作を有効化
		controls = new OrbitControls(camera, renderer.domElement);

		animate();
	};

	// ブラウザのリサイズに対応
	const onWindowResize = () => {
		renderer.setSize(w.innerWidth, w.innerHeight);
		camera.aspect = w.innerWidth / w.innerHeight;
		camera.updateProjectionMatrix();
	};

	const animate = () => {
		// ポイント光源を動かす
		pointLight.position.set(
			200 * Math.sin(Date.now() / 500),
			200 * Math.sin(Date.now() / 1000),
			200 * Math.cos(Date.now() / 500),
		);

		// レンダリング
		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	};

	w.addEventListener("load", init);
	w.addEventListener("resize", onWindowResize);
})(document, window);
