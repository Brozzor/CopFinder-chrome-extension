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

function mainPage() {

  document.getElementById("app").innerHTML = `
  <div class="row">
        <div id="left" class="col"></div>

        <div id="right" class="col"></div>

      
    </div>
  `;
}