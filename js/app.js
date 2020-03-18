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
  if (localStorage["keyG"] == "null" || localStorage["keyG"] == undefined) {
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
       // window.location.href = "pages/main.html";
       window.location.href = localStorage['lastPage'];
      } else {
        localStorage["keyG"] = null;
        window.location.href="popup.html"
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
          window.location.href = "pages/main.html";
        }, 1000);
      } else {
        notification("danger", "Mail or token is invalid");
      }
    }
  };
}
