window.addEventListener('load', function load(event){
    let createButton = document.getElementById('lunch');
    createButton.addEventListener('click', function() { lunch(); });

    let createButton2 = document.getElementById('buyLicence');
    createButton2.addEventListener('click', function() { redirectToBuy(); });
});

function loginPage(){
document.getElementById('app').innerHTML = `
<div class="login-page">
        <div class="form card">
          <form class="input-form login-page">
            <input type="mail" placeholder="Mail address"/>
            <input type="token" placeholder="Token key"/>
            <button onclick="lunch()" class="btn">Lunch app</button>
            <p class="message">Not token key ? <a onclick="lunch()" href="#">Buy licence</a></p>
          </form>
        </div>
      </div>`;
}

function redirectToBuy(){
    chrome.tabs.create({url : 'http://cop-finder.com'});
}

function lunch(){
    alert('cc');
}