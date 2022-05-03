import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

const dom = document.getElementById("three");
const domW = dom.offsetWidth;
const domH = dom.offsetHeight;

// 屏幕物理像素和px比率
renderer.setPixelRatio(window.devicePixelRatio);
// three.js 的色彩空间渲染方式
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.textureEncoding = THREE.sRGBEncoding;
// 设置canvas宽高
renderer.setSize(domW, domH);
// 将renderer 加到dom元素上
dom.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, domW / domH, 1, 1000);
camera.position.set(0, 0, 35);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 800;
controls.autoRotateSpeed = 1.7;
if (!import.meta.env.DEV) controls.enabled = false;

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const effectFXAA = new ShaderPass(FXAAShader);
effectFXAA.uniforms["resolution"].value.set(
  1 / window.innerWidth,
  1 / window.innerHeight
);
composer.addPass(effectFXAA);

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  composer.render();
  TWEEN.update();
}
animate();

window.addEventListener("resize", () => {
  const dom = document.getElementById("three");
  const domW = dom.offsetWidth;
  const domH = dom.offsetHeight;
  renderer.setSize(domW, domH);
  renderer.setPixelRatio(window.devicePixelRatio);
  composer.setSize(domW, domH);
  composer.setPixelRatio(window.devicePixelRatio);
  camera.aspect = domW / domH;
  camera.updateProjectionMatrix();
});

// 如果是开发环境添加坐标轴，方便调试
if (import.meta.env.DEV) {
  const helper = new THREE.AxesHelper(200);
  scene.add(helper);
}

const light = new THREE.AmbientLight("#ffffff", 0.8);
scene.add(light);

const light2 = new THREE.DirectionalLight("#ffffff", 0.5);
light2.position.set(1, 1, 1).normalize();
scene.add(light2);

window.app = { scene, camera, renderer, controls, composer };

export { scene, camera, renderer, controls, composer };
