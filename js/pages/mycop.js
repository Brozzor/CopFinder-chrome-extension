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

                <select id="hatData" class="form-control form-control-sm">
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
                  <button class="btn btn-block" data-selected="false" id="keywordFinderBtn" name="keywordFinderBtn">KEYWORD FINDER</button>
                  <div id="keywordFinder" hidden>
                    <center><button name="keywordFinderNewKeyBtn" class="btn btn-success btn-sm">Add New keyword</button></center>
                    <div class="row">
                    <div id="inputkf" class="col-sm-12">
                    <input type="text" data-id="1" data-selected="true" name="keywordFinderInput" placeholder="Item Name / Color" class="form-control mb-1">
                    </div>
                    </div>
                    </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-block" data-selected="false" id="timerBtn" name="timerBtn">TIMER</button>
                  <div id="timer" hidden>
                    <div class="row">
                    <div class="col-sm-12">
                    <input type="datetime-local" id="timerInput" name="timerInput" placeholder="Set time" class="form-control mb-1">
                    </div>
                    </div>
                    </div>
                  </div>
                <div class="form-group">
                  <button class="btn btn-block" data-selected="false" id="checkoutDelayBtn" name="checkoutDelayBtn">CHECKOUT DELAY</button>
                  <div id="checkoutDelay" hidden>
                    <div class="row">
                    <div class="col-sm-12">
                    <input type="text" name="checkoutDelayInput" id="checkoutDelayInput" value="4000" placeholder="Time in milliseconds" class="form-control mb-1">
                    </div>
                    </div>
                    </div>
                  </div>
                  </div>
                <div class="form-group row">
                  <div class="col-sm-4">
                    <button class="btn btn-block" data-selected="false" data-id="1" id="anySizeBtn" name="aacBtn">ANY SIZE</button>
                  </div>
                  <div class="col-sm-4">
                    <button class="btn btn-block" data-selected="false" data-id="2" id="addToCartBtn" name="aacBtn">ADD TO CART</button>
                  </div>
                  <div class="col-sm-4">
                    <button class="btn btn-block" data-selected="false" data-id="3" id="checkoutBtn" name="aacBtn">CHECKOUT</button>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-6">
                    <button class="btn btn-block" data-selected="false" id="disImgONBtn" name="disImgBtn">DISPLAY IMAGES: ON</button>
                  </div>
                  <div class="col-sm-6">
                    <button class="btn btn-block supreme-btn" data-selected="true" name="disImgBtn">DISPLAY IMAGES: OFF</button>
                  </div>
                </div>
                <hr>
                <div class="row">
                <div class="col-sm-12 mt-1">
                  <button class="btn btn-block supreme-btn" id="saveTaskBtn" name="saveTaskBtn">SAVE</button>
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
                  let element = document.createElement("div")
                  let container = document.getElementById('inputkf');
                  element.id = `kfDiv${id}`
                  element.classList.add("row")
                  element.innerHTML = `
                  <div class="col-sm-10"><input type="text" data-selected="true" data-id="${id}" name="keywordFinderInput" placeholder="Item Name / Color" class="form-control"></div>
                  <div class="col-sm-2"><button name="keywordFinderDel" data-id="${id}" class="btn btn-sm">❌</button></div>`
                  container.appendChild(element)
                  keywordFinderDel();

            break;

        case "timerBtn":

          if (item.dataset.selected == "false"){
            item.dataset.selected = true;
            item.className = 'btn btn-block supreme-btn';
            document.getElementById('timer').hidden = false;
          }else{
            item.dataset.selected = false;
            item.className = 'btn btn-block';
            document.getElementById('timer').hidden = true;
          }
      
            break;

        case "checkoutDelayBtn":

          if (item.dataset.selected == "false"){
            item.dataset.selected = true;
            item.className = 'btn btn-block supreme-btn';
            document.getElementById('checkoutDelay').hidden = false;
          }else{
            item.dataset.selected = false;
            item.className = 'btn btn-block';
            document.getElementById('checkoutDelay').hidden = true;
          }
      
            break;

        case "aacBtn":
            
            if (
              item.dataset.id == item.dataset.id &&
              item.className != "btn btn-block supreme-btn"
            ) {
              item.className = "btn btn-block supreme-btn";
              item.dataset.selected = true;
            } else {
              item.className = "btn btn-block";
              item.dataset.selected = false;
            }
      
            break;
        case "disImgBtn":
            
          let disImgBtn = document.getElementsByName("disImgBtn");
          let j = 0;
          while (j < disImgBtn.length) {
            if (
              disImgBtn[j].dataset.id == item.dataset.id &&
              disImgBtn[j].className != "btn btn-block supreme-btn"
            ) {
              disImgBtn[j].className = "btn btn-block supreme-btn";
              disImgBtn[j].dataset.selected = true;
            } else {
              disImgBtn[j].className = "btn btn-block";
              disImgBtn[j].dataset.selected = false;
            }
            j++;
          }
      
            break;
        case "saveTaskBtn":
          
          let newTask = {
            "shoeSize": document.getElementById('shoeData').value,
            "hatSize": document.getElementById('hatData').value,
            "size": findEveryValue("sizeBtn"),
            "cat": findEveryValue("catBtn"),
            "keywordFinder": findEveryValue("keywordFinderInput"),
            "timer": document.getElementById('timerInput').value,
            "checkoutDelay": document.getElementById('checkoutDelayInput').value,
            "anySize": document.getElementById('anySizeBtn').dataset.selected,
            "addToCart": document.getElementById('addToCartBtn').dataset.selected,
            "checkout": document.getElementById('checkoutBtn').dataset.selected,
            "stateKeywordFinderBtn": document.getElementById('checkoutBtn').dataset.selected,
            "stateTimerBtn": document.getElementById('timerBtn').dataset.selected,
            "stateCheckoutBtn": document.getElementById('checkoutBtn').dataset.selected,
            "disImgONBtn": document.getElementById('disImgONBtn').dataset.selected
          }
            addNewTask(newTask);
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
function addNewTask(newTask){
  console.log(newTask)
}

function findEveryValue(name) {
  let findValue = [];
  let k = 0;
  findItem = document.getElementsByName(name);
  while (k < findItem.length) {
    if (findItem[k].dataset.selected == "true")
    {
      if (findItem[k].nodeName == "BUTTON" || findItem[k].nodeName == "A"){
        findValue.push(findItem[k].innerText);
      }else if (findItem[k].nodeName == "INPUT"){
        findValue.push(findItem[k].value);
      }
      
    }
    k++;
  }
    return findValue;
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