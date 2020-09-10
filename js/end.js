window.addEventListener("load", () => {
  document.getElementById("score").innerText = sessionStorage.getItem("score");
  sessionStorage.clear();
});
