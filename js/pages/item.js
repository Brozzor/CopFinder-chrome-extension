window.addEventListener("load", function load(event) {
  initialItemList();
  let createButton = document.getElementById("redirectWebsiteSup");
  createButton.addEventListener("click", function() {
    chrome.tabs.create({url: createButton.dataset.link});
  });
});

function itemPage(res) {
  document.getElementById("title").innerHTML = res[1].title;
  document.getElementById("img-itm").src = res[1].imgLink;
  document.getElementById("redirectWebsiteSup").dataset.link = res[1].link;
  document.getElementById("price").innerText = res[1].price + '€';
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
        console.log(res);
      } else {
        localStorage["keyG"] = null;
        window.location.href = "/popup.html";
      }
    }
  };
}
