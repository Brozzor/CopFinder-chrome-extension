window.addEventListener("load", function load(event) {
  let createButton = document.getElementById("addTaskBtn");
  createButton.addEventListener("click", function() {
    if (taskPanelif == false) {
      taskPanel();
    } else {
      taskPanelif = false;
      document.getElementById("taskAddPanel").innerHTML = null;
      createButton.innerText = "ADD TASK";
    }
  });
});
let taskPanelif = false;

function taskPanel() {
  taskPanelif = true;
  document.getElementById("addTaskBtn").innerText = "CLOSE TASK";
  document.getElementById("taskAddPanel").innerHTML = `
    <div class="card mb-3 center-block mt-3" style="max-width: 95%;">
        <div class="row no-gutters">
          <div class="col-md-12 ">
            <div class="card-body">

              <div>
                <div class="form-group row">
                  <label class="col-sm-12 col-form-label center">Size</label>
                  <div class="col-sm-12 center">
                  <button data-id="1" data-selected="false" name="sizeBtn" class="btn btn-sm">S</button>
                  <button data-id="2" data-selected="false" name="sizeBtn" class="btn btn-sm">M</button>
                  <button data-id="3" data-selected="false" name="sizeBtn" class="btn btn-sm">L</button>
                  <button data-id="4" data-selected="false" name="sizeBtn" class="btn btn-sm">XL</button>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-sm-2">Shoe:</label>
                  <div class="col-sm-4">

                <select id="shoeData" class="form-control form-control-sm">
                  <option value="any" selected="">Open this select menu</option>
                  <option value="8">US 8 - UK 7 - EUR 41</option>
                  <option value="8.5">US 8.5 - UK 7.5 - EUR 42</option>
                  <option value="9">US 9 - UK 8 - EUR 42.5</option>
                  <option value="9.5">US 9.5 - UK 8.5 - EUR 43</option>
                  <option value="10">US 10 - UK 9 - EUR 44</option>
                  <option value="10.5">US 10,5 - UK 9,5 - EUR 44,5</option>
                  <option value="11">US 11 - UK 10 - EUR 45</option>
                  <option value="11.5">US 11,5 - UK 10,5 - EUR 45,5</option>
                  <option value="12">US 12 - UK 11 - EUR 46</option>
                </select>

                  </div>

                  <label class="control-label col-sm-2">Hat:</label>
                  <div class="col-sm-4">

                <select id="shoeData" class="form-control form-control-sm">
                  <option value="any" selected="">Open this select menu</option>
                  <option value="8">US 8 - UK 7 - EUR 41</option>
                  <option value="8.5">US 8.5 - UK 7.5 - EUR 42</option>
                  <option value="9">US 9 - UK 8 - EUR 42.5</option>
                  <option value="9.5">US 9.5 - UK 8.5 - EUR 43</option>
                  <option value="10">US 10 - UK 9 - EUR 44</option>
                  <option value="10.5">US 10,5 - UK 9,5 - EUR 44,5</option>
                  <option value="11">US 11 - UK 10 - EUR 45</option>
                  <option value="11.5">US 11,5 - UK 10,5 - EUR 45,5</option>
                  <option value="12">US 12 - UK 11 - EUR 46</option>
                </select>

                  </div>
                </div>
                <hr>
                <div class="center cat-task-name"><p id="catList"></p></div>
                <hr>
                <div class="form-group">
                  <button class="btn btn-block" data-selected="false" name="keywordFinderBtn">KEYWORD FINDER</button>
                  <div id="keywordFinder" hidden>
                    <center><button name="keywordFinderNewKeyBtn" class="btn btn-success btn-sm">Add New keyword</button></center>
                    <div class="row">
                    <div id="inputkf" class="col-sm-12">
                    <input type="text" data-id="1" name="keywordFinderInput" placeholder="Item Name / Color" class="form-control mb-1">
                    </div>
                    </div>
                    </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-block" data-selected="false" name="timerBtn">TIMER</button>
                </div>
                <div class="form-group">
                  <button class="btn btn-block" data-selected="false" name="checkoutDelayBtn">CHECKOUT DELAY</button>
                </div>
                <div class="form-group row">
                  <div class="col-sm-4">
                    <button class="btn btn-block" data-selected="false" name="anySizeBtn">ANY SIZE</button>
                  </div>
                  <div class="col-sm-4">
                    <button class="btn btn-block" data-selected="false" name="addToCartBtn">ADD TO CART</button>
                  </div>
                  <div class="col-sm-4">
                    <button class="btn btn-block" data-selected="false" name="checkoutBtn">CHECKOUT</button>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-6">
                    <button class="btn btn-block" data-selected="false" name="disImgBtn">DISPLAY IMAGES: ON</button>
                  </div>
                  <div class="col-sm-6">
                    <button class="btn btn-block supreme-btn" data-selected="true" name="disImgBtn">DISPLAY IMAGES: OFF</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  SearchBtnTaskPanel();
  requestApi("item-cat", "", displayCatList);
}

function SearchBtnTaskPanel() {
  document.getElementsByTagName('button').forEach(item => {
    item.addEventListener("click", event => {
      switch (item.name) {

        case "sizeBtn":
          let allBtn = document.getElementsByName("sizeBtn");
          let i = 0;
          while (i < allBtn.length) {
            if (
              allBtn[i].dataset.id == item.dataset.id &&
              allBtn[i].className != "btn btn-sm supreme-btn"
            ) {
              allBtn[i].className = "btn btn-sm supreme-btn";
              allBtn[i].dataset.selected = true;
            } else {
              allBtn[i].className = "btn btn-sm";
              allBtn[i].dataset.selected = false;
            }
            i++;
          }
          break;

        case "keywordFinderBtn":

          if (item.dataset.selected == "false"){
            item.dataset.selected = true;
            item.className = 'btn btn-block supreme-btn';
            document.getElementById('keywordFinder').hidden = false;
          }else{
            item.dataset.selected = false;
            item.className = 'btn btn-block';
            document.getElementById('keywordFinder').hidden = true;
          }
      
            break;
        case "keywordFinderNewKeyBtn":
                let id = document.getElementsByName('keywordFinderInput').length + 1;
                document.getElementById('inputkf').innerHTML += `
                <div id="kfDiv${id}" class="row">
                  <div class="col-sm-10"><input type="text" data-id="${id}" name="keywordFinderInput" placeholder="Item Name / Color" class="form-control"></div>
                  <div class="col-sm-2"><button name="keywordFinderDel" data-id="${id}" class="btn btn-sm">❌</button></div>
                </div>
                  `;
                  keywordFinderDel();

            break;

        default:
          break;
      }
    });
  });
}

function keywordFinderDel(){
  document.getElementsByName('keywordFinderDel').forEach(item => {
    item.addEventListener("click", event => {
      document.getElementById(`kfDiv${item.dataset.id}`).remove();
    });
  });

}

function requestApi(use, argv, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://cop-finder.com/api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("key=" + localStorage["keyG"] + "&use=" + use);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
      let res = JSON.parse(xhr.responseText);
      if (res[0].status == "1") {
        callback(res);
      }
    }
  };
}

function displayCatList(res) {
  for (let i = 1; i < res.length; i++) {
    document.getElementById(
      "catList"
    ).innerHTML += `<a class="ml-1 mr-1" name="catBtn" data-selected="false" data-id="${res[i].id}">${res[i].name} </a>`;
  }

  document.getElementsByName("catBtn").forEach(item => {
    item.addEventListener("click", event => {
      if (
        item.dataset.id == item.dataset.id &&
        item.className != "badge badge-danger ml-1 mr-1"
      ) {
        item.className = "badge badge-danger ml-1 mr-1";
        item.dataset.selected = true;
      } else {
        item.className = "ml-1 mr-1";
        item.dataset.selected = false;
      }
    });
  });
}
