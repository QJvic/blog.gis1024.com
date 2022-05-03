const starCount = 10;
const bgDom = document.getElementById("bg");

for (let i = 0; i < starCount; i++) {
  const div = document.createElement("div");
  div.classList.add("star");
  bgDom.append(div);

  let x = `${Math.random() * 200}vmax`;
  let y = `${Math.random() * 100}vh`;
  let z = `${Math.random() * 200 - 100}vmin`;
  let rx = `${Math.random() * 360}deg`;
  div.style.setProperty("--x", x);
  div.style.setProperty("--y", y);
  div.style.setProperty("--z", z);
  div.style.setProperty("--rx", rx);

  let delay = `${Math.random() * 2000}ms`;
  div.style.animationDelay = delay;
  div.style.animationName = "hyper";
}
