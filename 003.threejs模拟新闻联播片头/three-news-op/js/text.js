import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { scene, renderer } from "./initThree";
import { font } from "./preload";

const materials = [
  new THREE.MeshPhongMaterial({ color: "#ffff00" }), // front
  new THREE.MeshPhongMaterial({ color: "#8d8d43" }), // side
];

// 创建第一段文字
const geometry1 = new TextGeometry("专业技术分享", {
  font: font,
  size: 0.8,
  height: 0.5,
  curveSegments: 12,
  bevelEnabled: false,
});
geometry1.center(); // 模型锚点设置为模型中心
const model1 = new THREE.Mesh(geometry1, materials);
scene.add(model1);

// 创建第二段文字
const geometry2 = new TextGeometry("GIS1024.COM", {
  font: font,
  size: 0.8,
  height: 0.5,
  curveSegments: 12,
  bevelEnabled: false,
});
geometry2.center(); // 模型锚点设置为模型中心
const model2 = new THREE.Mesh(geometry2, materials);
model2.position.z = 20;
model2.rotation.y = -Math.PI / 2;
model2.visible = false; // 先隐藏
scene.add(model2);

// 创建第三段文字
const geometry3 = new TextGeometry("技术联播", {
  font: font,
  size: 1.8,
  height: 0.5,
  curveSegments: 12,
  bevelEnabled: false,
});
geometry3.center(); // 模型锚点设置为模型中心
const model3 = new THREE.Mesh(geometry3, materials);
model3.position.y = 0.6;
model3.position.z = 36;
model3.rotation.x = -Math.PI / 2;
model3.visible = false; // 先隐藏
scene.add(model3);

// 创建第四段文字
const geometry4 = new TextGeometry("GIS1024.COM", {
  font: font,
  size: 0.7,
  height: 0.3,
  curveSegments: 12,
  bevelEnabled: false,
});
geometry4.center(); // 模型锚点设置为模型中心
// 允许剪裁，为了模型从左到右逐渐出现
renderer.localClippingEnabled = true;
// 剪裁面
const clipPlane4 = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0);
const materials4 = [
  new THREE.MeshPhongMaterial({
    color: "#3fb4e5",
    flatShading: true,
    clippingPlanes: [clipPlane4],
  }), // front
  new THREE.MeshPhongMaterial({
    color: "#096184",
    clippingPlanes: [clipPlane4],
  }), // side
];
const model4 = new THREE.Mesh(geometry4, materials4);
model4.position.y = -1.2;
model4.position.z = 20.2;
// 获取文字的长度，将剪裁面放至最左侧
const size4 = new THREE.Box3()
  .setFromObject(model4)
  .getSize(new THREE.Vector3());
clipPlane4.constant = -size4.x / 2;
model4.visible = true; // 可以不用隐藏，因为已经被切割到看不见了
scene.add(model4);

// 第一段字的动画，分为两个阶段：进场和旋转
model1.position.x = 5;
model1.position.z = 36;
model1.rotation.y = -Math.PI / 3;
// 进场
const tween1_1 = new TWEEN.Tween({
  x: 2.1,
  z: 32,
  ry: -Math.PI / 3,
});
tween1_1.to(
  {
    x: 0,
    z: 20,
    ry: 0,
  },
  1500
);
tween1_1.onUpdate((v) => {
  model1.position.x = v.x;
  model1.position.z = v.z;
  model1.rotation.y = v.ry;
});
// 旋转
const tween1_2 = new TWEEN.Tween(model1.rotation);
tween1_2.to(
  {
    y: Math.PI / 2,
  },
  500
);
tween1_2.onComplete(() => {
  // 第一段结束，准备第二段
  model1.visible = false;
  model2.visible = true;
});
tween1_1.chain(tween1_2);

// 第二段字的动画，分为两个阶段：旋转和退场
// 旋转
const tween2_1 = new TWEEN.Tween(model2.rotation);
tween2_1.to(
  {
    y: 0,
  },
  500
);
tween1_2.chain(tween2_1);
// 退场
const tween2_2 = new TWEEN.Tween(model2.position);
tween2_2.to(
  {
    z: 36,
  },
  1500
);
tween2_2.onComplete(() => {
  // 第二段文字退场，为第三段文字做准备
  model2.visible = false;
  model3.visible = true;
});
tween2_1.chain(tween2_2);

// 第三段文字动画
const tween3_1 = new TWEEN.Tween({
  z: 36,
  rx: -Math.PI / 2,
});
tween3_1.to(
  {
    z: 20,
    rx: 0,
  },
  4000
);
tween3_1.onUpdate((v) => {
  model3.position.z = v.z;
  model3.rotation.x = v.rx;
});
tween2_2.chain(tween3_1);

// 第四段文字动画，切割面从左往右移动
const tween4 = new TWEEN.Tween(clipPlane4);
tween4.to(
  {
    constant: size4.x / 2,
  },
  2000
);
// tween4要在tween3_1结束前1s开始播放，所以不能用链式，在下面用setTimeout
// tween3_1.chain(tween4);

function play() {
  tween1_1.start();
  setTimeout(() => {
    tween4.start();
  }, 7000);
}

export { play };
