window.addEventListener("load", function load(event) {
    initialItemList();
  });

function itemPage(res) {
  document.getElementById("app").innerHTML = `
  <br>
  <center>
    <h1 id="title" class="supreme-white-h1">${res[1].title}</h1>
  </center>
  
  <div class="col" style="position: relative;">
    <!--card-->
    <div class="card mb-3 center-block" style="max-width: 95%;">
        <div class="row no-gutters">
          <div class="col-md-6">
            <img src="${res[1].imgLink}" class="card-img img-item">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">Settings item for cop</h5>
              <p class="card-text">Size :
              <select id="sizeData" class="form-control form-control-sm">
                <option value="any" selected>Open this select menu if item need size</option>
                <option value="1">S</option>
                <option value="2">M</option>
                <option value="3">L</option>
                <option value="4">XL</option>
              </select> </p>

              <p class="card-text">Shoe :
              <select id="shoeData" class="form-control form-control-sm">
                <option value="any" selected>Open this select menu if item need shoe size</option>
                <option value="8">US 8 - UK 7 - EUR 41</option>
                <option value="8.5">US 8.5 - UK 7.5 - EUR 42</option>
                <option value="9">US 9 - UK 8 - EUR 42.E</option>
                <option value="9.5">US 9.5 - UK 8.5 - EUR 43</option>
                <option value="10">US 10 - UK 9 - EUR 44</option>
                <option value="10.5">US 10,5 - UK 9,5 - EUR 44,5</option>
                <option value="11">US 11 - UK 10 - EUR 45</option>
                <option value="11.5">US 11,5 - UK 10,5 - EUR 45,5</option>
                <option value="12">US 12 - UK 11 - EUR 46</option>
              </select> </p>
              <p class="card-text">Datetime :
              <input type="datetime-local" class="form-control form-control-sm" id="datetimeData"  required>
              </p>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="choice1" checked>
                <label class="custom-control-label" for="choice1">Any Size</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="choice2" checked>
                <label class="custom-control-label" for="choice2">add to cart automaticaly</label>
              </div>
              <div class="custom-control custom-checkbox mb-2">
                <input type="checkbox" class="custom-control-input" id="choice3" checked>
                <label class="custom-control-label" for="choice3">Checkout automaticaly</label>
              </div>
              <div class="row no-gutters">
                <button id="redirectWebsiteSup" data-link="${res[1].link}" class="btn btn-outline-grey btn-sm">View on supreme</button>
                <button id="selectToCop" class="btn btn-danger btn-sm">Select to cop</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- Card -->
  </div>
    
    `;
}

function initialItemList() {
  let xhr = new XMLHttpRequest();
  let use = "item-choice";
  xhr.open("POST", "http://cop-finder.com/api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(
    "key=" +
      localStorage["keyG"] +
      "&use=" +
      use +
      "&itemId=" +
      localStorage["item-choice"]
  );
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
      let res = JSON.parse(xhr.responseText);
      if (res[0].status == "1") {
        itemPage(res);
        console.log(res);
      } else {
        localStorage["keyG"] = null;
        window.location.href = "/popup.html";
      }
    }
  };
}
