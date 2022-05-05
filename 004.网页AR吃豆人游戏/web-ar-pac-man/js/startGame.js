function initPoints() {
  const videoEl = document.getElementById("video");
  const videoHeight = videoEl.offsetHeight;
  const videoWidth = videoEl.offsetWidth;
  const playGroundWrapEl = document.getElementById("play-ground-wrap");

  const list = [];
  // 随机生成豆子
  for (let i = 0; i < 5; i++) {
    // 豆子离边界要有一定距离
    const x = videoWidth * getRandom(0.25, 0.75);
    const y = videoHeight * getRandom(0.25, 0.75);

    const div = document.createElement("div");
    div.classList.add("point");
    div.style.left = x + "px";
    div.style.top = y + "px";

    playGroundWrapEl.append(div);
    list.push(div);
  }
  return list;
}

let lastLeft, lastTop;
function checkEaten(manEl, pointsEl) {
  if (!pointsEl.length) {
    document.getElementById("success").style.display = "block";
    document.querySelector(".ctrls").style.display = "block";
    return;
  }

  const manLeft = Number(manEl.style.left.replace("px", ""));
  const manTop = Number(manEl.style.top.replace("px", ""));

  // // 修改吃豆人的朝向
  // // 暂时不修改朝向，因为改得太频繁，朝向乱飞
  // if (lastLeft !== undefined) {
  //   let delX = manLeft - lastLeft;
  //   let delY = manTop - lastTop;
  //   const deg = Math.atan(delY / delX) * 180;
  //   console.log(deg);
  //   manEl.style.transform = `rotate(${deg}deg)`;
  // }

  // 判断是否吃到了豆子
  for (let i = pointsEl.length - 1; i >= 0; i--) {
    const pointLeft = Number(pointsEl[i].style.left.replace("px", ""));
    const pointTop = Number(pointsEl[i].style.top.replace("px", ""));
    const distance2 =
      Math.pow(manLeft - pointLeft, 2) + Math.pow(manTop - pointTop, 2);
    const distance = Math.sqrt(distance2);
    if (distance <= 10 + 20) {
      pointsEl[i].remove();
      pointsEl.splice(i, 1);
    }
  }

  lastTop = manTop;
  lastLeft = manLeft;
}

function getRandom(n, m) {
  return Math.random() * (m - n) + n;
}

export { initPoints, checkEaten };
