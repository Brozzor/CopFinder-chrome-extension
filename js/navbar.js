window.addEventListener("load", function load(event) {
    document.getElementById('navbarCF').innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top mb-5">
    <a id="itemListNavBtn" class="navbar-brand supreme active" href="#">Item List</a>
    <a id="myCopNavBtn" class="navbar-brand supreme" href="#">My Cop</a>
    <a id="settingsNavBtn" class="navbar-brand supreme" href="#">Settings</a>
    <a id="logoutNavBtn" class="navbar-brand supreme" href="#" id="logout">Logout</a>
    </nav>`;

    let createNavButton = document.getElementById("itemListNavBtn");
    createNavButton.addEventListener("click", function() {
        window.location.href = "/pages/main.html";
    });

    let createNavButton2 = document.getElementById("myCopNavBtn");
    createNavButton2.addEventListener("click", function() {
        window.location.href = "/pages/mycop.html";
    });

    let createNavButton3 = document.getElementById("settingsNavBtn");
    createNavButton3.addEventListener("click", function() {
        window.location.href = "/pages/settings.html";
    });

    let createNavButton4 = document.getElementById("logoutNavBtn");
    createNavButton4.addEventListener("click", function() {
        localStorage["keyG"] = null;
        window.location.href = "/popup.html";
    });
    
    localStorage['lastPage'] = document.location.href.split("/")[3] + "/" + document.location.href.split("/")[4];

  });