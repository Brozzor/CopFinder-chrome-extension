window.addEventListener("load", function load(event) {
  let createButton = document.getElementById("logout");
  createButton.addEventListener("click", function() {
    localStorage["keyG"] = null;
    window.location.href = "popup.html";
  });
});

function mainPage() {
  document.getElementById("app").innerHTML = ``;
}
