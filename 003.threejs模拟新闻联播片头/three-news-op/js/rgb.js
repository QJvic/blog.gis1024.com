import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { rgb } from "./preload";

const bgDom = document.getElementById("three");

// red
const r = rgb[0];
bgDom.append(r);
r.width = bgDom.offsetWidth * 0.8;
r.height = bgDom.offsetHeight * 0.8;
r.style.position = "absolute";
r.style.top = "0";
r.style.right = "0";
r.style.transform = `translate(${r.width}px, -${r.height}px)`;

const tweenR = new TWEEN.Tween({ x: r.width, y: -r.height });
tweenR.to(
  {
    x: -bgDom.offsetWidth,
    y: bgDom.offsetHeight,
  },
  2000
);
tweenR.onUpdate((v) => {
  r.style.transform = `translate(${v.x}px, ${v.y}px)`;
});

// blue
const b = rgb[2];
bgDom.append(b);
b.width = bgDom.offsetWidth * 0.8;
b.height = bgDom.offsetHeight * 0.8;
b.style.position = "absolute";
b.style.bottom = 0;
b.style.right = 0;
b.style.transform = `translate(${r.width}px, ${r.height}px)`;

const tweenB = new TWEEN.Tween({ x: r.width, y: r.height });
tweenB.to(
  {
    x: -bgDom.offsetWidth,
    y: -bgDom.offsetHeight,
  },
  2000
);
tweenB.onUpdate((v) => {
  b.style.transform = `translate(${v.x}px, ${v.y}px)`;
});

// green
const g = rgb[1];
bgDom.append(g);
g.width = bgDom.offsetWidth * 0.8;
g.height = bgDom.offsetHeight * 0.8;
g.style.position = "absolute";
g.style.bottom = 0;
g.style.left = 0;
g.style.transform = `translate(${-r.width}px, ${r.height}px)`;

const tweenG = new TWEEN.Tween({ x: -r.width, y: r.height });
tweenG.to(
  {
    x: bgDom.offsetWidth,
    y: -bgDom.offsetHeight,
  },
  2000
);
tweenG.onUpdate((v) => {
  g.style.transform = `translate(${v.x}px, ${v.y}px)`;
});

function play() {
  tweenR.start();
  setTimeout(() => tweenB.start(), 1300);
  setTimeout(() => tweenG.start(), 2600);
}

export { play };
