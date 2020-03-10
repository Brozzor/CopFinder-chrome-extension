window.addEventListener('load', function load(event){
    loginPage();
    let createButton = document.getElementById('launch');
    createButton.addEventListener('click', function() { launch(); return false;});

    let createButton2 = document.getElementById('buyLicence');
    createButton2.addEventListener('click', function() { redirectToBuy(); });
});

function loginPage(){
document.getElementById('app').innerHTML = `
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
          <p class="message">No token key ? <a id="buyLicence" href="#">Buy licence</a></p>
        </div>
      </div>
    </div>
    `;
}

function redirectToBuy(){
    chrome.tabs.create({url : 'http://cop-finder.com/'});
}

function launch(){
  let xhr = new XMLHttpRequest();
  let mail = document.getElementById('mail').value;
  let token = document.getElementById('token').value;
  let use = 'login';
	xhr.open("POST", "http://cop-finder.com/api/login.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("mail="+ mail + "&token=" + token + "&use=" + use);

    console.log(xhr);
}