import * as faceapi from "face-api.js";
import { checkEaten, initPoints } from "./startGame";

const video = document.getElementById("video");
if (navigator.mediaDevices.getUserMedia) {
  //最新的标准API
  navigator.mediaDevices.getUserMedia({ video: {} }).then(success).catch(error);
} else if (navigator.webkitGetUserMedia) {
  //webkit核心浏览器
  navigator.webkitGetUserMedia({ video: {} }, success, error);
} else if (navigator.mozGetUserMedia) {
  //firfox浏览器
  navigator.mozGetUserMedia({ video: {} }, success, error);
} else if (navigator.getUserMedia) {
  //旧版API
  navigator.getUserMedia({ video: {} }, success, error);
}

video.addEventListener("canplay", async (e) => {
  const videoHeight = video.videoHeight;
  const videoWidth = video.videoWidth;

  const playGroundWrapEl = document.getElementById("play-ground-wrap");
  playGroundWrapEl.style.height = videoHeight + "px";
  playGroundWrapEl.style.width = videoWidth + "px";

  const successEl = document.getElementById("success");
  successEl.style.height = videoHeight + "px";
  successEl.style.width = videoWidth + "px";

  const ctrlEl = document.querySelector(".ctrls");
  ctrlEl.style.height = videoHeight + "px";
  ctrlEl.style.width = videoWidth + "px";

  const devCanvasEl = document.getElementById("devCanvas");
  const videoEl = document.getElementById("video");

  await faceapi.nets.ssdMobilenetv1.loadFromUri("/weights");

  const manDiv = document.getElementById("man");

  const points = initPoints();

  document.querySelector("#loading-wrap").style.display = "none";

  async function animate() {
    requestAnimationFrame(animate);

    const result = await faceapi.ssdMobilenetv1(videoEl);
    if (result.length) {
      const x = result[0].box.width / 2 + result[0].box.left;
      const y = result[0].box.height / 2 + result[0].box.top;
      // 摄像头是镜像的，通过css transform: rotateY(180deg)调整过了，相应坐标也要取镜像的
      const mirrorX = videoEl.offsetWidth - x;
      manDiv.style.left = mirrorX + "px";
      manDiv.style.top = y + "px";
      checkEaten(manDiv, points);
    }

    // 如果是开发环境，把人脸识别的边框画出来，方便调试
    if (import.meta.env.DEV) {
      const dims = faceapi.matchDimensions(devCanvasEl, videoEl, true);
      faceapi.draw.drawDetections(
        devCanvasEl,
        faceapi.resizeResults(result, dims)
      );
    }
  }

  await animate();
});

async function success(stream) {
  video.srcObject = stream;
  video.play();
}

function error(error) {
  console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
}
