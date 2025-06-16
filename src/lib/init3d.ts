import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function init3d(container: HTMLElement) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(2, 1.5, 3);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 0.5);
  directional.position.set(5, 5, 5);
  scene.add(directional);

  const phoneGeometry = new THREE.BoxGeometry(1, 2, 0.1);
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0x333333 }), // left
    new THREE.MeshStandardMaterial({ color: 0x333333 }), // right
    new THREE.MeshStandardMaterial({ color: 0x333333 }), // top
    new THREE.MeshStandardMaterial({ color: 0x333333 }), // bottom
    new THREE.MeshStandardMaterial({ color: 0xdddddd }), // front (screen off)
    new THREE.MeshStandardMaterial({ color: 0x333333 })  // back
  ];
  const phone = new THREE.Mesh(phoneGeometry, materials);
  scene.add(phone);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}