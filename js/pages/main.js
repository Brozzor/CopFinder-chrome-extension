window.addEventListener("load", function load(event) {
  mainPage();
  initialItemList();
});

function searchAllBtn(){
  document.getElementsByName('btnViewCat').forEach(item => {
      item.addEventListener('click', event => {
        clickCat(item.dataset.id);
      })
    })
}

function clickCat(id){
  localStorage['cat-choice'] = id;
  window.location.href = "/pages/item-list.html";
}

function mainPage() {
  document.getElementById("app").innerHTML = `
  <div class="row">
        <div id="left" class="col"></div>

        <div id="right" class="col"></div>

      
    </div>
  `;
}

function initialItemList(){
  let xhr = new XMLHttpRequest();
  let use = "item-cat";
  xhr.open("POST", "https://cop-finder.com/api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("key=" + localStorage["keyG"] + "&use=" + use);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
      let res = JSON.parse(xhr.responseText);
      if (res[0].status == "1") {
        addItemInPage(res);
      } else {
        localStorage["keyG"] = null;
        window.location.href="/popup.html"
      }
    }
  };
}

function addItemInPage(res){
  let i = 1;
  while(i < res.length){
    document.getElementById("left").innerHTML += `
            <div class="card bg-white mt-4 ml-4 text-center">
            <div class="card-header">
            ${res[i].nb} articles
            </div>
              <div class="card-body">
                <h5 class="card-title center supreme-black">${res[i].name}</h5>

              </div>
            <a data-id="${res[i].id}" name="btnViewCat"><div class="card-footer text-muted">
              view
            </div></a>
            </div>`;
            
    i++;
    if (i >= res.length){
      searchAllBtn();
      break;}
    document.getElementById("right").innerHTML += `
            <div class="card bg-white mt-4 mr-4 text-center">
            <div class="card-header">
            ${res[i].nb} articles
            </div>
              <div class="card-body">
                <h5 class="card-title center supreme-black">${res[i].name}</h5>
              </div>
            <a data-id="${res[i].id}" name="btnViewCat"><div class="card-footer text-muted">
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