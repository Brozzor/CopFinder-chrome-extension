window.addEventListener("load", function load(event) {
  initialItemList();
  let createButton = document.getElementById("redirectWebsiteSup");
  createButton.addEventListener("click", function() {
    chrome.tabs.create({url: createButton.dataset.link});
  });

  let createButton2 = document.getElementById("selectToCop");
  createButton2.addEventListener("click", function() {
    selectToCop();
  });
});

function itemPage(res) {
  document.getElementById("title").innerHTML = res[1].title;
  document.getElementById("img-itm").src = res[1].imgLink;
  document.getElementById("redirectWebsiteSup").dataset.link = res[1].link;
  document.getElementById("price").innerText = res[1].price + '€';
  document.getElementById("color").innerText = res[1].model;
  document.getElementById("color").dataset.catid = res[1].cat_id;
}

function initialItemList() {
  let xhr = new XMLHttpRequest();
  let use = "item-choice";
  xhr.open("POST", "https://cop-finder.com/api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("key=" + localStorage["keyG"] + "&use=" + use + "&itemId=" + localStorage["item-choice"]);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
      let res = JSON.parse(xhr.responseText);
      if (res[0].status == "1") {
        itemPage(res);
      } else {
        localStorage["keyG"] = null;
        window.location.href = "/popup.html";
      }
    }
  };
}

function splitWords(word) {
    let res = word.trim();
      
    if (word.split("/").length >= 2) {
      res = word.split("/")[0].trim();
    }
  
    return res;
}

function selectToCop(){
  let i = 0;
  let findTitle = document.getElementById("title").innerText.split(' ');
  let cleanTitle = "";
  while (i < findTitle.length){
      if (!findTitle[i].includes('®')){
       cleanTitle = cleanTitle + " " + findTitle[i];
      }
      i++;
  }

  let toCop = {
   "keyword": splitWords(cleanTitle) + " / " + document.getElementById("color").innerText,
   "catId": document.getElementById("color").dataset.catid
  };
  localStorage.toCop = JSON.stringify(toCop);
  window.location = '/pages/mycop.html';
}
