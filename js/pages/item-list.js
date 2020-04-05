window.addEventListener("load", function load(event) {
  itemListPage();
  initialItemList();

  let createButton = document.getElementById("backBtn");
  createButton.addEventListener("click", function() {
    window.location.href = "/pages/main.html";
  });
});

function searchAllBtn() {
  document.getElementsByName("btnViewItem").forEach(item => {
    item.addEventListener("click", event => {
      clickItem(item.dataset.id);
    });
  });
}

function clickItem(id) {
  localStorage['item-choice'] = id;
  window.location.href = "/pages/item.html";
}

function itemListPage() {
  document.getElementById("app").innerHTML = `
  <br><center><h1 id="title" class="supreme-white-h1"></h1></center>
  <hr class="hr-style"> 

  <button id="backBtn" class="btn btn-elegant btn-sm ml-4 back-btn"><i class="fa fa-arrow-left"></i> back</button>

  <div class="row">
      
        <div id="left" class="col"></div>

        <div id="right" class="col"></div>

      
    </div>
  `;
}

function initialItemList() {
  let xhr = new XMLHttpRequest();
  let use = "item-choice";
  xhr.open("POST", "https://cop-finder.com/api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(
    "key=" +
      localStorage["keyG"] +
      "&use=" +
      use +
      "&catId=" +
      localStorage["cat-choice"]
  );
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
      let res = JSON.parse(xhr.responseText);
      if (res[0].status == "1") {
        addItemInPage(res);
      } else {
        localStorage["keyG"] = null;
        window.location.href = "/popup.html";
      }
    }
  };
}

function addItemInPage(res) {
  document.getElementById("title").innerHTML = res[0].catName;
  let i = 1;
  while (i < res.length) {
    document.getElementById("left").innerHTML += `
            <div class="card bg-white mt-4 ml-4 text-center">
            <div class="card-header">
            ${res[i].title}
            </div>
              <div class="card-body">
               <img width="200" height="200" src="${res[i].imgLink}">
               </div>
            <a data-id="${res[i].id}" name="btnViewItem"><div class="card-footer text-muted">
              view
            </div></a>
            </div>`;

    i++;
    if (i >= res.length) {
      searchAllBtn();
      break;
    }
    document.getElementById("right").innerHTML += `
            <div class="card bg-white mt-4 mr-4 text-center">
            <div class="card-header">
            ${res[i].title} 
            </div>
              <div class="card-body">
              <img width="200" height="200" src="${res[i].imgLink}">
              </div>
            <a data-id="${res[i].id}" name="btnViewItem"><div class="card-footer text-muted">
              view
            </div></a>
            </div>`;
    i++;
    if (i >= res.length) {
      searchAllBtn();
      break;
    }
  }
}
