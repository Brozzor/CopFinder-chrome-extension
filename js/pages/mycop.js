window.addEventListener("load", function load(event) {
  displayAllTasks();
  isTopCop();
  let createButton = document.getElementById("addTaskBtn");
  createButton.addEventListener("click", function () {
    if (taskPanelif == false) {
      document.getElementById("taskAddPanel").hidden = false;
      taskPanel();
    } else {
      taskPanelif = false;
      document.getElementById("taskAddPanel").hidden = true;
      createButton.innerText = "ADD TASK";
    }
  });
});

let taskPanelif = false;
let nbOpen = 0;

function taskPanel() {
  taskPanelif = true;
  document.getElementById("addTaskBtn").innerText = "CLOSE TASK";
  if (nbOpen == 1) {
    return false;
  }
  nbOpen++;
  document.getElementById("taskAddPanel").innerHTML = `
    <div class="card mb-3 center-block mt-3" style="max-width: 95%;">
        <div class="row no-gutters">
          <div class="col-md-12 ">
            <div class="card-body">

              <div>
                <div class="form-group row">
                  <label class="col-sm-12 col-form-label center">Size</label>
                  <div class="col-sm-12 center">
                  <button data-id="1" data-selected="false" name="sizeBtn" class="btn btn-sm" value="Small">S</button>
                  <button data-id="2" data-selected="false" name="sizeBtn" class="btn btn-sm" value="Medium">M</button>
                  <button data-id="3" data-selected="false" name="sizeBtn" class="btn btn-sm" value="Large">L</button>
                  <button data-id="4" data-selected="false" name="sizeBtn" class="btn btn-sm" value="XLarge">XL</button>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-sm-2">Shoe:</label>
                  <div class="col-sm-4">

                <select id="shoeData" class="form-control form-control-sm">
                  <option value="any" selected="">Open this select menu</option>
                  <option value="us 8.5">US 8.5</option>
                  <option value="us 9">US 9</option>
                  <option value="us 9.5">US 9.5</option>
                  <option value="us 10">US 10</option>
                  <option value="us 10.5">US 10.5</option>
                  <option value="us 11">US 11</option>
                  <option value="us 11.5">US 11.5</option>
                  <option value="us 12">US 12</option>
                  <option value="us 13">US 13</option>
                </select>

                  </div>

                  <label class="control-label col-sm-2">Pant:</label>
                  <div class="col-sm-4">

                <select id="pantData" class="form-control form-control-sm">
                <option value="any" selected="">Open this select menu</option>
                <option value="28">28 </option>
                <option value="30">30 </option>
                <option value="32">32 </option>
                <option value="34">34 </option>
                <option value="36">36 </option>
                <option value="38">38 </option>
                <option value="40">40 </option>
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
                <div class="form-group row">
                  <div class="col-sm-6">
                    <button class="btn btn-block" data-selected="false" id="timerBtn" name="timerBtn">TIMER</button>
                    <div id="timer" class="mt-3" hidden>
                      <div class="row">
                        <div class="col-sm-12">
                          <input type="datetime-local" id="timerInput" name="timerInput" placeholder="Set time" class="form-control mb-1">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <button class="btn btn-block" data-selected="false" id="checkoutDelayBtn" name="checkoutDelayBtn">CHECKOUT DELAY</button>
                    <div id="checkoutDelay" class="mt-3" hidden>
                        <div class="row">
                          <div class="col-sm-12">
                          <input type="text" name="checkoutDelayInput" id="checkoutDelayInput" value="4000" placeholder="Time in milliseconds" class="form-control mb-1">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-block" data-selected="false" id="proxyBtn" name="proxyBtn">PROXIES</button>
                  <div id="proxy" hidden>
                    <div class="row">
                      <div class="col-sm-12">
                      <select id="proxyList" class="form-control form-control-sm">
                      </select>
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
<!--
                <div class="form-group row">
                  <div class="col-sm-6">
                    <button class="btn btn-block" data-selected="false" id="disImgONBtn" name="disImgBtn">DISPLAY IMAGES: ON</button>
                  </div>
                  <div class="col-sm-6">
                    <button class="btn btn-block supreme-btn" data-selected="true" name="disImgBtn">DISPLAY IMAGES: OFF</button>
                  </div>
                </div>
-->
                <hr>
                <div class="row">
                <div class="col-sm-12 mt-1">
                  <button class="btn btn-block supreme-btn" id="saveTaskBtn" name="saveTaskBtn">SAVE</button>
                </div>
                <div class="col-sm-12 mt-2 center" id="notificationForSave"></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  SearchBtnTaskPanel();
  if (localStorage.proxyInfo != undefined && localStorage.proxyInfo != "" && localStorage.proxyInfo != "[]") {
    proxyInfo = JSON.parse(localStorage.proxyInfo);
    let i = 0;
    while (i < proxyInfo.length) {
      document.getElementById("proxyList").innerHTML += `
      <option value="${i}">${proxyInfo[i].name}</option>
      `;
      i++;
    }
  } else {
    document.getElementById("proxyList").innerHTML += `<option value="no" selected>You have no proxies</option>`;
  }
  requestApi("item-cat", "", displayCatList);
}

function SearchBtnPanel() {
  document.getElementsByName("actionBtn").forEach((item) => {
    item.addEventListener("click", (event) => {
      AllTasksParse = JSON.parse(localStorage.AllTasks);
      switch (item.dataset.type) {
        case "play":
          if (AllTasksParse[item.dataset.id].status == "Successfully") {
            return false;
          }
          if (AllTasksParse[item.dataset.id].status == "On Play") {
            AllTasksParse[item.dataset.id].state = "0";
            changeState("On Pause");
            chrome.runtime.sendMessage({
              msg: "stopBot",
              idtask: item.dataset.id,
            });
          } else {
            changeState("On Play");
          }

          function changeState(newText) {
            AllTasksParse[item.dataset.id].status = newText;
            AllTasksParse = JSON.stringify(AllTasksParse);
            localStorage.AllTasks = AllTasksParse;
            displayAllTasks();
          }
          break;
        case "edit":
          editTask(AllTasksParse[item.dataset.id], item.dataset.id);
          break;
        case "delete":
          AllTasksParse.splice(item.dataset.id, 1);
          AllTasksParse = JSON.stringify(AllTasksParse);
          localStorage.AllTasks = AllTasksParse;
          window.location.href = "/pages/mycop.html";
          break;

        default:
          break;
      }
    });
  });
}

function SearchBtnTaskPanel() {
  document.getElementsByTagName("button").forEach((item) => {
    item.addEventListener("click", (event) => {
      switch (item.name) {
        case "sizeBtn":
          let allBtn = document.getElementsByName("sizeBtn");
          let i = 0;
          while (i < allBtn.length) {
            if (allBtn[i].dataset.id == item.dataset.id && allBtn[i].className != "btn btn-sm supreme-btn") {
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
          if (item.dataset.selected == "false") {
            item.dataset.selected = true;
            item.className = "btn btn-block supreme-btn";
            document.getElementById("keywordFinder").hidden = false;
          } else {
            item.dataset.selected = false;
            item.className = "btn btn-block";
            document.getElementById("keywordFinder").hidden = true;
          }

          break;

        case "keywordFinderNewKeyBtn":
          let id = document.getElementsByName("keywordFinderInput").length + 1;
          let element = document.createElement("div");
          let container = document.getElementById("inputkf");
          element.id = `kfDiv${id}`;
          element.classList.add("row");
          element.innerHTML = `
                  <div class="col-sm-10"><input type="text" data-selected="true" data-id="${id}" name="keywordFinderInput" placeholder="Item Name / Color" class="form-control"></div>
                  <div class="col-sm-2"><button name="keywordFinderDel" data-id="${id}" class="btn btn-sm">❌</button></div>`;
          container.appendChild(element);
          keywordFinderDel();

          break;

        case "timerBtn":
          if (item.dataset.selected == "false") {
            item.dataset.selected = true;
            item.className = "btn btn-block supreme-btn";
            document.getElementById("timer").hidden = false;
          } else {
            item.dataset.selected = false;
            item.className = "btn btn-block";
            document.getElementById("timer").hidden = true;
          }

          break;

        case "checkoutDelayBtn":
          if (item.dataset.selected == "false") {
            item.dataset.selected = true;
            item.className = "btn btn-block supreme-btn";
            document.getElementById("checkoutDelay").hidden = false;
          } else {
            item.dataset.selected = false;
            item.className = "btn btn-block";
            document.getElementById("checkoutDelay").hidden = true;
          }

          break;

        case "aacBtn":
          if (item.dataset.id == item.dataset.id && item.className != "btn btn-block supreme-btn") {
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
            if (disImgBtn[j].dataset.id == item.dataset.id && disImgBtn[j].className != "btn btn-block supreme-btn") {
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
            shoeSize: document.getElementById("shoeData").value,
            pantSize: document.getElementById("pantData").value,
            size: findEveryValue("sizeBtn"),
            cat: findEveryValue("catBtn"),
            keywordFinder: findEveryValue("keywordFinderInput"),
            timer: document.getElementById("timerInput").value,
            checkoutDelay: document.getElementById("checkoutDelayInput").value,
            anySize: document.getElementById("anySizeBtn").dataset.selected,
            addToCart: document.getElementById("addToCartBtn").dataset.selected,
            checkoutDelayBtn: document.getElementById("checkoutDelayBtn").dataset.selected,
            stateKeywordFinderBtn: document.getElementById("keywordFinderBtn").dataset.selected,
            stateTimerBtn: document.getElementById("timerBtn").dataset.selected,
            stateCheckoutBtn: document.getElementById("checkoutBtn").dataset.selected,
            //disImgONBtn: document.getElementById("disImgONBtn").dataset.selected,
            stateProxyBtn: document.getElementById("proxyBtn").dataset.selected,
            proxy: document.getElementById("proxyList").value,
          };
          addNewTask(newTask);
          break;
        case "proxyBtn":
          if (item.dataset.selected == "false") {
            item.dataset.selected = true;
            item.className = "btn btn-block supreme-btn";
            document.getElementById("proxy").hidden = false;
          } else {
            item.dataset.selected = false;
            item.className = "btn btn-block";
            document.getElementById("proxy").hidden = true;
          }

          break;

        default:
          break;
      }
    });
  });
}

function keywordFinderDel() {
  document.getElementsByName("keywordFinderDel").forEach((item) => {
    item.addEventListener("click", (event) => {
      document.getElementById(`kfDiv${item.dataset.id}`).remove();
    });
  });
}

function addNewTask(constTask) {
  let taskForInsert = constTask;

  constTask.status = "On Pause";
  constTask.state = "0";
  constTask.execTask = "";
  constTask.tabId = "";

  if (taskForInsert.size.length == 0) {
    taskForInsert.size = "any";
  } else {
    taskForInsert.size = taskForInsert.size[0];
  }

  if (taskForInsert.timer == "" || taskForInsert.stateTimerBtn == "false") {
    taskForInsert.timer = null;
  }

  if (taskForInsert.checkoutDelay == "" || taskForInsert.stateCheckoutBtn == "false") {
    taskForInsert.checkoutDelay = null;
  }

  if (taskForInsert.stateKeywordFinderBtn == "false" || taskForInsert.keywordFinder[0].length == 0) {
    notification("danger", "You must choose keyword");
    return false;
  }

  if (taskForInsert.cat.length == 0) {
    notification("danger", "You must choose categories for keywords selected");
    return false;
  }

  if (localStorage["AllTasks"] == undefined || localStorage["AllTasks"] == "" || localStorage["AllTasks"] == "[]") {
    localStorage["AllTasks"] = "[" + JSON.stringify(taskForInsert) + "]";
  } else {
    let lastList = localStorage["AllTasks"].substr(0, localStorage["AllTasks"].length - 1);
    localStorage["AllTasks"] = lastList + "," + JSON.stringify(taskForInsert) + "]";
  }
  taskPanelif = false;
  notification("success", "You have added a new task");
  setTimeout(function () {
    document.getElementById("taskAddPanel").hidden = true;
    document.getElementById("addTaskBtn").innerText = "ADD TASK";
    window.location.href = "/pages/mycop.html";
  }, 3000);
}

function findEveryValue(name) {
  let findValue = [];
  let k = 0;
  findItem = document.getElementsByName(name);
  while (k < findItem.length) {
    if (findItem[k].dataset.selected == "true") {
      if ((findItem[k].nodeName == "BUTTON" || findItem[k].nodeName == "A") && name != "sizeBtn") {
        findValue.push(findItem[k].innerText);
      } else if (findItem[k].nodeName == "INPUT" || name == "sizeBtn") {
        if (findItem[k].value.includes("/")){
          findValue.push(findItem[k].value);
        }else{
          findValue.push(findItem[k].value + " / any");
        }

      }
    }
    k++;
  }
  return findValue;
}

function notification(type, msg) {
  document.getElementById("saveTaskBtn").disabled = true;
  document.getElementById("notificationForSave").innerHTML = `
<div class="alert alert-${type}" role="alert">
  ${msg}
</div>`;
  setTimeout(function () {
    delNotification();
  }, 3000);
}

function delNotification() {
  document.getElementById("notificationForSave").innerHTML = null;
  if (document.getElementById("saveTaskBtn").disabled == true) {
    document.getElementById("saveTaskBtn").disabled = false;
  }
}

function requestApi(use, argv, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://cop-finder.com/api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("key=" + localStorage["keyG"] + "&use=" + use);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
      let res = JSON.parse(xhr.responseText);
      if (res.status == "1" || res[0].status == "1") {
        callback(res);
      }
    }
  };
}

function displayCatList(res) {
  for (let i = 1; i < res.length; i++) {
    document.getElementById("catList").innerHTML += `<a class="ml-1 mr-1" name="catBtn" data-selected="false" data-id="${res[i].id}">${res[i].name} </a>`;
  }

  document.getElementsByName("catBtn").forEach((item) => {
    item.addEventListener("click", (event) => {
      if (item.dataset.id == item.dataset.id && item.className != "badge badge-danger ml-1 mr-1") {
        item.className = "badge badge-danger ml-1 mr-1";
        item.dataset.selected = true;
      } else {
        item.className = "ml-1 mr-1";
        item.dataset.selected = false;
      }
    });
  });
}

function displayAllTasks() {
  document.getElementById("AllTasks").innerHTML = "";
  if (localStorage.AllTasks == "" || localStorage.AllTasks == "undefined" || localStorage.AllTasks == undefined || localStorage.AllTasks == "[]") {
    displayTask("0");
    return false;
  }
  AllTasks = JSON.parse(localStorage.AllTasks);
  let i = 0;
  while (i < AllTasks.length) {
    displayTask(AllTasks[i], i);
    if (i == AllTasks.length - 1) {
      SearchBtnPanel();
    }
    i++;
  }
}

function displayTask(task, nb) {
  if (task == 0 || task == undefined) {
    document.getElementById("errorTask").innerHTML = `
    <center><p>You don't have tasks</p></center>
    `;
    return false;
  }
  let stateTd;
  if (task.status == "Successfully") {
    statePlayBtn = "play";
    stateTd = `<span class="badge badge-success state-badge"><i class="fa fa-circle"></i> Successfully</span>`;
  } else if (task.status == "On Pause") {
    statePlayBtn = "play";
    stateTd = `<span class="badge badge-warning state-badge"><i class="fa fa-circle"></i> Currently inactive</span>`;
  } else if (task.status == "On Play") {
    statePlayBtn = "pause";
    stateTd = `<span class="badge badge-warning state-badge"><i class="fa fa-circle"></i> Currently active</span>`;
  } else {
    statePlayBtn = "play";
    stateTd = `<span class="badge badge-danger state-badge"><i class="fa fa-circle"></i> Error code : ${task.status}</span>`;
  }

  $proxyStatus = "None";
  if (localStorage.proxyInfo != undefined && localStorage.proxyInfo != "" && localStorage.proxyInfo != "[]") {
    proxy = JSON.parse(localStorage.proxyInfo);
    if (task.stateProxyBtn == "true" && task.proxy != "no" && proxy[task.proxy] != undefined) {
      $proxyStatus = proxy[task.proxy].name;
    }
  }

  let firstKeyWord = splitKeyword(task.keywordFinder[0]);
  if (task.keywordFinder.length > 1) {
    firstKeyWord.keyword += "...";
  }
  let element = document.createElement("div");
  let container = document.getElementById("AllTasks");
  element.dataset.id = nb;
  element.classList.add("card");
  element.classList.add("task-card");
  element.innerHTML = `
            <div class="card-body row center" style="padding: 0.7rem;">
              <div class="col-3 task-text">${firstKeyWord.keyword}</div>
              <div class="col task-text">${firstKeyWord.color}</div>
              <div class="col task-text">${$proxyStatus}</div>
              <div class="col task-text">${stateTd}</div>
              <div class="col-2 task-text">
                <h5>
                  <a data-type="play" name="actionBtn" data-id="${nb}" class="mr-2" style="color: #2e2e2e;"><i class="fa fa-${statePlayBtn}" aria-hidden="true"></i></a>
                  <a data-type="edit" name="actionBtn" data-id="${nb}" style="color: #ffc107;"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                  <a data-type="delete" name="actionBtn" data-id="${nb}" class="ml-2" style="color: #da2727;"><i class="fa fa-trash" aria-hidden="true"></i></a>
                </h5>
              </div>
            </div>`;
  container.appendChild(element);
}

function editTask(task, nb) {
  document.getElementById("taskEditPanel").innerHTML = `
  <div class="card mb-3 center-block mt-3" style="max-width: 95%;">
        <div class="row no-gutters">
          <div class="col-md-12 ">
            <div class="card-body">
            <label class="col-sm-12 col-form-label center mb-3">View task n°${parseInt(nb) + 1}</label>

              <div class="form-group row">
                <div class="col-sm-6">
                <span>Shoe Size :</span>
                  <div class="row">
                    <div class="col-sm-12">
                        <input type="text" value="${task.shoeSize}" class="form-control mb-1" readonly>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6">
                <span>Pant Size :</span>
                  <div class="row">
                    <div class="col-sm-12">
                        <input type="text" value="${task.pantSize}" class="form-control mb-1" readonly>
                    </div>
                  </div>
                 </div>  
              </div>

              <div class="form-group row">
                <div class="col-sm-6">
                <span>Size :</span>
                  <div class="row">
                    <div class="col-sm-12">
                        <input type="text" value="${task.size}" class="form-control mb-1" readonly>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6">
                <span>Timer :</span>
                  <div class="row">
                    <div class="col-sm-12">
                        <input type="text" value="${task.timer}" class="form-control mb-1" readonly>
                    </div>
                  </div>
                 </div>  
              </div>

              <div class="form-group row">
                <div class="col-sm-6">
                <span>Checkout Delay :</span>
                  <div class="row">
                    <div class="col-sm-12">
                        <input type="text" value="${task.checkoutDelay}" class="form-control mb-1" readonly>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6">
                <span>Proxy :</span>
                  <div class="row">
                    <div class="col-sm-12">
                        <input type="text" value="${task.proxy}" class="form-control mb-1" readonly>
                    </div>
                  </div>
                 </div>  
              </div>
              <div id="keywordsEdit"></div>
            </div>
          </div>
        </div>
    </div>
  `;
  editTaskAllKeywords(task);
}

function editTaskAllKeywords(task) {
  let i = 0;
  while (i < task.keywordFinder.length) {
    document.getElementById("keywordsEdit").innerHTML += `
    <div class="form-group row">
      <div class="col-sm-12">
      <span>Keyword and color n° ${i + 1} :</span>
        <div class="row">
          <div class="col-sm-12">
            <input type="text" value="${task.keywordFinder[i]}" class="form-control mb-1" readonly>
          </div>
        </div>
      </div>
    </div>
    `;
    i++;
  }
}

function splitKeyword(word) {
  let res = {
    keyword: word.split("/")[0].trim(),
    color: word.split("/")[1],
  };
  if (word.length == 1) {
    res = {
      keyword: word.trim(),
      color: "none",
    };
  } else if (word.split("/").length > 2) {
    res = {
      keyword: word.split("/")[0].trim(),
      color: word.split("/")[word.split("/").length - 1].trim(),
    };
  }

  return res;
}

function isTopCop() {
  if (localStorage.toCop == undefined || localStorage.toCop == "") {
    return false;
  }
  document.getElementById("taskAddPanel").hidden = false;
  taskPanel();
  let toCop = JSON.parse(localStorage.toCop);
  let item = document.getElementById("keywordFinderBtn");
  item.dataset.selected = true;
  item.className = "btn btn-block supreme-btn";
  document.getElementById("keywordFinder").hidden = false;
  document.getElementsByName("keywordFinderInput")[0].value = toCop.keyword.trim();

  setTimeout(function () {
    let i = 0;
    let cat = document.getElementsByName("catBtn");
    while (i < cat.length) {
      if (cat[i].dataset.id == toCop.catId) {
        cat[i].className = "badge badge-danger ml-1 mr-1";
        cat[i].dataset.selected = true;
      }
      i++;
    }
    localStorage.toCop = "";
  }, 1000);
}
