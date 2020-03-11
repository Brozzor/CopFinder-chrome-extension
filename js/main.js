window.addEventListener("load", function load(event) {
  mainPage();
  let createButton3 = document.getElementById("logout");
  createButton3.addEventListener("click", function() {
    localStorage["keyG"] = null;
    window.location.href = "popup.html";
  });
});

function mainPage() {
  document.getElementById("app").innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
        <a class="nav-item nav-link" href="#">Features</a>
        <a class="nav-item nav-link" href="#" id="logout">Logout</a>
      </div>
    </div>
  </nav>
    `;
}
