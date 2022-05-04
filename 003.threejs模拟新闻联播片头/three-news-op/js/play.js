import { play as playEarth } from "./earth";
import { play as playRGB } from "./rgb";
import { play as playText } from "./text";

document.querySelector("#loading-wrap .loading").style.display = "none";
document.querySelector("#loading-wrap .text").style.display = "none";
document.querySelector("#loading-wrap .start").style.display = "flex";
document
  .querySelector("#loading-wrap .start")
  .addEventListener("click", (e) => {
    document.querySelector("#loading-wrap").style.display = "none";

    document.getElementById("bgm").play();

    playEarth();
    playRGB();
    setTimeout(() => {
      playText();
    }, 4000);
  });
