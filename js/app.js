window.addEventListener("load", function load(event) {
  reconnectFromKey();
  let createButton = document.getElementById("launch");
  createButton.addEventListener("click", function() {
    launch();
  });

  let createButton2 = document.getElementById("buyLicence");
  createButton2.addEventListener("click", function() {
    redirectToBuy();
  });

  let createButton3 = document.getElementById("logout");
  createButton3.addEventListener("click", function() {
    localStorage["keyG"] = null;
    loginPage();
  });
});

function loginPage() {
  document.getElementById("app").innerHTML = `

<div class="login-page">

      <br />
      <div class="form card">
      <center>
        <img width="200" src="img/logo.png" alt="" />
      </center>
        <div class="input-form login-page">
          <input id="mail" type="mail" placeholder="Mail address" />
          <input id="token" type="token" placeholder="Token key" />
          <button id="launch" class="btn">Launch app</button>
          <p class="message">No token key ? <a id="buyLicence" href="#">Buy licence</a></p><br>
          <div id="notification"> </div>
        </div>
      </div>
    </div>
    `;
}
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
      <a class="nav-item nav-link" href="#" >Logout</a>
      <button id="logout"></button>
    </div>
  </div>
</nav>
  `;
}

function redirectToBuy() {
  chrome.tabs.create({ url: "http://cop-finder.com/" });
}

function notification(color, message) {
  document.getElementById("notification").innerHTML += `
<div class="alert alert-${color}" role="alert">
  ${message}
</div>`;
  setTimeout(function() {
    delNotification();
  }, 3000);
}

function delNotification() {
  document.getElementById("notification").innerHTML = null;
  if (document.getElementById("launch").disabled == true) {
    document.getElementById("launch").disabled = false;
  }
}

function reconnectFromKey() {
  if (localStorage["keyG"] == "null") {
    loginPage();
    return false;
  }

  let xhr = new XMLHttpRequest();
  let use = "reconnect";
  xhr.open("POST", "http://cop-finder.com/api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("key=" + localStorage["keyG"] + "&use=" + use);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
      let res = JSON.parse(xhr.responseText);
      if (res.status == "1") {
        //mainPage();
        window.location.href = "main.html";
      } else {
        loginPage();
      }
    }
  };
}

function launch() {
  document.getElementById("launch").disabled = true;
  let xhr = new XMLHttpRequest();
  let mail = document.getElementById("mail").value;
  let token = document.getElementById("token").value;
  let use = "login";
  xhr.open("POST", "http://cop-finder.com/api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("mail=" + mail + "&token=" + token + "&use=" + use);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
      let res = JSON.parse(xhr.responseText);
      if (res.status == "1") {
        localStorage["keyG"] = res.key;
        console.log(localStorage);
        notification("success", res.status_message);
        setTimeout(function() {
          //mainPage();
          window.location.href = "main.html";
        }, 1000);
      } else {
        notification("danger", "Mail or token is invalid");
      }
    }
  };
}
