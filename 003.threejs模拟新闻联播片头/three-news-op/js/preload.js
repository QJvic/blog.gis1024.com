import * as THREE from "three";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader.js";
import { Font } from "three/examples/jsm/loaders/FontLoader";

// 预加载图片
const images = [
  "/assets/rgb-r-small.png",
  "/assets/rgb-g-small.png",
  "/assets/rgb-b-small.png",
];
const list = images.map((item) => {
  return loadImage(item);
});
const rgb = await Promise.all(list);

// 预加载贴图
const textures = ["/assets/earthmap2k.jpg", "/assets/earthCloud.png"];
const textureList = textures.map((item) => {
  return loadTexture(item);
});
const [earthTexture, cloudTexture] = await Promise.all(textureList);

// 预加载字体
const font = await loadTTF("/assets/minTFF/FangZhengHeiTiJianTi-1.ttf");

export { rgb, earthTexture, cloudTexture, font };

// 预加载图片
function loadImage(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

// 预加载贴图
function loadTexture(url) {
  const loader = new THREE.TextureLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        resolve(texture);
      },
      (progress) => {},
      (e) => reject(e)
    );
  });
}

// 预加载字体
function loadTTF(url) {
  const loader = new TTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (json) => {
        const font = new Font(json);
        resolve(font);
      },
      (progress) => {},
      (e) => reject(e)
    );
  });
}
