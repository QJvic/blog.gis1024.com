import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { earthTexture, cloudTexture } from "./preload";
import { camera, scene, composer } from "./initThree";

const outlinePass = new OutlinePass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  scene,
  camera
);
composer.addPass(outlinePass);

let geometry = new THREE.SphereGeometry(10, 100, 1000); //形状
let material = new THREE.MeshPhongMaterial({
  map: earthTexture,
});

let mesh = new THREE.Mesh(geometry, material);
mesh.position.set(8, -8, 15);
mesh.rotation.y = -Math.PI;
scene.add(mesh);

let mesh2 = new THREE.Mesh(
  new THREE.SphereGeometry(10.1, 100, 1000), //形状
  new THREE.MeshBasicMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 1,
  })
);
mesh.add(mesh2);

outlinePass.visibleEdgeColor.set("rgb(48,48,178)");
outlinePass.hiddenEdgeColor.set("rgb(0,0,0)");
outlinePass.edgeThickness = 10;
outlinePass.edgeGlow = 3;
outlinePass.selectedObjects = [mesh];

function play() {
  function animate() {
    mesh.rotation.y += 0.003;
    mesh2.rotation.y -= 0.002;
    requestAnimationFrame(animate);
  }
  animate();

  const tween = new TWEEN.Tween(mesh.position);
  tween.to({ x: 0, y: 0, z: 0 }, 3500);
  tween.start();
}

export { play };
